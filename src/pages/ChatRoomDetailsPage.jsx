import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Send, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

const ChatRoomDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const isActive = user?.isActive !== false
  
  // Get contact name or room name from location state
  const contactName = location.state?.contactName || ''
  const roomName = location.state?.roomName || ''
  const isChatRoom = location.state?.isChatRoom || false

  // All messages for different conversations (1-on-1)
  const allMessages = {
    'Jawad': [
      { id: 1, sender: 'Jawad', text: 'Hey, how are you?', time: '10:30 AM' },
      { id: 2, sender: 'You', text: 'I\'m doing great, thanks! How about you?', time: '10:32 AM' },
      { id: 3, sender: 'Jawad', text: 'Good! What do you think about AAPL?', time: '10:35 AM' },
      { id: 4, sender: 'You', text: 'I think it\'s a good buy right now', time: '10:40 AM' },
    ],
    'Ayesha': [
      { id: 1, sender: 'Ayesha', text: 'Thanks for the tip!', time: 'Yesterday' },
      { id: 2, sender: 'You', text: 'You\'re welcome! Did it work out for you?', time: 'Yesterday' },
      { id: 3, sender: 'Ayesha', text: 'Yes, I made a good profit. Thanks again!', time: 'Yesterday' },
    ],
    'Maha': [
      { id: 1, sender: 'Maha', text: 'Great analysis on that stock!', time: '2 hours ago' },
      { id: 2, sender: 'You', text: 'Thank you! I spent a lot of time researching it', time: '2 hours ago' },
      { id: 3, sender: 'Maha', text: 'What about the technical indicators?', time: '1 hour ago' },
      { id: 4, sender: 'You', text: 'The RSI is showing oversold conditions, might be a good entry point', time: '1 hour ago' },
    ],
    'Sheema': [
      { id: 1, sender: 'Sheema', text: 'Can you share your trading strategy?', time: '5 hours ago' },
      { id: 2, sender: 'You', text: 'Sure! I focus on value investing with technical analysis', time: '5 hours ago' },
      { id: 3, sender: 'Sheema', text: 'That sounds interesting. Can we discuss more?', time: '4 hours ago' },
      { id: 4, sender: 'You', text: 'Of course! Let\'s schedule a time to talk', time: '4 hours ago' },
    ],
  }

  // Group chat messages for chat rooms
  const groupChatMessages = [
    { id: 1, sender: 'Jawad', text: 'What do you think about AAPL?', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'I think it\'s a good buy right now', time: '10:32 AM' },
    { id: 3, sender: 'Ayesha', text: 'I agree, the fundamentals look strong', time: '10:35 AM' },
    { id: 4, sender: 'Maha', text: 'What about the technical indicators?', time: '10:40 AM' },
    { id: 5, sender: 'Sheema', text: 'The RSI is showing oversold conditions', time: '10:42 AM' },
    { id: 6, sender: 'You', text: 'That\'s a good point, might be a buying opportunity', time: '10:45 AM' },
    { id: 7, sender: 'Jawad', text: 'Great analysis everyone!', time: '10:50 AM' },
    { id: 8, sender: 'Maha', text: 'Should we consider the market trends too?', time: '11:00 AM' },
    { id: 9, sender: 'Ayesha', text: 'Yes, that\'s important for timing the entry', time: '11:05 AM' },
    { id: 10, sender: 'Sheema', text: 'Let\'s keep monitoring and share updates', time: '11:10 AM' },
  ]

  // Get messages based on whether it's a chat room or conversation
  const messages = isChatRoom 
    ? groupChatMessages 
    : (contactName && allMessages[contactName] ? allMessages[contactName] : [])

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
        <h2 className="text-xl font-semibold">{roomName || contactName || 'Chat'}</h2>
      </div>

      {!isActive && (
        <div className="bg-orange-50 border-b border-orange-200 px-6 py-3 flex items-start gap-3">
          <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-orange-800 font-semibold text-xs">Account Deactivated</p>
            <p className="text-orange-700 text-xs mt-0.5">You can't send messages as your account is deactivated.</p>
          </div>
        </div>
      )}

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
            placeholder={isActive ? "Type a message..." : "Account deactivated - cannot send messages"}
            disabled={!isActive}
            className={`flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
              !isActive ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <Button type="submit" disabled={!isActive}>
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatRoomDetailsPage


