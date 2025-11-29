import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, Calendar, Clock, Upload, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

const AssignmentDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [assignment, setAssignment] = useState(null)
  const [isLate, setIsLate] = useState(false)
  const isActive = user?.isActive !== false

  // Sample assignments data - in real app, this would come from an API
  const assignments = [
    {
      id: 1,
      title: 'Stock Market Analysis Report',
      deadline: '2024-11-28',
      time: '11:59 PM',
      subject: 'Trading Fundamentals',
      status: 'upcoming',
      description: 'Analyze the current stock market trends and provide a comprehensive report on your findings. Include market indicators, sector performance, and future predictions.'
    },
    {
      id: 2,
      title: 'Trading Strategy Essay',
      deadline: '2025-12-05',
      time: '11:59 PM',
      subject: 'Advanced Trading',
      status: 'upcoming',
      description: 'Write a detailed essay on different trading strategies, their pros and cons, and when to use each strategy. Include real-world examples.'
    },
    {
      id: 3,
      title: 'Portfolio Management Assignment',
      deadline: '2025-12-05',
      time: '11:59 PM',
      subject: 'Portfolio Management',
      status: 'upcoming',
      description: 'Create a portfolio management plan for a hypothetical client. Include risk assessment, asset allocation, and rebalancing strategies.'
    },
  ]

  useEffect(() => {
    const foundAssignment = assignments.find(a => a.id === parseInt(id))
    if (foundAssignment) {
      setAssignment(foundAssignment)
      // Check if assignment is late
      const today = new Date()
      const deadlineDate = new Date(foundAssignment.deadline + ' ' + foundAssignment.time)
      setIsLate(today > deadlineDate)
    }
  }, [id])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLate) {
      alert('You cannot submit this assignment as the due date has passed.')
      return
    }
    if (!file) {
      alert('Please select a file to submit.')
      return
    }
    // Submit assignment
    alert('Assignment submitted successfully')
    navigate('/upcoming-tasks?tab=assignments')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (!isActive) {
    return (
      <div className="px-6 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">Account Deactivated</h2>
        </div>
        <div className="card p-6 text-center">
          <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-text-secondary-light">Your account is deactivated. Please activate your account to view assignments.</p>
        </div>
      </div>
    )
  }

  if (!assignment) {
    return (
      <div className="px-6 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">Assignment Not Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Assignment Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        {/* Assignment Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl mb-2">{assignment.title}</h3>
            <p className="text-sm text-text-secondary-light mb-4">{assignment.subject}</p>
            
            {/* Due Date Info */}
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                <Calendar size={16} />
                <span>Due: {formatDate(assignment.deadline)}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary-light text-sm">
                <Clock size={16} />
                <span>{assignment.time}</span>
              </div>
            </div>

            {/* Late Warning */}
            {isLate && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                <AlertCircle size={18} />
                <span className="font-medium">You're late! The due date has passed.</span>
              </div>
            )}
          </div>
        </div>

        {/* Assignment Description */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-lg mb-3">Assignment Description</h4>
          <p className="text-text-secondary-light leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Submission Form */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-lg mb-4">Submit Your Assignment</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="cursor-pointer">
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isLate 
                  ? 'border-gray-300 bg-gray-50' 
                  : 'border-gray-300 hover:border-primary'
              }`}>
                <Upload className={`mx-auto mb-2 ${isLate ? 'text-gray-400' : 'text-text-secondary-light'}`} size={32} />
                <p className={isLate ? 'text-gray-400' : 'text-text-secondary-light'}>
                  {file ? file.name : 'Click to upload file (PDF, DOC, DOCX)'}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isLate}
                className="hidden"
              />
            </label>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLate || !file}
            >
              {isLate ? "You're Late - Cannot Submit Assignment" : 'Submit Assignment'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AssignmentDetailPage

