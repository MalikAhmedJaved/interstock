import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Users, AlertCircle, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS } from '../config/api'

const ChatRoomsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [chatRooms, setChatRooms] = useState([])
  const [creatingRoom, setCreatingRoom] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadRooms = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const response = await fetch(API_ENDPOINTS.CHAT.ROOMS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        if (mounted && response.ok && data.success) {
          setChatRooms(data.rooms || [])
        }
      } catch {
        if (mounted) {
          setChatRooms([])
        }
      }
    }

    loadRooms()
    const intervalId = setInterval(loadRooms, 5000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  const handleCreateRoom = async () => {
    if (!isActive || creatingRoom) return

    const roomName = window.prompt('Enter chat room name')
    if (!roomName || !roomName.trim()) return

    try {
      setCreatingRoom(true)
      const token = localStorage.getItem('authToken')
      if (!token) return

      const response = await fetch(API_ENDPOINTS.CHAT.ROOMS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: roomName.trim() }),
      })
      const data = await response.json()

      if (response.ok && data.success && data.room) {
        setChatRooms((prev) => [data.room, ...prev])
      } else {
        alert(data.message || 'Failed to create room')
      }
    } catch {
      alert('Failed to create room')
    } finally {
      setCreatingRoom(false)
    }
  }

  const handleRoomClick = (room) => {
    navigate('/chat-room-details', { state: { roomName: room.name, roomId: room.id, isChatRoom: true } })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Chat Rooms</h2>
        {isActive && (
          <button
            onClick={handleCreateRoom}
            className="ml-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
            title="Create Room"
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
            <p className="text-orange-700 text-sm mt-1">You can't do chat as your account is deactivated. You can only view your previous chats.</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room)}
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
                  {room.hasUnread && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <p className="text-sm text-text-secondary-light mt-1">{room.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}

        {chatRooms.length === 0 && (
          <div className="card p-6 text-center text-text-secondary-light">
            No chat rooms yet. Create one to add all registered students.
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRoomsPage


