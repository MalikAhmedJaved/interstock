import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, Calendar, Clock, AlertCircle, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import { getQuizzesWithDuration } from '../data/quizzesData'

const QuizDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [isLate, setIsLate] = useState(false)
  const [quizAttempt, setQuizAttempt] = useState(null)
  const isActive = user?.isActive !== false

  // Use shared quizzes data
  const quizzes = getQuizzesWithDuration()

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === parseInt(id))
    if (foundQuiz) {
      setQuiz(foundQuiz)
      // Check if quiz is late
      const today = new Date()
      const deadlineDate = new Date(foundQuiz.deadline + ' ' + foundQuiz.time)
      setIsLate(today > deadlineDate)
      
      // Check if quiz has been attempted
      const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
      const attempt = attempts.find(a => a.quizId === foundQuiz.id)
      setQuizAttempt(attempt || null)
    }
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDaysUntilDeadline = (deadline, time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline + ' ' + time)
    deadlineDate.setHours(0, 0, 0, 0)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (!isActive) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">Account Deactivated</h2>
        </div>
        <div className="card p-6 text-center">
          <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-text-secondary-light">Your account is deactivated. Please activate your account to view quizzes.</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">Quiz Not Found</h2>
        </div>
      </div>
    )
  }

  const daysLeft = getDaysUntilDeadline(quiz.deadline, quiz.time)
  const canTakeQuiz = !isLate && !quizAttempt

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24 lg:pb-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/home')} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Quiz Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        {/* Quiz Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl mb-2">{quiz.title}</h3>
            <p className="text-sm text-text-secondary-light mb-4">{quiz.subject}</p>
            
            {/* Due Date Info */}
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                <Calendar size={16} />
                <span>Due: {formatDate(quiz.deadline)}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                <Clock size={16} />
                <span>{quiz.time}</span>
              </div>
              {daysLeft > 0 && !quizAttempt && (
                <div className="text-sm font-medium text-orange-600">
                  Due in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Late Warning */}
            {isLate && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                <AlertCircle size={18} />
                <span className="font-medium">You're late! The due date has passed.</span>
              </div>
            )}
            
            {/* Attempted Warning */}
            {quizAttempt && (
              <div className="flex items-center gap-2 text-stock-green bg-stock-green/10 p-3 rounded-lg mb-4">
                <Trophy size={18} />
                <span className="font-medium">
                  Quiz Attempted - Score: {quizAttempt.score}/{quizAttempt.totalQuestions} ({quizAttempt.percentage}%)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quiz Description */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-lg mb-3">Quiz Description</h4>
          <p className="text-text-secondary-light leading-relaxed">
            {quiz.description}
          </p>
        </div>

        {/* Quiz Info */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-lg mb-4">Quiz Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-text-secondary-light mb-1">Questions</p>
              <p className="text-2xl font-bold">{quiz.questions}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-text-secondary-light mb-1">Duration</p>
              <p className="text-2xl font-bold">{quiz.duration}</p>
            </div>
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="border-t border-gray-200 pt-6">
          {quizAttempt ? (
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-sm text-text-secondary-light mb-2">You have already attempted this quiz</p>
                <p className="text-lg font-bold">Score: {quizAttempt.score}/{quizAttempt.totalQuestions} ({quizAttempt.percentage}%)</p>
                <p className="text-xs text-text-secondary-light mt-1">
                  Attempted on {new Date(quizAttempt.date).toLocaleDateString()}
                </p>
              </div>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={() => {
                  // Navigate to view result page with attempt data
                  navigate('/view-result', {
                    state: {
                      fromHistory: true,
                      percentage: quizAttempt.percentage,
                      score: quizAttempt.score,
                      totalQuestions: quizAttempt.totalQuestions,
                      quizId: quiz.id
                    }
                  })
                }}
              >
                View Results
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              disabled={!canTakeQuiz}
              onClick={() => {
                if (canTakeQuiz) {
                  // If durationSeconds is set, use it (convert to minutes for timer), otherwise use questions (1 min per question)
                  const durationInMinutes = quiz.durationSeconds ? quiz.durationSeconds / 60 : quiz.questions
                  navigate('/mcq-page', { 
                    state: { 
                      duration: durationInMinutes, // Duration in minutes (or fraction for seconds)
                      totalQuestions: quiz.questions,
                      durationSeconds: quiz.durationSeconds, // Pass seconds if custom duration
                      quizId: quiz.id,
                      quizTitle: quiz.title
                    } 
                  })
                }
              }}
            >
              {isLate ? "You're Late - Cannot Take Quiz" : 'Start Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizDetailPage

