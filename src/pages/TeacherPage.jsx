import { useNavigate } from 'react-router-dom'
import { User, Star } from 'lucide-react'

const TeacherPage = () => {
  const navigate = useNavigate()

  const teachers = [
    { id: 1, name: 'Dr. John Smith', subject: 'Finance', rating: 4.9 },
    { id: 2, name: 'Prof. Jane Doe', subject: 'Trading', rating: 4.8 },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Teachers</h2>
      </div>

      <div className="space-y-3">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => navigate('/teacher-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{teacher.name}</h3>
                <p className="text-sm text-text-secondary-light">{teacher.subject}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="text-yellow-500" size={14} />
                  <span className="text-sm font-semibold">{teacher.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeacherPage


