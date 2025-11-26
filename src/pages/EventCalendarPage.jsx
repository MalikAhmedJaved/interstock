import { useNavigate } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'

const EventCalendarPage = () => {
  const navigate = useNavigate()

  const events = [
    { id: 1, title: 'Trading Workshop', date: '2024-01-20', time: '2:00 PM' },
    { id: 2, title: 'Stock Market Analysis', date: '2024-01-25', time: '3:00 PM' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Event Calendar</h2>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate('/event-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-text-secondary-light text-sm">
                  <span>{event.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendarPage


