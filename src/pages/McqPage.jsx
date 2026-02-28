import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Clock } from 'lucide-react'
import Button from '../components/Button'
import { getQuestionsForQuiz } from '../data/quizQuestions'

const McqPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState({}) // Store all answers: { questionIndex: selectedOptionIndex }
  const answersRef = useRef({}) // Ref to track answers for immediate access
  const selectedAnswerRef = useRef(null) // Ref to track current selected answer
  const currentQuestionRef = useRef(0) // Ref to track current question for timer callback
  const [timeRemaining, setTimeRemaining] = useState(0) // in seconds
  const [isTimeUp, setIsTimeUp] = useState(false)
  const timerRef = useRef(null)

  // Get quiz ID and total questions from location state
  const quizId = location.state?.quizId
  const totalQuestions = location.state?.totalQuestions || 2
  
  // Get questions for this specific quiz
  const questions = getQuestionsForQuiz(quizId, totalQuestions)

  // Get duration from location state
  // If durationSeconds is provided, use it directly, otherwise use duration in minutes
  const durationSeconds = location.state?.durationSeconds
  const durationMinutes = location.state?.duration || questions.length
  const initialTime = durationSeconds || (durationMinutes * 60)

  // Calculate score function
  const calculateScore = (answersToCheck) => {
    let correct = 0
    questions.forEach((q, index) => {
      if (answersToCheck[index] !== undefined && answersToCheck[index] === q.correct) {
        correct++
      }
    })
    return correct
  }

  // Initialize timer when component mounts - only once
  useEffect(() => {
    // Initialize currentQuestionRef
    currentQuestionRef.current = 0
    
    // Set initial time in seconds
    setTimeRemaining(initialTime)
    
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true)
          clearInterval(timerRef.current)
          // Auto-submit when time runs out (after 1 second)
          setTimeout(() => {
            // Save current answer if selected - use ref to get latest currentQuestion
            const finalAnswers = selectedAnswerRef.current !== null 
              ? { ...answersRef.current, [currentQuestionRef.current]: selectedAnswerRef.current }
              : answersRef.current
            
            // Calculate score
            const score = calculateScore(finalAnswers)
            const totalQuestions = questions.length
            
            navigate('/view-result', {
              state: {
                score,
                totalQuestions,
                answers: finalAnswers,
                questions,
                timeUp: true,
                quizId: location.state?.quizId,
                quizTitle: location.state?.quizTitle
              }
            })
          }, 1000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount - timer should run continuously

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const submitQuiz = () => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Save current answer if selected
    const finalAnswers = selectedAnswerRef.current !== null 
      ? { ...answersRef.current, [currentQuestion]: selectedAnswerRef.current }
      : answersRef.current
    
    // Calculate score
    const score = calculateScore(finalAnswers)
    const totalQuestions = questions.length
    
    // Navigate to result page with score data
    navigate('/view-result', {
      state: {
        score,
        totalQuestions,
        answers: finalAnswers,
        questions,
        quizId: location.state?.quizId,
        quizTitle: location.state?.quizTitle
      }
    })
  }

  const handleNext = () => {
    if (isTimeUp) {
      submitQuiz()
      return
    }
    
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      currentQuestionRef.current = nextQuestion // Update ref
      // Load saved answer for next question if exists
      const nextAnswer = answersRef.current[nextQuestion]
      setSelectedAnswer(nextAnswer ?? null)
      selectedAnswerRef.current = nextAnswer ?? null
    } else {
      submitQuiz()
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Question {currentQuestion + 1}/{questions.length}</h2>
        <div className={`flex items-center gap-2 ${isTimeUp ? 'text-red-600' : timeRemaining <= 60 ? 'text-orange-600' : 'text-text-secondary-light'}`}>
          <Clock size={18} />
          <span className={`font-semibold ${isTimeUp ? 'text-red-600' : ''}`}>
            {isTimeUp ? 'Time Up!' : formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {isTimeUp && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 font-semibold">Time's up! Submitting your quiz...</p>
        </div>
      )}

      <div className="card p-6 space-y-6">
        <h3 className="text-xl font-semibold">{questions[currentQuestion].question}</h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedAnswer(index)
                selectedAnswerRef.current = index
                // Save answer immediately
                const updatedAnswers = {
                  ...answersRef.current,
                  [currentQuestion]: index
                }
                answersRef.current = updatedAnswers
                setAnswers(updatedAnswers)
              }}
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



