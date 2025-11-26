import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, Trophy } from 'lucide-react'

const QuizHomePage = () => {
  const navigate = useNavigate()

  const quizzes = [
    { id: 1, title: 'Stock Market Basics', questions: 10, time: '15 min', completed: true },
    { id: 2, title: 'Trading Strategies', questions: 15, time: '20 min', completed: false },
    { id: 3, title: 'Risk Management', questions: 12, time: '18 min', completed: false },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <h2 className="text-2xl font-bold font-orbitron">Quiz Home</h2>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => navigate(`/quiz-details/${quiz.completed}`)}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{quiz.title}</h3>
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
              {quiz.completed && (
                <div className="flex items-center gap-1 text-stock-green">
                  <Trophy size={16} />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
            <button className="w-full btn-primary text-sm py-2">
              {quiz.completed ? 'View Results' : 'Start Quiz'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizHomePage


