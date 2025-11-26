import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import Button from '../components/Button'

const SubmitAssignmentsPage = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit assignment
    alert('Assignment submitted successfully')
    navigate('/assignments')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Submit Assignment</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-4">Stock Analysis Report</h3>
          <p className="text-text-secondary-light mb-4">
            Upload your assignment file (PDF, DOC, DOCX)
          </p>
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
              <Upload className="mx-auto mb-2 text-text-secondary-light" size={32} />
              <p className="text-text-secondary-light">
                {file ? file.name : 'Click to upload file'}
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={!file}>
          Submit Assignment
        </Button>
      </form>
    </div>
  )
}

export default SubmitAssignmentsPage


