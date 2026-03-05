import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background-light px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Forgot Password</h2>
        <p className="text-text-secondary-light mb-8">
          This feature is currently disabled. Please contact admin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Back to Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage




