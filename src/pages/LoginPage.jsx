import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import TextField from '../components/TextField'
import PublicHeader from '../components/PublicHeader'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if redirected from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear the message from location state
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(formData.email, formData.password)
      navigate('/home')
    } catch (error) {
      setError(error.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-light">
      <PublicHeader />
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold font-orbitron text-center text-primary mb-8">
            InterStock
          </h1>

        <h2 className="text-2xl font-medium font-orbitron mb-6">
          Hey,<br />Login Now!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="text-right">
            <Link to="/forgot-password">
              <button
                type="button"
                className="text-sm text-text-secondary-light hover:text-primary transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log into your Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary-light mb-4">Or login with</p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                // Handle Google sign in
                console.log('Google sign in')
              }}
              className="w-full px-6 py-3 rounded-[30px] font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-text-primary-dark">
            Not a Member yet?{' '}
            <Link to="/register-email" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage




