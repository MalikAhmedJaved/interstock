import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Trophy, ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import { getQuizzesWithDuration } from '../data/quizzesData'
import { API_ENDPOINTS } from '../config/api'

const QuizHomePage = () => {
  const navigate = useNavigate()
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([])
  const [latestAttempt, setLatestAttempt] = useState(null)
  const [uploadedQuizzes, setUploadedQuizzes] = useState([])

  // Use shared quizzes data
  const staticQuizzes = getQuizzesWithDuration().map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions,
    time: quiz.duration,
    deadline: quiz.deadline,
    rawDuration: quiz.duration,
    description: quiz.description,
    subject: quiz.subject,
    isRemote: false,
  }))

  const allQuizzes = [...uploadedQuizzes, ...staticQuizzes]

  useEffect(() => {
    // Load attempted quizzes from localStorage
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
    setAttemptedQuizzes(attempts)
    
    // Find latest attempt
    if (attempts.length > 0) {
      const latest = attempts.reduce((latest, current) => 
        current.timestamp > latest.timestamp ? current : latest
      )
      setLatestAttempt(latest)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const loadQuizzes = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STUDENT.QUIZZES)
        const data = await response.json()

        if (mounted && data.success && Array.isArray(data.quizzes)) {
          const mapped = data.quizzes.map((item) => ({
            id: `remote-${item._id}`,
            title: item.title,
            questions: item.questions || 10,
            time: item.duration || `${item.questions || 10} min`,
            rawDuration: item.duration || `${item.questions || 10} min`,
            deadline: item.deadline,
            description: item.description || '',
            subject: item.subject,
            teacherName: item.teacherName,
            isRemote: true,
            originalId: item._id,
          }))
          setUploadedQuizzes(mapped)
        }
      } catch {
        if (mounted) {
          setUploadedQuizzes([])
        }
      }
    }

    loadQuizzes()
    const intervalId = setInterval(loadQuizzes, 15000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  const isQuizAttempted = (quizId) => {
    if (String(quizId).startsWith('remote-')) return false
    return attemptedQuizzes.some(attempt => attempt.quizId === quizId)
  }

  const getQuizAttempt = (quizId) => {
    if (String(quizId).startsWith('remote-')) return null
    return attemptedQuizzes.find(attempt => attempt.quizId === quizId)
  }

  const handleQuizClick = (quiz) => {
    navigate(`/quiz/${quiz.id}`, { state: { quiz } })
  }

  const handleViewResults = (e, quiz, attempt) => {
    e.stopPropagation() // Prevent triggering the parent onClick
    // Navigate to view result page with attempt data
    navigate('/view-result', {
      state: {
        fromHistory: true,
        percentage: attempt.percentage,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        quizId: quiz.id
      }
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-orbitron">Quiz Home</h2>
        <Button
          variant="secondary"
          onClick={() => navigate('/upcoming-tasks?tab=quizzes')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Upcoming Quizzes
        </Button>
      </div>

      {/* Latest Attempted Quiz Section */}
      {latestAttempt && (
        <div className="card p-4 bg-primary/5 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium text-text-secondary-light mb-1">Latest Attempt</h3>
              <h3 className="font-semibold text-lg">{latestAttempt.quizTitle}</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{latestAttempt.percentage}%</div>
              <div className="text-sm text-text-secondary-light">
                {latestAttempt.score}/{latestAttempt.totalQuestions}
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary-light">
            Attempted on {new Date(latestAttempt.date).toLocaleDateString()}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {allQuizzes.map((quiz) => {
          const attempted = isQuizAttempted(quiz.id)
          const attempt = getQuizAttempt(quiz.id)
          
          return (
            <div
              key={quiz.id}
              onClick={() => handleQuizClick(quiz)}
              className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{quiz.title}</h3>
                    {quiz.teacherName && (
                      <p className="text-xs text-primary font-medium mt-0.5">Uploaded by {quiz.teacherName}</p>
                    )}
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-text-secondary-light text-sm">
                        <BookOpen size={14} />
                        <span>{quiz.questions} Questions</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-secondary-light text-sm">
                        <Clock size={14} />
                        <span>{quiz.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {attempted && (
                  <div className="flex items-center gap-1 text-stock-green">
                    <Trophy size={16} />
                    <span className="text-sm font-medium">Attempted</span>
                  </div>
                )}
              </div>
              <button 
                className="w-full btn-primary text-sm py-2"
                onClick={attempted && attempt ? (e) => handleViewResults(e, quiz, attempt) : undefined}
              >
                {quiz.isRemote ? 'View Quiz' : attempted ? 'View Results' : 'Start Quiz'}
              </button>
              {attempted && attempt && (
                <div className="mt-2 text-xs text-text-secondary-light text-center">
                  Score: {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuizHomePage


