import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Bot, Trash2, Sparkles, Loader2, User } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'

const QUICK_PROMPTS = [
  'What is a stock?',
  'Explain P/E ratio',
  'How do options work?',
  'What is diversification?',
  'Day trading vs investing?',
  'What are ETFs?',
]

const ChatBotPage = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = { id: Date.now(), sender: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setMessage('')
    setIsLoading(true)

    try {
      const res = await fetch(API_ENDPOINTS.CHATBOT.MESSAGE, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: text.trim() }),
      })

      const data = await res.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'bot', text: data.reply },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: data.message || 'Sorry, I couldn\'t process your request. Please try again.',
            isError: true,
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Network error. Please check your connection and try again.',
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    sendMessage(message)
  }

  const handleClearChat = async () => {
    try {
      await fetch(API_ENDPOINTS.CHATBOT.HISTORY, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch {
      // ignore
    }
    setMessages([])
  }

  // Format bot messages — handle markdown-like formatting
  const formatBotText = (text) => {
    // Split into lines
    const lines = text.split('\n')
    return lines.map((line, i) => {
      // Bold: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      const formatted = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={i} className="flex gap-2 ml-2">
            <span className="text-primary mt-0.5">•</span>
            <span>{formatted.map((f) => (typeof f === 'string' ? f.replace(/^[-*]\s/, '') : f))}</span>
          </div>
        )
      }

      // Numbered lists
      if (/^\d+[.)]\s/.test(line.trim())) {
        return (
          <div key={i} className="ml-2">
            {formatted}
          </div>
        )
      }

      // Empty line = paragraph break
      if (line.trim() === '') {
        return <div key={i} className="h-2" />
      }

      return (
        <div key={i}>{formatted}</div>
      )
    })
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen bg-background-light">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark hover:text-primary transition-colors">
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary-dark">Mini Alexa</h2>
              <p className="text-xs text-gray-500">AI-powered stock assistant</p>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {isEmpty ? (
          /* Welcome screen when no messages */
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-indigo-100 flex items-center justify-center mb-6">
              <Sparkles className="text-primary" size={36} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary-dark mb-2">Mini Alexa</h3>
            <p className="text-gray-500 mb-8 max-w-sm">
              Your AI stock market assistant. Ask me anything about stocks, trading, investing, or finance!
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-3 text-sm text-left bg-white border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-text-primary-dark"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message list */
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="text-white" size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : msg.isError
                        ? 'bg-red-50 border border-red-200 text-red-700 rounded-bl-md'
                        : 'bg-white border border-gray-200 text-text-primary-dark rounded-bl-md'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  ) : (
                    <div className="text-sm leading-relaxed space-y-1">
                      {formatBotText(msg.text)}
                    </div>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="text-gray-600" size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="text-white" size={14} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-3 sm:py-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isLoading ? 'Waiting for response...' : 'Ask Mini Alexa anything about stocks...'}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50 disabled:bg-gray-50 text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Mini Alexa is for educational purposes only. Not financial advice.
          </p>
        </form>
      </div>
    </div>
  )
}

export default ChatBotPage


