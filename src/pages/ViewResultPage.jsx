import { useNavigate, useLocation } from 'react-router-dom'
import { Trophy, CheckCircle, XCircle } from 'lucide-react'

const ViewResultPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get score from location state, or use defaults if not provided
  const score = location.state?.score ?? 0
  const totalQuestions = location.state?.totalQuestions ?? 1
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const incorrect = totalQuestions - score

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Quiz Results</h2>
      </div>

      <div className="card p-6 space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="text-primary" size={48} />
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-2">{score}/{totalQuestions}</h3>
          <p className="text-2xl font-semibold text-primary mb-1">{percentage}%</p>
          <p className="text-text-secondary-light">
            {percentage === 100 ? 'Perfect score!' : percentage >= 70 ? 'Great job!' : percentage >= 50 ? 'Good try!' : 'Keep practicing!'}
          </p>
          {location.state?.timeUp && (
            <p className="text-sm text-orange-600 mt-2">Time ran out</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-stock-green/10 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-stock-green mb-2">
              <CheckCircle size={20} />
            </div>
            <p className="text-2xl font-bold">{score}</p>
            <p className="text-sm text-text-secondary-light">Correct</p>
          </div>
          <div className="p-4 bg-stock-red/10 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-stock-red mb-2">
              <XCircle size={20} />
            </div>
            <p className="text-2xl font-bold">{totalQuestions - score}</p>
            <p className="text-sm text-text-secondary-light">Incorrect</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResultPage


