import { useNavigate } from 'react-router-dom'
import { User, Star, Book } from 'lucide-react'
import Button from '../components/Button'

const TeacherDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
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
            <h3 className="text-2xl font-semibold">Dr. John Smith</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-500" size={16} />
              <span className="font-semibold">4.9</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Subject</h4>
          <p className="text-text-secondary-light">Finance & Stock Market Analysis</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Courses</h4>
          <div className="space-y-2">
            {['Introduction to Stocks', 'Advanced Trading', 'Risk Management'].map((course) => (
              <div key={course} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Book size={16} className="text-primary" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Follow Teacher</Button>
      </div>
    </div>
  )
}

export default TeacherDetailsPage


