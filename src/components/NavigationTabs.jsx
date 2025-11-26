import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Trophy, User } from 'lucide-react'

const NavigationTabs = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/rank', icon: Trophy, label: 'Rank' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  // Only show navigation on main pages
  const mainPages = ['/home', '/learn', '/rank', '/profile']
  const shouldShowNav = mainPages.includes(location.pathname)

  if (!shouldShowNav) {
    return null
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
              style={{
                color: active ? '#4846FF' : '#9CA3AF'
              }}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default NavigationTabs

