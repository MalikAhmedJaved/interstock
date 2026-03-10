import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FileText, Calendar, Clock, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import { assignmentsData } from '../data/assignmentsData'
import { isAssignmentSubmitted, submitAssignment, getSubmissionDate } from '../utils/assignmentSubmissions'

const AssignmentDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [assignment, setAssignment] = useState(null)
  const [isLate, setIsLate] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionDate, setSubmissionDate] = useState(null)
  const isActive = user?.isActive !== false

  // Use shared assignments data
  const assignments = assignmentsData

  useEffect(() => {
    const stateAssignment = location.state?.assignment
    if (stateAssignment) {
      setAssignment(stateAssignment)
      const today = new Date()
      const deadlineDate = new Date(stateAssignment.deadline + ' ' + stateAssignment.time)
      setIsLate(today > deadlineDate)
      if (stateAssignment.isRemote) {
        setIsSubmitted(false)
        setSubmissionDate(null)
        return
      }
    }

    const assignmentId = parseInt(id)
    const foundAssignment = assignments.find(a => a.id === assignmentId)
    if (foundAssignment) {
      setAssignment(foundAssignment)
      // Check if assignment is late
      const today = new Date()
      const deadlineDate = new Date(foundAssignment.deadline + ' ' + foundAssignment.time)
      setIsLate(today > deadlineDate)
      
      // Check if assignment is already submitted
      const submitted = isAssignmentSubmitted(assignmentId)
      setIsSubmitted(submitted)
      if (submitted) {
        setSubmissionDate(getSubmissionDate(assignmentId))
      }
    }
  }, [id, location.state])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (assignment?.isRemote) {
      alert('Viewing teacher uploaded assignment. Submission from student panel is not enabled here yet.')
      return
    }
    if (isSubmitted) {
      alert('This assignment has already been submitted. You cannot submit it again.')
      return
    }
    if (isLate) {
      alert('You cannot submit this assignment as the due date has passed.')
      return
    }
    if (!file) {
      alert('Please select a file to submit.')
      return
    }
    // Submit assignment
    const assignmentId = parseInt(id)
    submitAssignment(assignmentId)
    setIsSubmitted(true)
    setSubmissionDate(new Date().toISOString())
    alert('Assignment submitted successfully')
    navigate('/assignments')
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
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Account Deactivated</h2>
        <div className="card p-6 text-center">
          <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-text-secondary-light">Your account is deactivated. Please activate your account to view assignments.</p>
        </div>
      </div>
    )
  }

  if (!assignment) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Assignment Not Found</h2>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Assignment Details</h2>

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

            {/* Submitted Status */}
            {isSubmitted && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                <CheckCircle size={18} />
                <span className="font-medium">
                  Assignment Submitted {submissionDate && `on ${formatDate(submissionDate.split('T')[0])}`}
                </span>
              </div>
            )}

            {/* Late Warning */}
            {isLate && !isSubmitted && (
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
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle className="mx-auto mb-3 text-green-600" size={48} />
              <p className="text-green-600 font-medium mb-2">Assignment Already Submitted</p>
              {submissionDate && (
                <p className="text-sm text-green-600">
                  Submitted on {formatDate(submissionDate.split('T')[0])}
                </p>
              )}
              <p className="text-sm text-text-secondary-light mt-2">
                You cannot submit this assignment again.
              </p>
            </div>
          ) : (
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
                  disabled={isLate || isSubmitted}
                  className="hidden"
                />
              </label>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLate || !file || isSubmitted}
              >
                {isLate ? "You're Late - Cannot Submit Assignment" : 'Submit Assignment'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentDetailPage

