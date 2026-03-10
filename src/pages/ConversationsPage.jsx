import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, MessageCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS } from '../config/api'

const ConversationsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [conversations, setConversations] = useState([])
  const unreadCount = conversations.filter((conv) => conv.hasUnread).length

  useEffect(() => {
    let mounted = true

    const loadConversations = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const response = await fetch(API_ENDPOINTS.CHAT.CONVERSATIONS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (mounted && response.ok && data.success) {
          setConversations(data.conversations || [])
        }
      } catch {
        if (mounted) {
          setConversations([])
        }
      }
    }

    loadConversations()
    const intervalId = setInterval(loadConversations, 5000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Conversations</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
              {unreadCount} new
            </span>
          )}
        </div>
        {isActive && (
          <button
            onClick={() => navigate('/new-chat-page')}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {!isActive && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-orange-800 font-semibold text-sm">Account Deactivated</p>
            <p className="text-orange-700 text-sm mt-1">You can't do chat as your account is deactivated. You can only view your previous conversations.</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() =>
              navigate('/chat-room-details', {
                state: { contactName: conv.name, contactId: conv.otherUserId },
              })
            }
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <MessageCircle size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{conv.name}</h3>
                  {conv.hasUnread && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <p className="text-sm text-text-secondary-light">{conv.lastMessage}</p>
              </div>
              <span className="text-xs text-text-secondary-light">{conv.time}</span>
            </div>
          </div>
        ))}

        {conversations.length === 0 && (
          <div className="card p-6 text-center text-text-secondary-light">
            No conversations yet. Start a new chat.
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationsPage


