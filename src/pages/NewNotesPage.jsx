import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const NewNotesPage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save note
    navigate('/my-note')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">New Note</h2>
      </div>

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


