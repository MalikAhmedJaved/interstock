import { useNavigate, useLocation } from 'react-router-dom'
import { Trophy, Shield, Eye, MessageCircle, Crown, Calendar } from 'lucide-react'

const AchievementDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get achievement from navigation state or use default
  const achievement = location.state?.achievement || {
    id: 1,
    title: 'First Profit',
    description: 'Achieved your first profitable trade',
    icon: Trophy,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    completed: true,
    earnedDate: '2024-06-15',
    requirements: [
      'Execute at least 1 trade',
      'Achieve positive return'
    ]
  }

  const Icon = achievement.icon

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24 lg:pb-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">{achievement.title}</h2>
      </div>

      <div className="space-y-6">
        {/* Main Achievement Display */}
        <div className="card p-6 text-center space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className={`w-24 h-24 rounded-xl ${achievement.bgColor || 'bg-green-50'} flex items-center justify-center`}>
              <Icon className={achievement.iconColor || 'text-green-600'} size={48} />
            </div>
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">{achievement.title}</h3>
            <p className="text-text-secondary-light">{achievement.description}</p>
          </div>
        </div>

        {/* Completed Section */}
        {achievement.completed && achievement.earnedDate && (
          <div className={`card p-4 ${achievement.bgColor || 'bg-green-50'} rounded-xl`}>
            <h4 className="font-semibold text-lg mb-3">Completed</h4>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-text-secondary-light" />
              <span className="text-text-secondary-light">Earned on {formatDate(achievement.earnedDate)}</span>
            </div>
          </div>
        )}

        {/* Requirements Section */}
        <div className="card p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Requirements</h4>
          <ul className="space-y-2">
            {(achievement.requirements || [
              'Execute at least 1 trade',
              'Achieve positive return'
            ]).map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={`text-lg mt-0.5 ${achievement.completed ? 'text-green-600' : 'text-green-600'}`}>
                  •
                </span>
                <span className={`text-sm ${achievement.completed ? 'text-green-600' : 'text-text-secondary-light'}`}>
                  {requirement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AchievementDetailsPage


