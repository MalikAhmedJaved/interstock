import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const QuizHistory = ({ quizzes = [] }) => {
  const navigate = useNavigate()
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([])

  useEffect(() => {
    // Load attempted quizzes from localStorage
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
    setAttemptedQuizzes(attempts)
  }, [])

  // Default mock data if no quizzes provided - only completed quizzes with scores
  const defaultQuizzes = [
    { id: 1, title: 'Stock Market Basics', score: 85, date: '2024-01-15', completed: true },
    { id: 2, title: 'Trading Strategies', score: 92, date: '2024-01-10', completed: true },
    { id: 3, title: 'Risk Management', score: 78, date: '2024-01-05', completed: true },
  ]

  // Use attempted quizzes from localStorage if available, otherwise use provided quizzes or defaults
  const quizList = attemptedQuizzes.length > 0 
    ? attemptedQuizzes
        .sort((a, b) => b.timestamp - a.timestamp) // Sort by most recent first
        .map(attempt => ({
          id: attempt.quizId,
          title: attempt.quizTitle,
          score: attempt.percentage,
          date: new Date(attempt.date).toLocaleDateString(),
          completed: true,
          totalQuestions: attempt.totalQuestions
        }))
    : (quizzes.length > 0 ? quizzes : defaultQuizzes)
        .filter(quiz => quiz.completed && quiz.score !== undefined)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Your Quiz History</h3>
        {quizList.length > 3 && (
          <button
            onClick={() => navigate('/quiz-home')}
            className="text-primary text-sm font-medium hover:underline"
          >
            See All
          </button>
        )}
      </div>
      <div className="card p-4 space-y-3">
        {quizList.length === 0 ? (
          <p className="text-text-secondary-light text-center py-4">No quiz history available</p>
        ) : (
          quizList.slice(0, 3).map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => navigate('/view-result', { 
                state: { 
                  fromHistory: true,
                  percentage: quiz.score, // Direct percentage from history
                  quizTitle: quiz.title,
                  quizDate: quiz.date,
                  quizId: quiz.id,
                  totalQuestions: quiz.totalQuestions || 10 // Use actual totalQuestions if available
                } 
              })}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-text-secondary-light">{quiz.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">Score: {quiz.score}%</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QuizHistory

