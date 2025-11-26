import { useNavigate } from 'react-router-dom'

const HelpDetailPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Help Details</h2>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-xl font-semibold">Getting Started</h3>
        <div className="space-y-3 text-text-secondary-light">
          <p>
            Welcome to InterStock! This guide will help you get started with the platform.
          </p>
          <p>
            First, complete your profile and explore the Learn section to understand the basics of stock trading.
          </p>
          <p>
            You can practice trading in a safe, simulated environment without risking real money.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HelpDetailPage


