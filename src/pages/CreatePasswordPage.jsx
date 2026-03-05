import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const CreatePasswordPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-background-light px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Create Password</h2>
        <p className="text-text-secondary-light mb-8">
          Password reset via email is currently disabled.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePasswordPage




