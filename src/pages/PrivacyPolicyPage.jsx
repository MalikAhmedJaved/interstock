import { useNavigate } from 'react-router-dom'

const PrivacyPolicyPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Privacy Policy</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Privacy Policy</h3>
          <p className="text-text-secondary-light text-sm mt-1">Last updated: March 2026</p>
        </div>

        <div className="space-y-5 text-text-secondary-light text-sm leading-relaxed">
          <p>
            InterStock ("we", "our", or "us") is an educational stock trading simulation platform developed as a Final Year Project (FYP). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
          </p>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">1. Information We Collect</h4>
            <p className="mb-2">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Account Information:</strong> Name, email address, and password when you register an account.</li>
              <li><strong>Profile Data:</strong> Profile picture and any information you choose to add to your profile.</li>
              <li><strong>Trading Activity:</strong> Simulated trades, portfolio holdings, order history, and watchlist preferences.</li>
              <li><strong>Quiz & Assignment Data:</strong> Quiz scores, assignment submissions, and learning progress.</li>
              <li><strong>Chat Data:</strong> Messages sent in chat rooms and private conversations.</li>
              <li><strong>Device Information:</strong> Browser type, device type, and general usage analytics.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">2. How We Use Your Information</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To create and manage your InterStock account.</li>
              <li>To provide simulated stock trading services for educational purposes.</li>
              <li>To track your learning progress through quizzes, assignments, and achievements.</li>
              <li>To enable communication through chat rooms and private conversations.</li>
              <li>To generate leaderboards, rankings, and hall of fame standings.</li>
              <li>To send notifications about trading activity, assignments, and platform updates.</li>
              <li>To improve and optimize the platform experience.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">3. Data Storage & Security</h4>
            <p>
              Your account data is stored securely on our servers using industry-standard encryption. Passwords are hashed using bcrypt and are never stored in plain text. Some user preferences and session data may be stored locally on your device using browser storage.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">4. Educational Purpose Disclaimer</h4>
            <p>
              InterStock is a simulation platform designed solely for educational purposes. No real money is involved in any transactions. All stock prices, trades, and portfolio values are simulated and do not represent real financial instruments or actual market data.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">5. Data Sharing</h4>
            <p className="mb-2">We do not sell, trade, or rent your personal information to third parties. Your information may be visible to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Other registered users (name and profile picture in chat rooms, leaderboards, and hall of fame).</li>
              <li>Platform administrators and instructors for academic assessment purposes.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">6. Your Rights</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access, update, or correct your personal information via the Edit Profile page.</li>
              <li>Deactivate your account at any time from the Profile settings.</li>
              <li>Request deletion of your data by contacting the platform administrators.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">7. Changes to This Policy</h4>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. Continued use of the platform after changes constitutes acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">8. Contact Us</h4>
            <p>
              If you have any questions about this Privacy Policy, please reach out through the FAQs section or contact the InterStock development team at your institution.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage


