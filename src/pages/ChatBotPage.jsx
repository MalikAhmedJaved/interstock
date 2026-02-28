import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Bot } from 'lucide-react'
import Button from '../components/Button'

const ChatBotPage = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I help you with stock trading today?' },
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', text: message }])
      setMessage('')
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, sender: 'bot', text: 'Thanks for your message! How can I assist you further?' },
        ])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background-light">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <Bot className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Chat Bot</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button type="submit">
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatBotPage


