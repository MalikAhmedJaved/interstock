import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotificationPanel = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/notifications')}
      className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
    >
      <Bell size={20} />
    </button>
  )
}

export default NotificationPanel

