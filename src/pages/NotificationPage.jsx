import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'

const NotificationPage = () => {
  const navigate = useNavigate()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    // Load saved preference from localStorage
    const savedPreference = localStorage.getItem('notificationsEnabled')
    if (savedPreference !== null) {
      setNotificationsEnabled(JSON.parse(savedPreference))
    }
  }, [])

  const notifications = [
    { id: 1, title: 'New Quiz Available', message: 'Stock Market Basics quiz is now available', time: '2 hours ago', type: 'quiz' },
    { id: 2, title: 'Assignment Due', message: 'Your assignment is due tomorrow', time: '5 hours ago', type: 'assignment' },
  ]

  const handleNotificationClick = (notification) => {
    if (notification.type === 'quiz') {
      navigate('/upcoming-tasks?tab=quizzes')
    } else if (notification.type === 'assignment') {
      navigate('/assignments')
    }
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // Here you would typically save this preference to your backend/localStorage
    localStorage.setItem('notificationsEnabled', JSON.stringify(!notificationsEnabled))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Notifications</h2>
      </div>

      {/* Notification Toggle */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={20} />
          <div>
            <p className="font-semibold">Enable Notifications</p>
            <p className="text-sm text-text-secondary-light">
              {notificationsEnabled ? 'Notifications are currently on' : 'Notifications are currently off'}
            </p>
          </div>
        </div>
        <button
          onClick={toggleNotifications}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            notificationsEnabled ? 'bg-primary' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={notificationsEnabled}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-text-secondary-light mt-1">{notification.message}</p>
                <p className="text-xs text-text-secondary-light mt-2">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationPage


