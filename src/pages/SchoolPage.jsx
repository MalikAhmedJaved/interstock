import { useNavigate } from 'react-router-dom'
import { School, Users } from 'lucide-react'

const SchoolPage = () => {
  const navigate = useNavigate()

  const schools = [
    { id: 1, name: 'Harvard University', students: 2500, rating: 4.8 },
    { id: 2, name: 'MIT', students: 1800, rating: 4.9 },
    { id: 3, name: 'Stanford University', students: 2200, rating: 4.7 },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Popular Schools</h2>
      </div>

      <div className="space-y-3">
        {schools.map((school) => (
          <div
            key={school.id}
            onClick={() => navigate('/school-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <School className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{school.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-text-secondary-light text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{school.students} students</span>
                  </div>
                  <span>⭐ {school.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchoolPage


