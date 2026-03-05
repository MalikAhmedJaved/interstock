const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

const nameRegex = /^[A-Za-z\s.'-]+$/
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

const validateName = (name = '') => {
  const trimmedName = name.trim()
  if (!trimmedName) {
    return 'Please provide name, email, and password'
  }
  if (!nameRegex.test(trimmedName)) {
    return 'Full name must contain letters only. Numbers are not allowed.'
  }
  if (trimmedName.length < 2) {
    return 'Full name must be at least 2 characters'
  }
  return null
}

const validateStrongPassword = (password = '', fieldLabel = 'Password') => {
  if (!strongPasswordRegex.test(password)) {
    return `${fieldLabel} must be at least 8 characters and include uppercase, lowercase, and numbers`
  }
  return null
}

const getTokenFromRequest = (req) => req.headers.authorization?.split(' ')[1]

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d'
  })
}

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      })
    }

    const nameError = validateName(name)
    if (nameError) {
      return res.status(400).json({
        success: false,
        message: nameError
      })
    }

    const passwordError = validateStrongPassword(password)
    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      isActive: true
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Return user data (password is automatically excluded by toJSON method)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Sign up error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    })
  }
})

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    // Return user data
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Sign in error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    })
  }
})

// Get current user (protected route - requires token)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
})

// Change Password (protected route - requires token)
router.put('/change-password', async (req, res) => {
  try {
    const token = getTokenFromRequest(req)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const { currentPassword, newPassword } = req.body

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current password and new password'
      })
    }

    const passwordError = validateStrongPassword(newPassword, 'New password')
    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Check if new password is same as current password
    const isSamePassword = await user.comparePassword(newPassword)
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      })
    }

    // Update password (will be hashed automatically by pre-save hook)
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during password change'
    })
  }
})

module.exports = router
