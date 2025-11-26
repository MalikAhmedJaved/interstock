import { useNavigate } from 'react-router-dom'
import { Trophy, Clock } from 'lucide-react'

const CompetitionsPage = () => {
  const navigate = useNavigate()

  const competitions = [
    { id: 1, title: 'Monthly Trading Challenge', status: 'Active', endDate: '2024-01-31' },
    { id: 2, title: 'Stock Prediction Contest', status: 'Upcoming', endDate: '2024-02-15' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Competitions</h2>
      </div>

      <div className="space-y-3">
        {competitions.map((competition) => (
          <div
            key={competition.id}
            onClick={() => navigate('/competition-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{competition.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-sm font-medium ${
                    competition.status === 'Active' ? 'text-stock-green' : 'text-text-secondary-light'
                  }`}>
                    {competition.status}
                  </span>
                  <div className="flex items-center gap-1 text-text-secondary-light text-sm">
                    <Clock size={14} />
                    <span>Ends: {competition.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompetitionsPage


