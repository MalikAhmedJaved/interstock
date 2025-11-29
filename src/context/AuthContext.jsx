import { createContext, useContext, useState, useEffect } from 'react'

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

  // Get registered users from localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers')
    return users ? JSON.parse(users) : []
  }

  // Save registered user
  const registerUser = (userData) => {
    const users = getRegisteredUsers()
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User with this email already exists')
    }
    // Set isActive to true by default for new users
    users.push({ ...userData, isActive: true })
    localStorage.setItem('registeredUsers', JSON.stringify(users))
  }

  useEffect(() => {
    // Check for stored auth token and user data
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    if (token && userData) {
      const parsedUserData = JSON.parse(userData)
      // Ensure isActive is set (default to true if not set)
      if (parsedUserData.isActive === undefined) {
        parsedUserData.isActive = true
      }
      setUser(parsedUserData)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const users = getRegisteredUsers()
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const token = `token-${Date.now()}`
    const userData = {
      token,
      email: foundUser.email,
      name: foundUser.name,
      phone: foundUser.phone || '',
      isActive: foundUser.isActive !== undefined ? foundUser.isActive : true
    }
    
    localStorage.setItem('authToken', token)
    localStorage.setItem('userData', JSON.stringify(userData))
    setUser(userData)
  }

  const changePassword = (currentPassword, newPassword) => {
    const users = getRegisteredUsers()
    const currentUserEmail = user?.email
    
    if (!currentUserEmail) {
      throw new Error('User not logged in')
    }

    // Find the current user
    const userIndex = users.findIndex(u => u.email === currentUserEmail)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Verify current password
    if (users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect')
    }

    // Update password
    users[userIndex].password = newPassword
    localStorage.setItem('registeredUsers', JSON.stringify(users))
  }

  const updateProfile = (profileData) => {
    const users = getRegisteredUsers()
    const currentUserEmail = user?.email
    
    if (!currentUserEmail) {
      throw new Error('User not logged in')
    }

    // Find the current user
    const userIndex = users.findIndex(u => u.email === currentUserEmail)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Update user data
    users[userIndex].name = profileData.name
    users[userIndex].email = profileData.email
    if (profileData.phone) {
      users[userIndex].phone = profileData.phone
    }
    
    // Save updated users
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    // Update current user state
    const updatedUserData = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone || user.phone,
    }
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    setUser(updatedUserData)
  }

  const deactivateAccount = () => {
    const users = getRegisteredUsers()
    const currentUserEmail = user?.email
    
    if (!currentUserEmail) {
      throw new Error('User not logged in')
    }

    const userIndex = users.findIndex(u => u.email === currentUserEmail)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Set isActive to false
    users[userIndex].isActive = false
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    // Update current user state
    const updatedUserData = {
      ...user,
      isActive: false
    }
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    setUser(updatedUserData)
  }

  const activateAccount = () => {
    const users = getRegisteredUsers()
    const currentUserEmail = user?.email
    
    if (!currentUserEmail) {
      throw new Error('User not logged in')
    }

    const userIndex = users.findIndex(u => u.email === currentUserEmail)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Set isActive to true
    users[userIndex].isActive = true
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    // Update current user state
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




