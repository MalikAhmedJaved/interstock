import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Plus, FileText, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS } from '../config/api'

const MyNotesPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [showDialog, setShowDialog] = useState(false)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    if (!isActive) {
      setShowDialog(true)
    }
  }, [isActive])

  useEffect(() => {
    let mounted = true

    const loadSharedNotes = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STUDENT.NOTES)
        const data = await response.json()

        if (mounted && data.success && Array.isArray(data.notes)) {
          const mapped = data.notes
            .map((item) => ({
              id: `remote-${item._id}`,
              title: item.title,
              date: item.date || new Date(item.createdAt).toISOString().split('T')[0],
              preview: item.preview || '',
              content: item.content || '',
              username: item.username,
              isRemote: true,
              remoteId: item._id,
              ownerId: item.userId,
              canEdit: item.userId === (user?.id || user?._id),
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date))

          setNotes(mapped)
        }
      } catch {
        if (mounted) {
          setNotes([])
        }
      }
    }

    loadSharedNotes()
    const intervalId = setInterval(loadSharedNotes, 12000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [location.key, user?.id, user?._id])

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">My Notes</h2>
        {isActive && (
          <button
            onClick={() => navigate('/my-note-details')}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {showDialog && !isActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 relative">
          <button
            onClick={() => setShowDialog(false)}
            className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-blue-800 font-semibold text-sm">Account Deactivated</p>
              <p className="text-blue-700 text-sm mt-1">You can only view previous notes. Activate account to create/update notes.</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate('/my-note-details', { state: { note } })}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-sm text-text-secondary-light mt-1">{note.preview}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-text-secondary-light">{note.date}</p>
                  {note.username && (
                    <>
                      <span className="text-xs text-text-secondary-light">•</span>
                      <p className="text-xs text-primary font-medium">
                        Uploaded by {note.username === user?.name ? 'You' : note.username}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="card p-6 text-center text-text-secondary-light">
            No notes found yet. Add a note and it will be visible to all students.
          </div>
        )}
      </div>
    </div>
  )
}

export default MyNotesPage
