import { useNavigate } from 'react-router-dom'
import { FileText, Plus } from 'lucide-react'

const AcademicNotesPage = () => {
  const navigate = useNavigate()

  const notes = [
    { id: 1, title: 'Introduction to Stocks', subject: 'Finance', date: '2024-01-15' },
    { id: 2, title: 'Trading Strategies', subject: 'Finance', date: '2024-01-10' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-orbitron">Academic Notes</h2>
        <button
          onClick={() => navigate('/add-new-notes')}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate('/academic-note-details')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-sm text-text-secondary-light mt-1">{note.subject}</p>
                <p className="text-xs text-text-secondary-light mt-2">{note.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AcademicNotesPage


