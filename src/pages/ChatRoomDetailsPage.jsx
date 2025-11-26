import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import Button from '../components/Button'

const ChatRoomDetailsPage = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const messages = [
    { id: 1, sender: 'John', text: 'What do you think about AAPL?', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'I think it\'s a good buy right now', time: '10:32 AM' },
  ]

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // Send message
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background-light">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-xl font-semibold">Trading Discussion</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl ${
                msg.sender === 'You'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-white/70' : 'text-text-secondary-light'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="px-6 py-4 border-t border-gray-200">
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

export default ChatRoomDetailsPage


