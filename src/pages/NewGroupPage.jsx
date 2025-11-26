import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const NewGroupPage = () => {
  const navigate = useNavigate()
  const [groupName, setGroupName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Create group
    navigate('/conversations')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">New Group</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          required
        />

        <Button type="submit" className="w-full">
          Create Group
        </Button>
      </form>
    </div>
  )
}

export default NewGroupPage


