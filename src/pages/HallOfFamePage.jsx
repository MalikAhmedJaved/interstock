import { Trophy, Medal, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HallOfFamePage = () => {
  const navigate = useNavigate()
  
  // Top performers from Rank Page (top 3 scorers)
  const topPerformers = [
    { rank: 1, name: 'Jawad', score: 95, icon: Trophy },
    { rank: 2, name: 'Maha', score: 92, icon: Medal },
    { rank: 3, name: 'You', score: 88, icon: Award },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Hall of Fame</h2>

      <div className="space-y-4">
        {topPerformers.map((performer) => {
          const Icon = performer.icon
          return (
            <div key={performer.rank} className="card p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">#{performer.rank}</span>
                    <h3 className="text-xl font-semibold">{performer.name}</h3>
                  </div>
                  <p className="text-text-secondary-light">Score: {performer.score}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HallOfFamePage


