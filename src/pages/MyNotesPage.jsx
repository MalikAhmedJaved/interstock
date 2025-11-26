import { useNavigate } from 'react-router-dom'
import { Plus, FileText } from 'lucide-react'
import Button from '../components/Button'

const MyNotesPage = () => {
  const navigate = useNavigate()

  const notes = [
    { id: 1, title: 'Trading Basics', date: '2024-01-15', preview: 'Notes about stock market fundamentals...' },
    { id: 2, title: 'Risk Management', date: '2024-01-10', preview: 'Important strategies for managing risk...' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">My Notes</h2>
        </div>
        <button
          onClick={() => navigate('/my-note-details')}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate('/my-note-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-sm text-text-secondary-light mt-1">{note.preview}</p>
                <p className="text-xs text-text-secondary-light mt-2">{note.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyNotesPage


