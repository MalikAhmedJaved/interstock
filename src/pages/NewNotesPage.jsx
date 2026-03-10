import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FileText, Edit2, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { API_ENDPOINTS } from '../config/api'

const NewNotesPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const existingNote = location.state?.note
  const isViewingNote = !!existingNote

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title)
      setContent(existingNote.content)
      setIsEditing(location.state?.isEditing || false)
    } else {
      setTitle('')
      setContent('')
      setIsEditing(false)
    }
  }, [existingNote, location.state?.isEditing])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userName = user?.name || 'Unknown User'
    const userId = user?.id || user?._id || ''

    if (!userId) {
      alert('Unable to identify logged in user')
      return
    }

    try {
      if (isEditing && existingNote?.isRemote) {
        if (!existingNote.canEdit) {
          alert('You can only edit your own notes')
          return
        }

        const response = await fetch(`${API_ENDPOINTS.STUDENT.NOTES}/${existingNote.remoteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            userId,
          }),
        })

        const data = await response.json()
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to update note')
        }

        navigate('/my-note')
        return
      }

      if (!isViewingNote) {
        const response = await fetch(API_ENDPOINTS.STUDENT.NOTES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            username: userName,
            userId,
          }),
        })

        const data = await response.json()
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to save note')
        }

        navigate('/my-note')
        return
      }
    } catch (error) {
      alert(error.message || 'Failed to save note')
    }
  }

  const handleDelete = async () => {
    const userId = user?.id || user?._id || ''

    if (!existingNote?.isRemote) {
      alert('Only backend notes are supported now')
      return
    }

    if (!existingNote?.canEdit) {
      alert('You can only delete your own notes')
      return
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.STUDENT.NOTES}/${existingNote.remoteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete note')
      }

      navigate('/my-note')
    } catch (error) {
      alert(error.message || 'Failed to delete note')
    }
  }

  if (isViewingNote && isEditing) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Edit Note</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Write your notes here..."
              required
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={() => navigate('/my-note-details', { state: { note: existingNote } })} className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    )
  }

  if (isViewingNote) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-orbitron">Note Details</h2>

        <div className="card p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="text-primary" size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{existingNote.title}</h3>
                  <p className="text-sm text-text-secondary-light">{existingNote.date}</p>
                  {existingNote.username && (
                    <p className="text-sm text-primary mt-1 font-medium">
                      Uploaded by {existingNote.username === user?.name ? 'You' : existingNote.username}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {existingNote.canEdit && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Edit note"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-text-primary-dark leading-relaxed">
              {existingNote.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold mb-4 mt-6 first:mt-0">{line.substring(2)}</h1>
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold mb-3 mt-5 first:mt-0">{line.substring(3)}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-semibold mb-2 mt-4 first:mt-0">{line.substring(4)}</h3>
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return (
                    <div key={index} className="ml-4 mb-1 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  )
                }
                if (line.trim() === '') {
                  return <div key={index} className="h-3" />
                }
                if (line.match(/^\d+\.\s/)) {
                  return (
                    <div key={index} className="ml-4 mb-1 flex items-start">
                      <span className="mr-2 font-semibold">{line.match(/^\d+\./)[0]}</span>
                      <span>{line.replace(/^\d+\.\s/, '')}</span>
                    </div>
                  )
                }
                return <p key={index} className="mb-3">{line}</p>
              })}
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-xl font-semibold">Delete Note</h3>
              <p className="text-text-secondary-light">
                Are you sure you want to delete "{existingNote.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold font-orbitron">New Note</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />

        <div>
          <label className="block text-sm font-medium text-text-primary-dark mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Write your notes here..."
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Save Note
        </Button>
      </form>
    </div>
  )
}

export default NewNotesPage
