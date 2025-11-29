import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, Calendar, Clock, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

const QuizDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [isLate, setIsLate] = useState(false)
  const isActive = user?.isActive !== false

  // Sample quizzes data - in real app, this would come from an API
  const quizzes = [
    {
      id: 1,
      title: 'Stock Market Basics Quiz',
      deadline: '2024-11-27',
      time: '10:00 AM',
      questions: 15,
      subject: 'Trading Fundamentals',
      status: 'upcoming',
      description: 'Test your knowledge of stock market fundamentals. This quiz covers basic concepts including stock types, market operations, and trading principles.'
    },
    {
      id: 2,
      title: 'Risk Management Assessment',
      deadline: '2025-12-10',
      time: '2:00 PM',
      questions: 20,
      subject: 'Risk Management',
      status: 'upcoming',
      description: 'Assess your understanding of risk management strategies in trading. Topics include portfolio diversification, stop-loss orders, and risk assessment techniques.'
    },
    {
      id: 3,
      title: 'Options Trading Quiz',
      deadline: '2025-12-15',
      time: '3:30 PM',
      questions: 18,
      subject: 'Options Trading',
      status: 'upcoming',
      description: 'Evaluate your knowledge of options trading. This quiz covers call and put options, option strategies, and options pricing fundamentals.'
    },
    {
      id: 4,
      title: 'Quick Knowledge Check',
      deadline: '2025-12-04',
      time: '11:00 AM',
      questions: 1,
      subject: 'General Knowledge',
      status: 'upcoming',
      description: 'A quick single-question quiz to test your basic knowledge. You have 30 seconds to answer.',
      durationSeconds: 30 // Custom duration in seconds
    },
  ].map(quiz => ({
    ...quiz,
    duration: quiz.durationSeconds ? `${quiz.durationSeconds} sec` : `${quiz.questions} min` // 1 minute per question or custom duration
  }))

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === parseInt(id))
    if (foundQuiz) {
      setQuiz(foundQuiz)
      // Check if quiz is late
      const today = new Date()
      const deadlineDate = new Date(foundQuiz.deadline + ' ' + foundQuiz.time)
      setIsLate(today > deadlineDate)
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
      <div className="px-6 py-6 space-y-6">
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
      <div className="px-6 py-6 space-y-6">
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
  const canTakeQuiz = !isLate

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
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
              {daysLeft > 0 && (
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
                    durationSeconds: quiz.durationSeconds // Pass seconds if custom duration
                  } 
                })
              }
            }}
          >
            {isLate ? "You're Late - Cannot Take Quiz" : 'Start Quiz'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuizDetailPage

