import { useNavigate } from 'react-router-dom'
import { MessageCircle, Users } from 'lucide-react'

const ChatRoomsPage = () => {
  const navigate = useNavigate()

  const chatRooms = [
    { id: 1, name: 'Trading Discussion', members: 25, lastMessage: 'Great analysis!' },
    { id: 2, name: 'Stock Tips', members: 42, lastMessage: 'Check out AAPL' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Chat Rooms</h2>
      </div>

      <div className="space-y-3">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate('/chat-room-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-text-secondary-light text-sm">
                  <Users size={14} />
                  <span>{room.members} members</span>
                </div>
                <p className="text-sm text-text-secondary-light mt-1">{room.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatRoomsPage


