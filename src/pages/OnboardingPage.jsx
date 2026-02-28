import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Welcome to InterStock',
      description: 'Learn stock trading with interactive lessons and real-time market data',
      image: '📈',
    },
    {
      title: 'Practice Trading',
      description: 'Practice buying and selling stocks in a safe, simulated environment',
      image: '💼',
    },
    {
      title: 'Compete & Learn',
      description: 'Join competitions, take quizzes, and climb the leaderboard',
      image: '🏆',
    },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      navigate('/login')
    }
  }

  const handleSkip = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-screen bg-background-light">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-8xl mb-8">{slides[currentSlide].image}</div>
        <h2 className="text-2xl font-bold font-orbitron text-center mb-4">
          {slides[currentSlide].title}
        </h2>
        <p className="text-text-secondary-light text-center mb-8 max-w-md">
          {slides[currentSlide].description}
        </p>

        {/* Dots Indicator */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-4">
        <Button onClick={handleNext} className="w-full">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
        <button
          onClick={handleSkip}
          className="w-full text-center text-text-secondary-light hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default OnboardingPage




