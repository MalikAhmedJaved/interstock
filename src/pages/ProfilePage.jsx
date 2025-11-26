import { useNavigate } from 'react-router-dom'
import { 
  Bell, User, Lock, FileText, Shield, FileCheck, HelpCircle, 
  MessageCircle, Trash2, ChevronRight 
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { logout } = useApp()

  const profileItems = [
    { icon: Bell, title: 'Notification', onClick: () => navigate('/notifications') },
    { icon: User, title: 'Edit Profile', onClick: () => navigate('/edit-profile') },
    { icon: Lock, title: 'Change Password', onClick: () => navigate('/change-password') },
    { icon: FileText, title: 'My Notes', onClick: () => navigate('/my-note') },
    { icon: Shield, title: 'Privacy Policy', onClick: () => navigate('/privacy-policy') },
    { icon: FileCheck, title: 'Terms & Conditions', onClick: () => navigate('/terms-and-conditions') },
    { icon: HelpCircle, title: 'Help Center', onClick: () => navigate('/help-center') },
    { icon: MessageCircle, title: 'FAQs', onClick: () => navigate('/faqs-page') },
    { icon: MessageCircle, title: 'Contact Us', onClick: () => navigate('/contact-form') },
    { icon: Trash2, title: 'Deactivate My Account', onClick: () => alert('Deactivate account?'), isDanger: true },
  ]

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <h2 className="text-2xl font-bold font-orbitron">My Profile</h2>

      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary/20">
            <User size={48} className="text-gray-400" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <User size={16} />
          </button>
        </div>
        <h3 className="text-xl font-semibold">Ishmal Fatima</h3>
        <p className="text-text-secondary-light">Ishmalfatima@gmail.com</p>
      </div>

      {/* Profile Items */}
      <div className="space-y-2">
        {profileItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full card p-4 flex items-center justify-between hover:shadow-md transition-shadow ${
                item.isDanger ? 'text-error' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronRight size={20} className="text-text-secondary-light" />
            </button>
          )
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-xl border-2 border-error text-error font-semibold hover:bg-error/10 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default ProfilePage

