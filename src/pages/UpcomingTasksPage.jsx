import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FileText, BookOpen, Clock, Calendar, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getQuizzesWithDuration } from '../data/quizzesData'
import { assignmentsData } from '../data/assignmentsData'
import { API_ENDPOINTS } from '../config/api'

const UpcomingTasksPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('assignments') // 'assignments' or 'quizzes'
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([])
  const [uploadedAssignments, setUploadedAssignments] = useState([])
  const [uploadedQuizzes, setUploadedQuizzes] = useState([])
  const isActive = user?.isActive !== false // Default to true if not set

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'quizzes' || tab === 'assignments') {
      setActiveTab(tab)
    }
    
    // Load attempted quizzes from localStorage
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]')
    setAttemptedQuizzes(attempts)
  }, [searchParams])

  // Check if we should show tabs or just one view
  const showTabs = !searchParams.get('tab') // Show tabs only if no specific tab is requested
  const requestedTab = searchParams.get('tab')

  useEffect(() => {
    let mounted = true

    const loadRemoteData = async () => {
      try {
        const [assignmentRes, quizRes] = await Promise.all([
          fetch(API_ENDPOINTS.STUDENT.ASSIGNMENTS),
          fetch(API_ENDPOINTS.STUDENT.QUIZZES),
        ])

        const assignmentData = await assignmentRes.json()
        const quizData = await quizRes.json()

        if (mounted && assignmentData.success && Array.isArray(assignmentData.assignments)) {
          setUploadedAssignments(
            assignmentData.assignments.map((item) => ({
              id: `remote-${item._id}`,
              title: item.title,
              deadline: item.deadline,
              time: item.time || '11:59 PM',
              subject: item.subject,
              status: 'upcoming',
              description: item.description || '',
              teacherName: item.teacherName,
            }))
          )
        }

        if (mounted && quizData.success && Array.isArray(quizData.quizzes)) {
          setUploadedQuizzes(
            quizData.quizzes.map((item) => ({
              id: `remote-${item._id}`,
              title: item.title,
              deadline: item.deadline,
              time: item.time || '10:00 AM',
              questions: item.questions || 10,
              subject: item.subject,
              status: 'upcoming',
              description: item.description || '',
              duration: item.duration || `${item.questions || 10} min`,
              teacherName: item.teacherName,
            }))
          )
        }
      } catch {
        if (mounted) {
          setUploadedAssignments([])
          setUploadedQuizzes([])
        }
      }
    }

    loadRemoteData()
    const intervalId = setInterval(loadRemoteData, 15000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  const upcomingAssignments = [...uploadedAssignments, ...assignmentsData]
  const upcomingQuizzes = [
    ...uploadedQuizzes,
    ...getQuizzesWithDuration(),
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDaysUntilDeadline = (deadline, time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline + ' ' + time)
    deadlineDate.setHours(0, 0, 0, 0)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
        <h2 className="text-2xl font-bold font-orbitron">
          {requestedTab === 'assignments' ? 'Assignments' : requestedTab === 'quizzes' ? 'Quizzes' : 'Upcoming Tasks'}
        </h2>
      </div>

      {/* Tab Buttons - Only show if no specific tab is requested */}
      {showTabs && (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setActiveTab('assignments')
              navigate('/upcoming-tasks?tab=assignments', { replace: true })
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'assignments'
                ? 'bg-primary text-white'
                : 'bg-white text-text-primary-dark border border-gray-200'
            }`}
          >
            <FileText size={20} />
            <span>Assignments</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('quizzes')
              navigate('/upcoming-tasks?tab=quizzes', { replace: true })
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'quizzes'
                ? 'bg-primary text-white'
                : 'bg-white text-text-primary-dark border border-gray-200'
            }`}
          >
            <BookOpen size={20} />
            <span>Quizzes</span>
          </button>
        </div>
      )}

      {/* Assignments Content */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {!isActive ? (
            <div className="card p-8 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">Your account is deactivated. Activate your account to view assignments.</p>
            </div>
          ) : upcomingAssignments.length === 0 ? (
            <div className="card p-8 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming assignments</p>
            </div>
          ) : (
            upcomingAssignments.map((assignment) => {
              const dueDateStatus = getDueDateStatus(assignment.deadline, assignment.time)
              return (
                <div
                  key={assignment.id}
                  onClick={() => navigate(`/assignment/${assignment.id}`, { state: { assignment } })}
                  className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-primary" size={24} />
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
                        <div className={`text-sm font-medium ${dueDateStatus.color}`}>
                          {dueDateStatus.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Quizzes Content */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          {!isActive ? (
            <div className="card p-8 text-center">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">Your account is deactivated. Activate your account to view quizzes.</p>
            </div>
          ) : upcomingQuizzes.length === 0 ? (
            <div className="card p-8 text-center">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming quizzes</p>
            </div>
          ) : (
            upcomingQuizzes.map((quiz) => {
              const dueDateStatus = getDueDateStatus(quiz.deadline, quiz.time)
              // Force orange color for upcoming quizzes
              const quizStatusColor = dueDateStatus.text.includes('Due in') ? 'text-orange-600' : dueDateStatus.color
              const quizAttempt = attemptedQuizzes.find(attempt => attempt.quizId === quiz.id)
              const isAttempted = !!quizAttempt
              
              return (
                <div
                  key={quiz.id}
                  onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quiz } })}
                  className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-lg">{quiz.title}</h3>
                        {quiz.teacherName && (
                          <p className="text-xs text-primary font-medium">Uploaded by {quiz.teacherName}</p>
                        )}
                        {isAttempted && (
                          <div className="flex items-center gap-1 text-stock-green ml-2">
                            <Trophy size={16} />
                            <span className="text-sm font-medium">Attempted</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary-light mb-3">{quiz.subject}</p>
                      <div className="flex items-center gap-4 flex-wrap mb-3">
                        <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                          <Calendar size={16} />
                          <span>{formatDate(quiz.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                          <Clock size={16} />
                          <span>{quiz.time}</span>
                        </div>
                        {isAttempted ? (
                          <div className="text-sm font-medium text-stock-green">
                            Attempted
                          </div>
                        ) : (
                          <div className={`text-sm font-medium ${quizStatusColor}`}>
                            {dueDateStatus.text}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary-light">
                        <span>{quiz.questions} Questions</span>
                        <span>•</span>
                        <span>{quiz.duration}</span>
                        {isAttempted && (
                          <>
                            <span>•</span>
                            <span className="text-stock-green font-medium">
                              Score: {quizAttempt.score}/{quizAttempt.totalQuestions} ({quizAttempt.percentage}%)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default UpcomingTasksPage

