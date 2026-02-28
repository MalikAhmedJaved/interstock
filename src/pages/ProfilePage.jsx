import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, User, Lock, FileText, Shield, FileCheck, HelpCircle, 
  MessageCircle, Trash2, ChevronRight, Upload, Camera, CheckCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { logout, user, deactivateAccount, activateAccount } = useAuth()
  const [profileImage, setProfileImage] = useState(null)
  const userName = user?.name || 'User'
  const userEmail = user?.email || ''
  const isActive = user?.isActive !== false // Default to true if not set

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate your account? All your assignments, quizzes, and other data will be hidden.')) {
      try {
        deactivateAccount()
        alert('Account deactivated successfully. Your data has been hidden.')
      } catch (error) {
        alert('Failed to deactivate account. Please try again.')
      }
    }
  }

  const handleActivate = () => {
    if (window.confirm('Are you sure you want to activate your account? All your assignments, quizzes, and other data will be restored.')) {
      try {
        activateAccount()
        alert('Account activated successfully. Your data has been restored.')
      } catch (error) {
        alert('Failed to activate account. Please try again.')
      }
    }
  }

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
    { 
      icon: isActive ? Trash2 : CheckCircle, 
      title: isActive ? 'Deactivate My Account' : 'Activate Account', 
      onClick: isActive ? handleDeactivate : handleActivate, 
      isDanger: isActive,
      isSuccess: !isActive
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 pb-20 sm:pb-24 lg:pb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-orbitron">My Profile</h2>

      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="relative mb-3 sm:mb-4">
          <label className="cursor-pointer block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-primary/20 hover:border-primary/40 transition-colors">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-gray-400 sm:w-12 sm:h-12" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-image-input"
            />
          </label>
          <label 
            htmlFor="profile-image-input"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <Camera size={16} />
          </label>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold">{userName}</h3>
        <p className="text-sm sm:text-base text-text-secondary-light">{userEmail}</p>
      </div>

      {/* Profile Items */}
      <div className="space-y-2 lg:space-y-3 max-w-2xl lg:mx-auto">
        {profileItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full card p-4 flex items-center justify-between hover:shadow-md transition-shadow ${
                item.isDanger ? 'text-error' : item.isSuccess ? 'text-green-600' : ''
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
        onClick={() => {
          logout()
          navigate('/login')
        }}
        className="w-full max-w-2xl lg:mx-auto lg:block py-3 rounded-xl border-2 border-error text-error font-semibold hover:bg-error/10 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default ProfilePage

