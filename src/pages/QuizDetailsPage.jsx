import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Trophy } from 'lucide-react'
import Button from '../components/Button'

const QuizDetailsPage = () => {
  const { isCompleted } = useParams()
  const navigate = useNavigate()
  const completed = isCompleted === 'true'

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Quiz Details</h2>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="text-primary" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Stock Market Basics</h3>
            <p className="text-text-secondary-light">Test your knowledge</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-text-secondary-light">Questions</p>
            <p className="text-2xl font-bold">10</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-text-secondary-light">Time</p>
            <p className="text-2xl font-bold">15 min</p>
          </div>
        </div>

        {completed && (
          <div className="p-4 bg-stock-green/10 rounded-xl border border-stock-green/20">
            <div className="flex items-center gap-2 text-stock-green">
              <Trophy size={20} />
              <span className="font-semibold">Quiz Completed</span>
            </div>
            <p className="text-sm text-text-secondary-light mt-1">Score: 85/100</p>
          </div>
        )}

        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={() => {
              if (completed) {
                navigate('/view-result')
              } else {
                navigate('/mcq-page', {
                  state: {
                    totalQuestions: 10, // Quiz has 10 questions
                    duration: 15 // 15 minutes
                  }
                })
              }
            }}
          >
            {completed ? 'View Results' : 'Start Quiz'}
          </Button>
          {completed && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate('/view-answer')}
            >
              View Answers
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizDetailsPage


