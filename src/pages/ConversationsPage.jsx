import { useNavigate } from 'react-router-dom'
import { Plus, MessageCircle } from 'lucide-react'

const ConversationsPage = () => {
  const navigate = useNavigate()

  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thanks for the tip!', time: 'Yesterday' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-orbitron">Conversations</h2>
        <button
          onClick={() => navigate('/new-group-page')}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => navigate('/chat-room-details')}
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


