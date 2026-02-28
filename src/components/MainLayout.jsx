import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Bell, RefreshCw, Menu, X, Settings, LogOut, User } from 'lucide-react'

const sidebarNavItems = [
  { label: 'Achievements', path: '/achievements' },
  { label: 'Assignments', path: '/assignments' },
  { label: 'Chat Rooms', path: '/chat-room' },
  { label: 'Competitions', path: '/rank' },
  { label: 'Conversations', path: '/conversations' },
  { label: 'Event Calendar', path: '/upcoming-tasks' },
  { label: 'Hall Of Fame', path: '/hall-of-fame' },
  { label: 'Notes', path: '/my-note' },
  { label: 'Study Materials', path: '/study-materials' },
]

const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const userName = user?.name || 'User'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" style={{ backgroundColor: '#F0F4F8' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, visible on lg+ */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 sm:w-80 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          py-4 pl-4 sm:pl-6 pr-2 overflow-y-auto
        `}
      >
        <div
          className="bg-white rounded-3xl lg:rounded-[40px] p-6 sm:p-8 flex flex-col gap-4 min-h-full"
          style={{ boxShadow: '0 0 14px rgba(0,0,0,0.1)' }}
        >
          {/* Close button on mobile */}
          <button
            className="lg:hidden self-end p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* User profile */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-lg sm:text-xl font-semibold">
                  {userName.charAt(0)}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] sm:text-[10px]">📷</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-base sm:text-lg text-gray-900">{userName}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Level 1</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarNavItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path)
                    setSidebarOpen(false)
                  }}
                  className={`text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-medium'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop header - visible on lg+ */}
        <header
          className="hidden lg:flex sticky top-0 z-10 items-center justify-between px-8 py-4 backdrop-blur-md bg-[#F0F4F8]/80"
          style={{ boxShadow: '0 0 14px rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold font-inter text-black">InterStock</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-colors">
              <RefreshCw size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center relative hover:bg-white/80 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-stock-red rounded-full"></span>
            </button>
            {/* Profile avatar with dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="text-white text-sm font-semibold">{userName.charAt(0).toUpperCase()}</span>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => { navigate('/profile'); setProfileMenuOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={18} className="text-gray-500" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { navigate('/edit-profile'); setProfileMenuOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={18} className="text-gray-500" />
                    Settings
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => { logout(); setProfileMenuOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} className="text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout

