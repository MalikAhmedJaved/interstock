import { useNavigate } from 'react-router-dom'
import { Trophy, Award } from 'lucide-react'

const AchievementsPage = () => {
  const navigate = useNavigate()

  const achievements = [
    { id: 1, title: 'First Trade', description: 'Complete your first trade', icon: Trophy, unlocked: true },
    { id: 2, title: 'Quiz Master', description: 'Score 100% on any quiz', icon: Award, unlocked: false },
    { id: 3, title: 'Top Trader', description: 'Reach top 10 in rankings', icon: Trophy, unlocked: false },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Achievements</h2>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          return (
            <div
              key={achievement.id}
              onClick={() => achievement.unlocked && navigate('/achievement-details')}
              className={`card p-4 flex items-center gap-4 ${
                achievement.unlocked ? 'cursor-pointer hover:shadow-md' : 'opacity-50'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                achievement.unlocked ? 'bg-primary/10' : 'bg-gray-100'
              }`}>
                <Icon className={achievement.unlocked ? 'text-primary' : 'text-gray-400'} size={32} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                <p className="text-sm text-text-secondary-light">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <span className="text-stock-green font-semibold">Unlocked</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AchievementsPage


