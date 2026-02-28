import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import TextField from '../components/TextField'
import PublicHeader from '../components/PublicHeader'

const RegisterEmailPage = () => {
  const navigate = useNavigate()
  const { registerUser } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email'
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Register the user
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      
      // Navigate directly to login page after successful registration
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login with your credentials.' 
        } 
      })
    } catch (error) {
      setErrors({ 
        email: error.message || 'Registration failed. Please try again.' 
      })
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

          <h2 className="text-2xl font-medium font-orbitron mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <TextField
              label="Confirm Email"
              name="confirmEmail"
              type="email"
              placeholder="Confirm your email"
              value={formData.confirmEmail}
              onChange={handleChange}
              error={errors.confirmEmail}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-primary-dark">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterEmailPage




