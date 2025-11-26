import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const McqPage = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const questions = [
    {
      question: 'What is a stock?',
      options: [
        'A type of bond',
        'A share of ownership in a company',
        'A type of currency',
        'A loan to a company',
      ],
      correct: 1,
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
    },
  ]

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      navigate('/view-result')
    }
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Question {currentQuestion + 1}/{questions.length}</h2>
        <div className="text-text-secondary-light">
          <span className="font-semibold text-primary">{currentQuestion + 1}</span> / {questions.length}
        </div>
      </div>

      <div className="card p-6 space-y-6">
        <h3 className="text-xl font-semibold">{questions[currentQuestion].question}</h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default McqPage


