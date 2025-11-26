import { useNavigate } from 'react-router-dom'
import { School, Users, Star } from 'lucide-react'
import Button from '../components/Button'

const SchoolDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">School Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <School className="text-primary" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Harvard University</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-500" size={16} />
              <span className="font-semibold">4.8</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-text-secondary-light mb-2">
              <Users size={16} />
              <span className="text-sm">Students</span>
            </div>
            <p className="text-2xl font-bold">2,500</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-text-secondary-light mb-2">Courses</p>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-text-secondary-light">
            Harvard University offers comprehensive stock market education programs for students.
          </p>
        </div>

        <Button className="w-full">Join School</Button>
      </div>
    </div>
  )
}

export default SchoolDetailsPage


