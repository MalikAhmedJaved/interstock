import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

const FloatingChatButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useApp()

  // Hide on public/auth pages and on the chatbot page itself
  const hiddenPaths = ['/login', '/register-email', '/onboarding', '/chat-bots', '/']
  if (!isAuthenticated || hiddenPaths.includes(location.pathname)) {
    return null
  }

  // Check if bottom navbar is visible (it shows on these pages)
  const navbarPages = ['/home', '/learn', '/rank', '/profile']
  const hasNavbar = navbarPages.includes(location.pathname)

  return (
    <button
      onClick={() => navigate('/chat-bots')}
      className="fixed z-[60] w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all"
      style={{
        boxShadow: '0 4px 20px rgba(72, 70, 255, 0.4)',
        right: '1.5rem',
        bottom: hasNavbar ? '6rem' : '1.5rem',
      }}
      aria-label="Open Mini Alexa Chatbot"
    >
      <Sparkles size={24} className="text-white" />
    </button>
  )
}

export default FloatingChatButton
