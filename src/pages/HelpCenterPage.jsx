import { useNavigate } from 'react-router-dom'
import { HelpCircle, ChevronRight } from 'lucide-react'

const HelpCenterPage = () => {
  const navigate = useNavigate()

  const helpTopics = [
    { title: 'Getting Started', icon: HelpCircle },
    { title: 'Trading Guide', icon: HelpCircle },
    { title: 'Account Settings', icon: HelpCircle },
    { title: 'Troubleshooting', icon: HelpCircle },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Help Center</h2>
      </div>

      <div className="space-y-2">
        {helpTopics.map((topic, index) => {
          const Icon = topic.icon
          return (
            <button
              key={index}
              onClick={() => navigate('/help-center-details')}
              className="w-full card p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span className="font-medium">{topic.title}</span>
              </div>
              <ChevronRight size={20} className="text-text-secondary-light" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HelpCenterPage


