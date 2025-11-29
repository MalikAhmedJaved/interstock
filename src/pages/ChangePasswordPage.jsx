import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import TextField from '../components/TextField'

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const { changePassword } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
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
      await changePassword(formData.currentPassword, formData.newPassword)
      alert('Password changed successfully!')
      navigate('/profile')
    } catch (error) {
      setErrors({
        currentPassword: error.message || 'Failed to change password. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          required
        />

        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />

        <TextField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Changing Password...' : 'Change Password'}
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordPage


