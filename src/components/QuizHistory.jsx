import { useNavigate } from 'react-router-dom'

const QuizHistory = ({ quizzes = [] }) => {
  const navigate = useNavigate()

  // Default mock data if no quizzes provided
  const defaultQuizzes = [
    { id: 1, title: 'Stock Market Basics', score: 85, date: '2024-01-15' },
    { id: 2, title: 'Trading Strategies', score: 92, date: '2024-01-10' },
    { id: 3, title: 'Risk Management', score: 78, date: '2024-01-05' },
  ]

  const quizList = quizzes.length > 0 ? quizzes : defaultQuizzes

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Your Quiz History</h3>
        <button
          onClick={() => navigate('/quiz-home')}
          className="text-primary text-sm font-medium hover:underline"
        >
          See All
        </button>
      </div>
      <div className="card p-4 space-y-3">
        {quizList.slice(0, 3).map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => navigate('/quiz-home')}
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
        ))}
      </div>
    </div>
  )
}

export default QuizHistory

