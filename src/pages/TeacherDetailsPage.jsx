import { useNavigate, useLocation } from 'react-router-dom'
import { User, Star, Book } from 'lucide-react'
import Button from '../components/Button'

const TeacherDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get teacher data from navigation state, or use default
  const teacher = location.state?.teacher || {
    id: 1,
    name: 'Dr. Khalid Iqbal',
    subject: 'Finance',
    rating: 4.9
  }

  // Define courses based on teacher subject
  const getCourses = (subject) => {
    if (subject === 'Finance') {
      return ['Introduction to Stocks', 'Advanced Trading', 'Risk Management']
    } else if (subject === 'Trading') {
      return ['Trading Fundamentals', 'Technical Analysis', 'Market Strategies']
    }
    return ['Introduction to Stocks', 'Advanced Trading', 'Risk Management']
  }

  // Get subject description based on teacher subject
  const getSubjectDescription = (subject) => {
    if (subject === 'Finance') {
      return 'Finance & Stock Market Analysis'
    } else if (subject === 'Trading') {
      return 'Trading & Market Strategies'
    }
    return 'Finance & Stock Market Analysis'
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Teacher Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={40} className="text-gray-400" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{teacher.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-500" size={16} />
              <span className="font-semibold">{teacher.rating}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Subject</h4>
          <p className="text-text-secondary-light">{getSubjectDescription(teacher.subject)}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Courses</h4>
          <div className="space-y-2">
            {getCourses(teacher.subject).map((course) => (
              <div key={course} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Book size={16} className="text-primary" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Message Teacher</Button>
      </div>
    </div>

    
  )
}

export default TeacherDetailsPage


