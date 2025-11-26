import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Button from '../components/Button'

const EventDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Event Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        <h3 className="text-2xl font-semibold">Trading Workshop</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" size={20} />
            <span>January 20, 2024</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-primary" size={20} />
            <span>2:00 PM - 4:00 PM</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-primary" size={20} />
            <span>Online Event</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-text-secondary-light">
            Join us for an interactive trading workshop where you'll learn advanced strategies and techniques.
          </p>
        </div>

        <Button className="w-full">Register for Event</Button>
      </div>
    </div>
  )
}

export default EventDetailsPage


