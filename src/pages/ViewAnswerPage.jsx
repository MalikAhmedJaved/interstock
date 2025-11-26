import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import Button from '../components/Button'

const ViewAnswerPage = () => {
  const navigate = useNavigate()

  const answers = [
    {
      question: 'What is a stock?',
      options: [
        'A type of bond',
        'A share of ownership in a company',
        'A type of currency',
        'A loan to a company',
      ],
      correct: 1,
      selected: 1,
    },
    {
      question: 'What does IPO stand for?',
      options: [
        'Initial Public Offering',
        'International Portfolio Option',
        'Investment Portfolio Organization',
        'Initial Private Offering',
      ],
      correct: 0,
      selected: 0,
    },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">View Answers</h2>
      </div>

      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div key={index} className="card p-6 space-y-4">
            <h3 className="text-lg font-semibold">{answer.question}</h3>
            <div className="space-y-2">
              {answer.options.map((option, optIndex) => {
                const isCorrect = optIndex === answer.correct
                const isSelected = optIndex === answer.selected
                return (
                  <div
                    key={optIndex}
                    className={`p-3 rounded-xl border-2 ${
                      isCorrect
                        ? 'border-stock-green bg-stock-green/10'
                        : isSelected && !isCorrect
                        ? 'border-stock-red bg-stock-red/10'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect && <CheckCircle className="text-stock-green" size={20} />}
                      {isSelected && !isCorrect && <XCircle className="text-stock-red" size={20} />}
                      <span>{option}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={() => navigate('/quiz-home')}>
        Back to Quizzes
      </Button>
    </div>
  )
}

export default ViewAnswerPage


