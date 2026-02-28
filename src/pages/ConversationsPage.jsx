import { useNavigate } from 'react-router-dom'
import { Plus, MessageCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ConversationsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isActive = user?.isActive !== false

  const conversations = [
    { id: 1, name: 'Jawad', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, name: 'Ayesha', lastMessage: 'Thanks for the tip!', time: 'Yesterday' },
    { id: 3, name: 'Maha', lastMessage: 'Great analysis on that stock!', time: '2 hours ago' },
    { id: 4, name: 'Sheema', lastMessage: 'Can you share your trading strategy?', time: '5 hours ago' },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">Conversations</h2>
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
            onClick={() => navigate('/chat-room-details', { state: { contactName: conv.name } })}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <MessageCircle size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{conv.name}</h3>
                <p className="text-sm text-text-secondary-light">{conv.lastMessage}</p>
              </div>
              <span className="text-xs text-text-secondary-light">{conv.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationsPage


