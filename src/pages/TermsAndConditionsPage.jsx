import { useNavigate } from 'react-router-dom'

const TermsAndConditionsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Terms & Conditions</h2>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-xl font-semibold">Terms and Conditions</h3>
        <div className="space-y-3 text-text-secondary-light">
          <p>
            Last updated: January 2024
          </p>
          <p>
            Please read these Terms and Conditions ("Terms") carefully before using the InterStock application.
          </p>
          <h4 className="font-semibold text-text-primary-dark mt-4">Agreement to Terms</h4>
          <p>
            By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service.
          </p>
          <h4 className="font-semibold text-text-primary-dark mt-4">Use License</h4>
          <p>
            Permission is granted to temporarily use InterStock for personal, non-commercial transitory viewing only.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage


