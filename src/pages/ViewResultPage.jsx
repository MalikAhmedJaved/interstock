import { useNavigate, useLocation } from 'react-router-dom'
import { Trophy, CheckCircle, XCircle } from 'lucide-react'
import Button from '../components/Button'

const ViewResultPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get score from location state, or use defaults if not provided
  const fromHistory = location.state?.fromHistory ?? false
  
  // If from history, score is already a percentage
  // Otherwise, calculate from score/totalQuestions
  let score, totalQuestions, percentage, incorrect
  
  if (fromHistory && location.state?.percentage !== undefined) {
    // From history: get the actual attempt data from localStorage
    const quizId = location.state?.quizId
    let attemptData = null
    
    if (quizId) {
      // Try to get attempt data from localStorage using quizId
      const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
      attemptData = attempts.find(a => a.quizId === quizId)
    }
    
    if (attemptData) {
      // Use actual attempt data
      percentage = attemptData.percentage
      totalQuestions = attemptData.totalQuestions
      score = attemptData.score
      incorrect = totalQuestions - score
    } else {
      // Fallback: if totalQuestions is provided in state, use it
      totalQuestions = location.state?.totalQuestions || 10
      percentage = location.state.percentage
      score = Math.round((percentage / 100) * totalQuestions)
      incorrect = totalQuestions - score
    }
  } else {
    // From quiz completion: calculate from actual score
    score = location.state?.score ?? 0
    totalQuestions = location.state?.totalQuestions ?? 1
    percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
    incorrect = totalQuestions - score
    
    // Save quiz attempt to localStorage if quizId is provided
    const quizId = location.state?.quizId
    const quizTitle = location.state?.quizTitle
    if (quizId && !fromHistory) {
      const attemptData = {
        quizId,
        quizTitle: quizTitle || 'Quiz',
        score,
        totalQuestions,
        percentage,
        date: new Date().toISOString(),
        timestamp: Date.now()
      }
      
      // Get existing attempts
      const existingAttempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
      
      // Remove any previous attempt for this quiz (only keep latest)
      const filteredAttempts = existingAttempts.filter(attempt => attempt.quizId !== quizId)
      
      // Add new attempt
      filteredAttempts.push(attemptData)
      
      // Save back to localStorage
      localStorage.setItem('quizAttempts', JSON.stringify(filteredAttempts))
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
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

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Only show View Answers if NOT from quiz history */}
        {!fromHistory && (
          <Button 
            className="w-full" 
            onClick={() => navigate('/view-answer', { 
              state: {
                questions: location.state?.questions,
                answers: location.state?.answers
              }
            })}
          >
            View Answers
          </Button>
        )}
        {/* Quiz Home button - always visible */}
        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={() => navigate('/quiz-home')}
        >
          Quiz Home
        </Button>
      </div>
    </div>
  )
}

export default ViewResultPage


