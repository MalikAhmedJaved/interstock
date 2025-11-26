import { useNavigate } from 'react-router-dom'
import { FileText, Clock } from 'lucide-react'

const AssignmentsPage = () => {
  const navigate = useNavigate()

  const assignments = [
    { id: 1, title: 'Stock Analysis Report', dueDate: '2024-01-20', completed: false },
    { id: 2, title: 'Trading Strategy Essay', dueDate: '2024-01-25', completed: true },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Assignments</h2>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            onClick={() => navigate('/submit-assignments')}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-text-secondary-light text-sm">
                  <Clock size={14} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                {assignment.completed && (
                  <span className="inline-block mt-2 text-sm text-stock-green font-semibold">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssignmentsPage


