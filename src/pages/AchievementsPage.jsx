import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Shield, Eye, MessageCircle, Crown, BookOpen, Target, Award, Calendar } from 'lucide-react'

/**
 * Achievements Section
 * 
 * Types of achievements displayed:
 * - Trading Milestones: First Profit, Portfolio Growth, Trade Volume
 * - Learning Awards: Quiz Champion, Assignment Streak
 * - Community Badges: Social Trader (chat participation)
 * - Skill Certificates: Risk Master, Diversification Pro
 * - Ranking Titles: Top Performer (leaderboard-based)
 * 
 * How achievements are earned:
 * - Milestones: Automatically tracked based on trading activity (e.g., first profitable trade)
 * - Awards: Earned by completing quizzes with high scores or submitting assignments on time
 * - Badges: Granted based on community participation (chat messages, discussions)
 * - Certificates: Earned by maintaining specific portfolio conditions over time
 * - Titles: Awarded based on leaderboard ranking position
 * 
 * UI Display:
 * - Each achievement shows an icon, title, description, and progress bar
 * - Completed achievements display a green checkmark and the earned date
 * - In-progress achievements show percentage completion with a color-coded progress bar
 * - Users can filter by "All Badges" or "Completed" tabs
 * - Clicking an achievement opens a detail page with full requirements
 */

const AchievementsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all') // 'all' or 'completed'

  const achievements = [
    {
      id: 1,
      title: 'First Profit',
      description: 'Achieved your first profitable trade',
      category: 'Trading Milestone',
      icon: Trophy,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      progressColor: 'bg-green-500',
      completed: true,
      progress: { current: 1, total: 1, text: '1/1 completed' },
      earnedDate: '2024-06-15',
      requirements: [
        'Execute at least 1 trade',
        'Achieve a positive return on the trade'
      ]
    },
    {
      id: 2,
      title: 'Risk Master',
      description: 'Maintained low risk portfolio for 30 days',
      category: 'Skill Certificate',
      icon: Shield,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      progressColor: 'bg-blue-500',
      completed: false,
      progress: { current: 10, total: 30, text: '10/30 days', percentage: 33 },
      requirements: [
        'Keep portfolio risk score below 40% for 30 consecutive days',
        'Maintain at least 3 different asset types'
      ]
    },
    {
      id: 3,
      title: 'Diversification Pro',
      description: 'Maintained a well-diversified portfolio across sectors',
      category: 'Skill Certificate',
      icon: Eye,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      progressColor: 'bg-purple-500',
      completed: false,
      progress: { current: 30, total: 50, text: '30/50 assets', percentage: 60 },
      requirements: [
        'Hold stocks from at least 5 different sectors',
        'No single stock exceeds 30% of total portfolio value'
      ]
    },
    {
      id: 4,
      title: 'Quiz Champion',
      description: 'Score 80%+ on 10 quizzes',
      category: 'Learning Award',
      icon: BookOpen,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      progressColor: 'bg-orange-500',
      completed: false,
      progress: { current: 4, total: 10, text: '4/10 quizzes', percentage: 40 },
      requirements: [
        'Attempt at least 10 quizzes',
        'Score 80% or higher on each quiz'
      ]
    },
    {
      id: 5,
      title: 'Assignment Streak',
      description: 'Submit 5 assignments before their deadlines',
      category: 'Learning Award',
      icon: Target,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      progressColor: 'bg-red-500',
      completed: false,
      progress: { current: 2, total: 5, text: '2/5 on time', percentage: 40 },
      requirements: [
        'Submit 5 assignments before the deadline',
        'Each assignment must be accepted by the teacher'
      ]
    },
    {
      id: 6,
      title: 'Social Trader',
      description: 'Active in community discussions',
      category: 'Community Badge',
      icon: MessageCircle,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      progressColor: 'bg-teal-500',
      completed: false,
      progress: { current: 72, total: 100, text: '72/100 messages', percentage: 72 },
      requirements: [
        'Send at least 100 messages in chat rooms',
        'Participate in at least 3 different chat rooms'
      ]
    },
    {
      id: 7,
      title: 'Top Performer',
      description: 'Ranked in top 10% of your class',
      category: 'Ranking Title',
      icon: Crown,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      progressColor: 'bg-purple-500',
      completed: false,
      progress: { current: 80, total: 100, text: 'Currently top 20%', percentage: 80 },
      requirements: [
        'Achieve a portfolio return in the top 10% of your batch',
        'Maintain the ranking for at least 7 consecutive days'
      ]
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
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold font-orbitron">
        Achievements ({completedCount}/{totalCount})
      </h2>

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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    {achievement.completed && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Earned</span>
                    )}
                  </div>
                  <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mb-2">{achievement.category}</span>
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


