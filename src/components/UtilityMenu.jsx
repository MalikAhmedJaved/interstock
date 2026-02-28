import { useState, useRef, useEffect } from 'react'
import { 
  Menu, MessageCircle, Settings, LogOut, HelpCircle, User, 
  FileText, BookOpen, Trophy, Users, MessageSquare, Award, 
  StickyNote, GraduationCap, UserCheck, ShoppingBag 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UtilityMenu = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuItems = [
    { icon: FileText, label: 'Assignments', onClick: () => navigate('/assignments') },
    { icon: BookOpen, label: 'Quizzes', onClick: () => navigate('/upcoming-tasks?tab=quizzes') },
    { icon: Trophy, label: 'Achievements', onClick: () => navigate('/achievements') },
    { icon: Users, label: 'Chat Rooms', onClick: () => navigate('/chat-room') },
    { icon: MessageSquare, label: 'Conversations', onClick: () => navigate('/conversations') },
    { icon: Award, label: 'Hall of Fame', onClick: () => navigate('/hall-of-fame') },
    { icon: StickyNote, label: 'Notes', onClick: () => navigate('/my-note') },
    { icon: GraduationCap, label: 'Study Material', onClick: () => navigate('/study-materials') },
    { icon: UserCheck, label: 'Teachers', onClick: () => navigate('/teachers-page') },
    { icon: ShoppingBag, label: 'Purchase History', onClick: () => navigate('/purchase-history') },
    { 
      icon: LogOut, 
      label: 'Logout', 
      onClick: () => {
        logout()
        navigate('/login')
      }, 
      isDanger: true 
    },
  ]

  return (
    <div className="flex gap-3 relative" ref={menuRef}>
      <button
        onClick={() => navigate('/chat-bots')}
        className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <MessageCircle size={20} />
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Menu size={20} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-[80vh] overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    item.isDanger ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UtilityMenu

