import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FileText, BookOpen, Clock, Calendar, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
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

  const getDueDateStatus = (deadline, time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline + ' ' + time)
    deadlineDate.setHours(0, 0, 0, 0)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      if (diffDays === -1) {
        return { text: 'Due yesterday', color: 'text-red-600' }
      } else {
        return { text: 'Due date passed', color: 'text-red-600' }
      }
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-red-600' }
    } else {
      return { text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, color: diffDays <= 3 ? 'text-red-600' : diffDays <= 7 ? 'text-orange-600' : 'text-text-secondary-light' }
    }
  }

  // Calendar helpers
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getCalendarDays = () => {
    const year = selectedMonth.getFullYear()
    const month = selectedMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d)
    }
    return days
  }

  const getDateKey = (day) => {
    if (!day) return null
    const year = selectedMonth.getFullYear()
    const month = String(selectedMonth.getMonth() + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${year}-${month}-${d}`
  }

  // Build a map of dates to events
  const eventsByDate = useMemo(() => {
    const map = {}
    const allItems = [
      ...upcomingAssignments.map(a => ({ ...a, type: 'assignment' })),
      ...upcomingQuizzes.map(q => ({ ...q, type: 'quiz' })),
    ]
    allItems.forEach(item => {
      if (!item.deadline) return
      const dateObj = new Date(item.deadline)
      const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
      if (!map[key]) map[key] = []
      map[key].push(item)
    })
    return map
  }, [upcomingAssignments, upcomingQuizzes])

  const navigateMonth = (direction) => {
    const newMonth = new Date(selectedMonth)
    newMonth.setMonth(newMonth.getMonth() + direction)
    setSelectedMonth(newMonth)
    setSelectedDate(null)
  }

  const todayKey = (() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  })()

  // Events for the selected date
  const selectedDateEvents = selectedDate ? (eventsByDate[selectedDate] || []) : []

  // Group list items by date for the list view
  const groupedByDate = useMemo(() => {
    const items = activeTab === 'assignments' ? upcomingAssignments : upcomingQuizzes
    const groups = {}
    items.forEach(item => {
      if (!item.deadline) return
      const dateObj = new Date(item.deadline)
      const key = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      if (!groups[key]) groups[key] = { date: dateObj, items: [] }
      groups[key].items.push(item)
    })
    return Object.entries(groups).sort(([, a], [, b]) => a.date - b.date)
  }, [activeTab, upcomingAssignments, upcomingQuizzes])

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold font-orbitron">
        {requestedTab === 'assignments' ? 'Assignments' : requestedTab === 'quizzes' ? 'Quizzes' : 'Event Calendar'}
      </h2>

      {/* Mini Calendar */}
      <div className="card p-4 sm:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="font-semibold text-lg">
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </h3>
          <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-text-secondary-light py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {getCalendarDays().map((day, idx) => {
            const dateKey = getDateKey(day)
            const hasEvents = dateKey && eventsByDate[dateKey]
            const isToday = dateKey === todayKey
            const isSelected = dateKey === selectedDate
            
            return (
              <button
                key={idx}
                disabled={!day}
                onClick={() => day && setSelectedDate(dateKey === selectedDate ? null : dateKey)}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors relative ${
                  !day ? '' :
                  isSelected ? 'bg-primary text-white font-semibold' :
                  isToday ? 'bg-primary/10 text-primary font-semibold border border-primary/30' :
                  'hover:bg-gray-100'
                }`}
              >
                {day && (
                  <>
                    <span>{day}</span>
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {eventsByDate[dateKey].some(e => e.type === 'assignment') && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                        )}
                        {eventsByDate[dateKey].some(e => e.type === 'quiz') && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-orange-500'}`} />
                        )}
                      </div>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 text-xs text-text-secondary-light">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Assignment</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Quiz</span>
          </div>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            Events on {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          {selectedDateEvents.length === 0 ? (
            <div className="card p-6 text-center text-text-secondary-light">No events on this date</div>
          ) : (
            selectedDateEvents.map((item) => {
              const dueDateStatus = getDueDateStatus(item.deadline, item.time)
              const isQuiz = item.type === 'quiz'
              return (
                <div
                  key={item.id}
                  onClick={() => isQuiz ? navigate(`/quiz/${item.id}`, { state: { quiz: item } }) : navigate(`/assignment/${item.id}`, { state: { assignment: item } })}
                  className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${isQuiz ? 'bg-orange-100' : 'bg-primary/10'} flex items-center justify-center flex-shrink-0`}>
                      {isQuiz ? <BookOpen className="text-orange-600" size={20} /> : <FileText className="text-primary" size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isQuiz ? 'bg-orange-100 text-orange-700' : 'bg-primary/10 text-primary'}`}>
                          {isQuiz ? 'Quiz' : 'Assignment'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base">{item.title}</h3>
                      <p className="text-sm text-text-secondary-light">{item.subject}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-text-secondary-light">
                          <Clock size={14} />
                          <span>{item.time}</span>
                        </div>
                        <span className={`font-medium ${dueDateStatus.color}`}>{dueDateStatus.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Tab Buttons */}
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

      {/* Grouped List View */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          {!isActive ? (
            <div className="card p-8 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">Your account is deactivated. Activate your account to view assignments.</p>
            </div>
          ) : groupedByDate.length === 0 ? (
            <div className="card p-8 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming assignments</p>
            </div>
          ) : (
            groupedByDate.map(([dateLabel, group]) => (
              <div key={dateLabel}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-primary" />
                  <h4 className="font-semibold text-sm text-primary">{dateLabel}</h4>
                </div>
                <div className="space-y-3 pl-2 border-l-2 border-primary/20">
                  {group.items.map((assignment) => {
                    const dueDateStatus = getDueDateStatus(assignment.deadline, assignment.time)
                    return (
                      <div
                        key={assignment.id}
                        onClick={() => navigate(`/assignment/${assignment.id}`, { state: { assignment } })}
                        className="card p-4 hover:shadow-md transition-shadow cursor-pointer ml-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="text-primary" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                            <p className="text-sm text-text-secondary-light mb-2">{assignment.subject}</p>
                            {assignment.teacherName && (
                              <p className="text-xs text-primary font-medium mb-2">Uploaded by {assignment.teacherName}</p>
                            )}
                            <div className="flex items-center gap-4 flex-wrap">
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
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Quizzes Content */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          {!isActive ? (
            <div className="card p-8 text-center">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">Your account is deactivated. Activate your account to view quizzes.</p>
            </div>
          ) : groupedByDate.length === 0 ? (
            <div className="card p-8 text-center">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming quizzes</p>
            </div>
          ) : (
            groupedByDate.map(([dateLabel, group]) => (
              <div key={dateLabel}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-orange-500" />
                  <h4 className="font-semibold text-sm text-orange-600">{dateLabel}</h4>
                </div>
                <div className="space-y-3 pl-2 border-l-2 border-orange-200">
                  {group.items.map((quiz) => {
                    const dueDateStatus = getDueDateStatus(quiz.deadline, quiz.time)
                    const quizStatusColor = dueDateStatus.text.includes('Due in') ? 'text-orange-600' : dueDateStatus.color
                    const quizAttempt = attemptedQuizzes.find(attempt => attempt.quizId === quiz.id)
                    const isAttempted = !!quizAttempt
                    
                    return (
                      <div
                        key={quiz.id}
                        onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quiz } })}
                        className="card p-4 hover:shadow-md transition-shadow cursor-pointer ml-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="text-orange-600" size={24} />
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
                            <p className="text-sm text-text-secondary-light mb-2">{quiz.subject}</p>
                            <div className="flex items-center gap-4 flex-wrap mb-2">
                              <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                                <Clock size={16} />
                                <span>{quiz.time}</span>
                              </div>
                              {isAttempted ? (
                                <div className="text-sm font-medium text-stock-green">Attempted</div>
                              ) : (
                                <div className={`text-sm font-medium ${quizStatusColor}`}>{dueDateStatus.text}</div>
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
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default UpcomingTasksPage

