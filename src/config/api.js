// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    ME: `${API_BASE_URL}/auth/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  }
}

export default API_BASE_URL
