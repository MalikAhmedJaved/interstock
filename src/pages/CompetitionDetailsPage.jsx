import { useNavigate } from 'react-router-dom'
import { Trophy, Users, Award } from 'lucide-react'
import Button from '../components/Button'

const CompetitionDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Competition Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Trophy className="text-primary" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Monthly Trading Challenge</h3>
            <p className="text-text-secondary-light">Compete for the top spot!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-text-secondary-light mb-2">
              <Users size={16} />
              <span className="text-sm">Participants</span>
            </div>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-text-secondary-light mb-2">
              <Award size={16} />
              <span className="text-sm">Prize</span>
            </div>
            <p className="text-2xl font-bold">$500</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Leaderboard</h4>
          <div className="space-y-2">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="font-bold">#{rank}</span>
                  <span>Player {rank}</span>
                </div>
                <span className="font-semibold">{100 - rank * 5} pts</span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Join Competition</Button>
      </div>
    </div>
  )
}

export default CompetitionDetailsPage


