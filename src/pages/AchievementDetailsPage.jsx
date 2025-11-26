import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'

const AchievementDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Achievement Details</h2>
      </div>

      <div className="card p-6 space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="text-primary" size={64} />
          </div>
        </div>
        <h3 className="text-2xl font-semibold">First Trade</h3>
        <p className="text-text-secondary-light">
          Congratulations! You completed your first trade.
        </p>
        <p className="text-sm text-text-secondary-light">Unlocked on January 15, 2024</p>
      </div>
    </div>
  )
}

export default AchievementDetailsPage


