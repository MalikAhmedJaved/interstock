import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, User, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS } from '../config/api'

const NewChatPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState([])

  useEffect(() => {
    let mounted = true

    const loadUsers = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const response = await fetch(API_ENDPOINTS.CHAT.USERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        if (mounted && response.ok && data.success) {
          setStudents(data.users || [])
        }
      } catch {
        if (mounted) {
          setStudents([])
        }
      }
    }

    loadUsers()

    return () => {
      mounted = false
    }
  }, [])

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStudentClick = (student) => {
    // Navigate to chat with the selected student
    navigate('/chat-room-details', { state: { contactName: student.name, contactId: student._id } })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">New Chat Page</h2>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary-light" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a student..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student._id}
              onClick={() => handleStudentClick(student)}
              className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-text-secondary-light">Tap to start a conversation</p>
                </div>
                <MessageCircle size={20} className="text-text-secondary-light" />
              </div>
            </div>
          ))
        ) : (
          <div className="card p-6 text-center">
            <p className="text-text-secondary-light">
              {searchTerm ? `No students found matching "${searchTerm}"` : 'No other students available'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewChatPage
