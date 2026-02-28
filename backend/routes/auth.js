const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production', {
    expiresIn: '30d'
  })
}

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
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

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      })
    }

    // Create new user
    const user = new User({
      name,
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production')
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
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production')
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

    // Validate new password length
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters'
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
