import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const SelectGoalPage = () => {
  const navigate = useNavigate()
  const [selectedGoal, setSelectedGoal] = useState('')

  const goals = [
    { id: 'learn', title: 'Learn Trading', icon: '📚' },
    { id: 'practice', title: 'Practice Trading', icon: '💼' },
    { id: 'compete', title: 'Compete & Win', icon: '🏆' },
    { id: 'invest', title: 'Learn Investing', icon: '💰' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedGoal) {
      navigate('/upload-picture')
    }
  }

  return (
    <div className="min-h-screen bg-background-light px-6 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Select Your Goal</h2>
        <p className="text-text-secondary-light mb-8">What do you want to achieve?</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {goals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedGoal === goal.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{goal.icon}</span>
                <span className="font-medium">{goal.title}</span>
              </div>
            </button>
          ))}

          <Button type="submit" className="w-full mt-6" disabled={!selectedGoal}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SelectGoalPage




