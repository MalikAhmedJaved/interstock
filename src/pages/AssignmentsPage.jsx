import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { assignmentsData } from '../data/assignmentsData'
import { isAssignmentSubmitted } from '../utils/assignmentSubmissions'
import { API_ENDPOINTS } from '../config/api'

const AssignmentsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [uploadedAssignments, setUploadedAssignments] = useState([])

  useEffect(() => {
    let mounted = true

    const loadAssignments = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STUDENT.ASSIGNMENTS)
        const data = await response.json()

        if (mounted && data.success && Array.isArray(data.assignments)) {
          const mapped = data.assignments.map((item) => ({
            id: `remote-${item._id}`,
            title: item.title,
            deadline: item.deadline,
            time: item.time || '11:59 PM',
            subject: item.subject,
            status: 'upcoming',
            description: item.description || '',
            teacherName: item.teacherName,
            isRemote: true,
            originalId: item._id,
          }))
          setUploadedAssignments(mapped)
        }
      } catch {
        if (mounted) {
          setUploadedAssignments([])
        }
      }
    }

    loadAssignments()
    const intervalId = setInterval(loadAssignments, 15000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  const upcomingAssignments = [...uploadedAssignments, ...assignmentsData]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDueDateStatus = (deadline, time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline + ' ' + time)
    deadlineDate.setHours(0, 0, 0, 0)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      // Date has passed
      if (diffDays === -1) {
        return { text: 'Due yesterday', color: 'text-red-600' }
      } else {
        return { text: 'Due date passed', color: 'text-red-600' }
      }
    } else if (diffDays === 0) {
      // Due today
      return { text: 'Due today', color: 'text-red-600' }
    } else {
      // Upcoming - show days remaining
      return { text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, color: diffDays <= 3 ? 'text-red-600' : diffDays <= 7 ? 'text-orange-600' : 'text-text-secondary-light' }
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/home')} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Assignments</h2>
      </div>

      <div className="space-y-4">
        {!isActive ? (
          <div className="card p-8 text-center">
            <AlertCircle className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-text-secondary-light">Your account is deactivated. Activate your account to view assignments.</p>
          </div>
        ) : upcomingAssignments.length === 0 ? (
          <div className="card p-8 text-center">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-text-secondary-light">No upcoming assignments</p>
          </div>
        ) : (
          upcomingAssignments.map((assignment) => {
            const isSubmitted = assignment.isRemote ? false : isAssignmentSubmitted(assignment.id)
            const dueDateStatus = getDueDateStatus(assignment.deadline, assignment.time)
            return (
              <div
                key={assignment.id}
                onClick={() => navigate(`/assignment/${assignment.id}`, { state: { assignment } })}
                className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSubmitted ? 'bg-green-50' : 'bg-primary/10'
                  }`}>
                    {isSubmitted ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <FileText className="text-primary" size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                    <p className="text-sm text-text-secondary-light mb-3">{assignment.subject}</p>
                    {assignment.teacherName && (
                      <p className="text-xs text-primary font-medium mb-2">Uploaded by {assignment.teacherName}</p>
                    )}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                        <Calendar size={16} />
                        <span>{formatDate(assignment.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                        <Clock size={16} />
                        <span>{assignment.time}</span>
                      </div>
                      {isSubmitted ? (
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <CheckCircle size={16} />
                          <span>Submitted</span>
                        </div>
                      ) : (
                        <div className={`text-sm font-medium ${dueDateStatus.color}`}>
                          {dueDateStatus.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AssignmentsPage


