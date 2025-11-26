import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const NewPostPage = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Create post
    navigate('/community-posts')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">New Post</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary-dark mb-2">
            What's on your mind?
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Share your thoughts..."
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </div>
  )
}

export default NewPostPage


