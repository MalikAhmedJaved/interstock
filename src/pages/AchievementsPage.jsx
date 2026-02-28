import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Shield, Eye, MessageCircle, Crown, Calendar } from 'lucide-react'

const AchievementsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all') // 'all' or 'completed'

  const achievements = [
    {
      id: 1,
      title: 'First Profit',
      description: 'Achieved your first profitable trade',
      icon: Trophy,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      progressColor: 'bg-green-500',
      completed: true,
      progress: { current: 1, total: 1, text: '1/1 completed' },
      earnedDate: '2024-06-15'
    },
    {
      id: 2,
      title: 'Risk Master',
      description: 'Maintained low risk portfolio for 30 days',
      icon: Shield,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      progressColor: 'bg-blue-500',
      completed: false,
      progress: { current: 10, total: 30, text: '10/30 Completed', percentage: 33 }
    },
    {
      id: 3,
      title: 'Diversification Pro',
      description: 'Maintained diverse portfolio',
      icon: Eye,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      progressColor: 'bg-purple-500',
      completed: false,
      progress: { current: 30, total: 50, text: '30/50 Completed', percentage: 60 }
    },
    {
      id: 4,
      title: 'Social Trader',
      description: 'Active in community discussions',
      icon: MessageCircle,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      progressColor: 'bg-teal-500',
      completed: false,
      progress: { current: 72, total: 100, text: '72% completed', percentage: 72 }
    },
    {
      id: 5,
      title: 'Top Performer',
      description: 'Ranked in top 10% of class',
      icon: Crown,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      progressColor: 'bg-purple-500',
      completed: false,
      progress: { current: 20, total: 10, text: 'Currently top 20%', percentage: 80 }
    },
  ]

  const completedCount = achievements.filter(a => a.completed).length
  const totalCount = achievements.length

  const filteredAchievements = activeTab === 'completed' 
    ? achievements.filter(a => a.completed)
    : achievements

  const getProgressPercentage = (achievement) => {
    if (achievement.completed) return 100
    if (achievement.progress.percentage !== undefined) return achievement.progress.percentage
    if (achievement.progress.total) {
      return Math.round((achievement.progress.current / achievement.progress.total) * 100)
    }
    return 0
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24 lg:pb-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">
          Achievements ({completedCount}/{totalCount})
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-primary text-white'
              : 'bg-white text-text-primary-dark border border-gray-200'
          }`}
        >
          All Badges
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-primary text-white'
              : 'bg-white text-text-primary-dark border border-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon
          const progressPercentage = getProgressPercentage(achievement)
          
          return (
            <div
              key={achievement.id}
              onClick={() => navigate(`/achievement-details`, { state: { achievement } })}
              className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${achievement.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={achievement.iconColor} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                  <p className="text-sm text-text-secondary-light mb-3">{achievement.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary-light">Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${achievement.progressColor}`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium text-text-secondary-light">
                      {achievement.progress.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AchievementsPage


