import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Send, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import { API_ENDPOINTS } from '../config/api'

const ChatRoomDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const isActive = user?.isActive !== false
  
  // Get contact name or room name from location state
  const contactName = location.state?.contactName || ''
  const contactId = location.state?.contactId || ''
  const roomName = location.state?.roomName || ''
  const roomId = location.state?.roomId || ''
  const isChatRoom = location.state?.isChatRoom || false

  useEffect(() => {
    let mounted = true

    const loadMessages = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const url = isChatRoom
          ? `${API_ENDPOINTS.CHAT.ROOMS}/${roomId}/messages`
          : `${API_ENDPOINTS.CHAT.MESSAGES}/${contactId}`

        if ((isChatRoom && !roomId) || (!isChatRoom && !contactId)) {
          if (mounted) {
            setLoading(false)
          }
          return
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (mounted && response.ok && data.success) {
          setMessages(data.messages || [])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadMessages()
    const intervalId = setInterval(loadMessages, 3000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [contactId, isChatRoom, roomId])

  const handleSend = async (e) => {
    e.preventDefault()
    if (message.trim() && ((isChatRoom && roomId) || (!isChatRoom && contactId))) {
      const textToSend = message.trim()
      setMessage('')

      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const url = isChatRoom
          ? `${API_ENDPOINTS.CHAT.ROOMS}/${roomId}/messages`
          : `${API_ENDPOINTS.CHAT.MESSAGES}/${contactId}`

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: textToSend }),
        })

        const data = await response.json()
        if (response.ok && data.success) {
          setMessages((prev) => [...prev, data.message])
        }
      } catch {
        setMessage(textToSend)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background-light">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center gap-4">
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

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-4">
        {loading && <p className="text-sm text-text-secondary-light">Loading messages...</p>}
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
        {!loading && messages.length === 0 && (
          <p className="text-sm text-text-secondary-light">No messages yet. Start the conversation.</p>
        )}
      </div>

      <form onSubmit={handleSend} className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isActive ? "Type a message..." : "Account deactivated - cannot send messages"}
            disabled={!isActive || (isChatRoom ? !roomId : !contactId)}
            className={`flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
              (!isActive || (isChatRoom ? !roomId : !contactId)) ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <Button type="submit" disabled={!isActive || (isChatRoom ? !roomId : !contactId)}>
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatRoomDetailsPage


