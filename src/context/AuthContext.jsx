import { createContext, useContext, useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Register new user
  const registerUser = async (userData) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone || ''
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userData', JSON.stringify(data.user))
      setUser(data.user)

      return data
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    // Check for stored auth token and verify with backend
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      // Verify token with backend
      fetch(API_ENDPOINTS.AUTH.ME, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            setUser(data.user)
            // Update stored user data
            localStorage.setItem('userData', JSON.stringify(data.user))
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('authToken')
            localStorage.removeItem('userData')
          }
        })
        .catch(() => {
          // Error fetching user, clear storage
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password')
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userData', JSON.stringify(data.user))
      setUser(data.user)
    } catch (error) {
      throw error
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('You must be logged in to change password')
      }

      const response = await fetch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (profileData) => {
    // TODO: Implement update profile API endpoint in backend
    // For now, update local state
    const updatedUserData = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone || user.phone,
    }
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    setUser(updatedUserData)
  }

  const deactivateAccount = async () => {
    // TODO: Implement deactivate account API endpoint in backend
    // For now, update local state
    const updatedUserData = {
      ...user,
      isActive: false
    }
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    setUser(updatedUserData)
  }

  const activateAccount = async () => {
    // TODO: Implement activate account API endpoint in backend
    // For now, update local state
    const updatedUserData = {
      ...user,
      isActive: true
    }
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    setUser(updatedUserData)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    registerUser,
    changePassword,
    updateProfile,
    deactivateAccount,
    activateAccount,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}




