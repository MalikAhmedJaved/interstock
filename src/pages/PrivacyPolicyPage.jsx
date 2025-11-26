import { useNavigate } from 'react-router-dom'

const PrivacyPolicyPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Privacy Policy</h2>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-xl font-semibold">Privacy Policy</h3>
        <div className="space-y-3 text-text-secondary-light">
          <p>
            Last updated: January 2024
          </p>
          <p>
            InterStock ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
          </p>
          <h4 className="font-semibold text-text-primary-dark mt-4">Information We Collect</h4>
          <p>
            We collect information that you provide directly to us, including your name, email address, and profile information.
          </p>
          <h4 className="font-semibold text-text-primary-dark mt-4">How We Use Your Information</h4>
          <p>
            We use the information we collect to provide, maintain, and improve our services, process transactions, and send you related information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage


