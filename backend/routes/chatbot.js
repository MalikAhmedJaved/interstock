const express = require('express')
const router = express.Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const authMiddleware = require('../middleware/auth')

// All chatbot routes require authentication
router.use(authMiddleware)

// In-memory conversation history per user (resets on server restart)
// For production, store in MongoDB
const conversationHistories = new Map()

const SYSTEM_INSTRUCTION = `You are Mini Alexa, an intelligent AI assistant inside the InterStock educational stock trading app. You help students learn about:
- Stock market fundamentals (stocks, bonds, ETFs, mutual funds)
- Trading strategies (day trading, swing trading, long-term investing)
- Technical analysis (candlestick patterns, moving averages, RSI, MACD, Bollinger Bands)
- Fundamental analysis (P/E ratio, EPS, revenue, market cap)
- Options and futures trading concepts
- Portfolio management and diversification
- Risk management and stop-loss strategies
- Financial news interpretation
- General finance and economics concepts

Guidelines:
- Be friendly, concise, and educational
- Use simple language — the users are students learning finance
- When explaining concepts, use real-world examples
- If asked something unrelated to finance/stocks, you can still help but gently steer back to finance topics
- Format responses clearly with bullet points or numbered lists when appropriate
- Keep responses under 300 words unless the topic needs more detail
- Never give actual financial advice — always remind users this is for educational purposes`

// POST /api/chatbot/message — Send a message and get AI response
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body
    const userId = req.user._id.toString()

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'AI service not configured. Please add GEMINI_API_KEY to your .env file.',
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Try models in order of preference — fallback if quota exceeded
    const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite', 'gemini-2.0-flash']
    let responseText = null
    let lastError = null

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
        })

        // Get or create conversation history for this user
        if (!conversationHistories.has(userId)) {
          conversationHistories.set(userId, [])
        }
        const history = conversationHistories.get(userId)

        const chat = model.startChat({ history })
        const result = await chat.sendMessage(message)
        responseText = result.response.text()

        // Update history (keep last 20 exchanges)
        history.push(
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: responseText }] }
        )
        if (history.length > 40) {
          history.splice(0, 2)
        }

        break // success — stop trying other models
      } catch (err) {
        console.error(`Model ${modelName} failed:`, err.message?.substring(0, 100))
        lastError = err
        continue // try next model
      }
    }

    if (responseText) {
      return res.json({ success: true, reply: responseText })
    }

    // All models failed — throw last error
    throw lastError
  } catch (error) {
    console.error('Chatbot error:', error.message || error)
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      return res.status(500).json({
        success: false,
        message: 'Invalid API key. Please check your GEMINI_API_KEY.',
      })
    }

    if (error.message?.includes('QUOTA') || error.message?.includes('quota')) {
      return res.status(429).json({
        success: false,
        message: 'API quota exceeded. Please try again later.',
      })
    }

    if (error.message?.includes('not found') || error.message?.includes('404')) {
      return res.status(500).json({
        success: false,
        message: 'AI model not available. Please try again later.',
      })
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get AI response. Please try again.',
    })
  }
})

// DELETE /api/chatbot/history — Clear conversation history
router.delete('/history', (req, res) => {
  const userId = req.user._id.toString()
  conversationHistories.delete(userId)
  res.json({ success: true, message: 'Conversation history cleared' })
})

module.exports = router
