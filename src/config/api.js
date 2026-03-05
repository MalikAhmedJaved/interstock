// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000/api`

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    ME: `${API_BASE_URL}/auth/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  },
  STUDENT: {
    ASSIGNMENTS: `${API_BASE_URL}/student/assignments`,
    QUIZZES: `${API_BASE_URL}/student/quizzes`,
    NOTIFICATIONS: `${API_BASE_URL}/student/notifications`,
    NOTES: `${API_BASE_URL}/student/notes`,
  },
  CHAT: {
    USERS: `${API_BASE_URL}/chat/users`,
    CONVERSATIONS: `${API_BASE_URL}/chat/conversations`,
    MESSAGES: `${API_BASE_URL}/chat/messages`,
    ROOMS: `${API_BASE_URL}/chat/rooms`,
  },
  CHATBOT: {
    MESSAGE: `${API_BASE_URL}/chatbot/message`,
    HISTORY: `${API_BASE_URL}/chatbot/history`,
  }
}

export default API_BASE_URL
