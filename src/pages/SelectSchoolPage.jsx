import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const SelectSchoolPage = () => {
  const navigate = useNavigate()
  const [school, setSchool] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const schools = [
    'Harvard University',
    'MIT',
    'Stanford University',
    'Yale University',
    'Princeton University',
  ]

  const filteredSchools = schools.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/select-goal')
  }

  return (
    <div className="min-h-screen bg-background-light px-6 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Select School</h2>
        <p className="text-text-secondary-light mb-8">Choose your school</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Search School"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredSchools.map((schoolName) => (
              <button
                key={schoolName}
                type="button"
                onClick={() => setSchool(schoolName)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                  school === schoolName
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {schoolName}
              </button>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={!school}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SelectSchoolPage




