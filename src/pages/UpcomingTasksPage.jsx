import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FileText, BookOpen, Clock, Calendar } from 'lucide-react'

const UpcomingTasksPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('assignments') // 'assignments' or 'quizzes'

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'quizzes' || tab === 'assignments') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Sample data - in real app, this would come from an API
  const upcomingAssignments = [
    {
      id: 1,
      title: 'Stock Market Analysis Report',
      deadline: '2024-02-15',
      time: '11:59 PM',
      subject: 'Trading Fundamentals',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Trading Strategy Essay',
      deadline: '2024-02-20',
      time: '11:59 PM',
      subject: 'Advanced Trading',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Portfolio Management Assignment',
      deadline: '2024-02-25',
      time: '11:59 PM',
      subject: 'Portfolio Management',
      status: 'upcoming'
    },
  ]

  const upcomingQuizzes = [
    {
      id: 1,
      title: 'Stock Market Basics Quiz',
      deadline: '2024-02-12',
      time: '10:00 AM',
      questions: 15,
      duration: '20 min',
      subject: 'Trading Fundamentals',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Risk Management Assessment',
      deadline: '2024-02-18',
      time: '2:00 PM',
      questions: 20,
      duration: '30 min',
      subject: 'Risk Management',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Options Trading Quiz',
      deadline: '2024-02-22',
      time: '3:30 PM',
      questions: 18,
      duration: '25 min',
      subject: 'Options Trading',
      status: 'upcoming'
    },
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

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Upcoming Tasks</h2>
      </div>

      {/* Tab Buttons */}
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

      {/* Assignments Content */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {upcomingAssignments.length === 0 ? (
            <div className="card p-8 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming assignments</p>
            </div>
          ) : (
            upcomingAssignments.map((assignment) => {
              const daysLeft = getDaysUntilDeadline(assignment.deadline)
              return (
                <div
                  key={assignment.id}
                  className="card p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                      <p className="text-sm text-text-secondary-light mb-3">{assignment.subject}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                          <Calendar size={16} />
                          <span>{formatDate(assignment.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                          <Clock size={16} />
                          <span>{assignment.time}</span>
                        </div>
                        <div className={`text-sm font-medium ${
                          daysLeft <= 3 ? 'text-red-600' : daysLeft <= 7 ? 'text-orange-600' : 'text-text-secondary-light'
                        }`}>
                          {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` : 'Due today'}
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
          {upcomingQuizzes.length === 0 ? (
            <div className="card p-8 text-center">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary-light">No upcoming quizzes</p>
            </div>
          ) : (
            upcomingQuizzes.map((quiz) => {
              const daysLeft = getDaysUntilDeadline(quiz.deadline)
              return (
                <div
                  key={quiz.id}
                  className="card p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{quiz.title}</h3>
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
                        <div className={`text-sm font-medium ${
                          daysLeft <= 3 ? 'text-red-600' : daysLeft <= 7 ? 'text-orange-600' : 'text-text-secondary-light'
                        }`}>
                          {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` : 'Due today'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary-light">
                        <span>{quiz.questions} Questions</span>
                        <span>•</span>
                        <span>{quiz.duration}</span>
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

