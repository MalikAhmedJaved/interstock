import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import Button from '../components/Button'

const ViewAnswerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get questions and answers from location state
  const questions = location.state?.questions || []
  const userAnswers = location.state?.answers || {} // { questionIndex: selectedOptionIndex }

  // If no questions provided, show empty state or default
  if (questions.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">View Answers</h2>
        </div>
        <div className="card p-8 text-center">
          <p className="text-text-secondary-light">No quiz data available</p>
          <Button className="mt-4" onClick={() => navigate('/quiz-home')}>
            Back to Quizzes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">View Answers</h2>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const selectedAnswer = userAnswers[index] // Get user's selected answer for this question
          const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correct
          
          return (
            <div key={index} className="card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold flex-1">Question {index + 1}: {question.question}</h3>
                {selectedAnswer !== undefined && (
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    isCorrect 
                      ? 'bg-stock-green/10 text-stock-green' 
                      : 'bg-stock-red/10 text-stock-red'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => {
                  const isCorrectOption = optIndex === question.correct
                  const isSelectedOption = optIndex === selectedAnswer
                  return (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-xl border-2 ${
                        isCorrectOption
                          ? 'border-stock-green bg-stock-green/10'
                          : isSelectedOption && !isCorrectOption
                          ? 'border-stock-red bg-stock-red/10'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrectOption && <CheckCircle className="text-stock-green" size={20} />}
                        {isSelectedOption && !isCorrectOption && <XCircle className="text-stock-red" size={20} />}
                        <span>{option}</span>
                        {isCorrectOption && <span className="ml-auto text-xs text-stock-green font-semibold">Correct Answer</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <Button className="w-full" onClick={() => navigate('/quiz-home')}>
        Back to Quizzes
      </Button>
    </div>
  )
}

export default ViewAnswerPage


