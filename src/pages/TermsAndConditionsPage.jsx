import { useNavigate } from 'react-router-dom'

const TermsAndConditionsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Terms & Conditions</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Terms and Conditions</h3>
          <p className="text-text-secondary-light text-sm mt-1">Last updated: March 2026</p>
        </div>

        <div className="space-y-5 text-text-secondary-light text-sm leading-relaxed">
          <p>
            Please read these Terms and Conditions ("Terms") carefully before using the InterStock application. By accessing or using InterStock, you agree to be bound by these Terms.
          </p>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">1. Acceptance of Terms</h4>
            <p>
              By creating an account or using InterStock, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">2. Platform Description</h4>
            <p>
              InterStock is an educational stock trading simulation platform developed as a Final Year Project (FYP). The platform allows students to practice trading stocks, futures, and options in a simulated environment. All trading activities are virtual — no real money, securities, or financial instruments are involved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">3. User Accounts</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You must not share your account with others or create multiple accounts.</li>
              <li>You must notify the administrators immediately if you suspect unauthorized access to your account.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">4. Permitted Use</h4>
            <p className="mb-2">You agree to use InterStock only for:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Learning about stock markets, trading concepts, and financial instruments.</li>
              <li>Completing quizzes, assignments, and educational activities.</li>
              <li>Engaging in constructive discussions through chat rooms and conversations.</li>
              <li>Practicing simulated trading strategies in a risk-free environment.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">5. Prohibited Conduct</h4>
            <p className="mb-2">You must not:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the platform for any illegal or unauthorized purpose.</li>
              <li>Attempt to gain unauthorized access to other users' accounts or platform systems.</li>
              <li>Post abusive, offensive, or inappropriate content in chat rooms or conversations.</li>
              <li>Manipulate or exploit platform features to gain unfair advantages in leaderboards or competitions.</li>
              <li>Copy, modify, or distribute platform content without permission.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">6. Simulated Trading Disclaimer</h4>
            <p>
              All trades on InterStock are simulated and for educational purposes only. Stock prices, market data, and portfolio values do not represent real-world financial data. InterStock does not provide financial advice, and nothing on this platform should be construed as a recommendation to buy or sell real securities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">7. Intellectual Property</h4>
            <p>
              All content, features, and functionality of InterStock — including design, code, text, graphics, and logos — are the intellectual property of the InterStock development team and are protected by applicable intellectual property laws. You may not reproduce or distribute any part of the platform without prior written consent.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">8. Account Termination</h4>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct that is harmful to other users or the platform. You may deactivate your own account at any time through the Profile settings.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">9. Limitation of Liability</h4>
            <p>
              InterStock is provided "as is" without warranties of any kind. The development team shall not be liable for any damages arising from the use of or inability to use the platform, including but not limited to data loss or service interruptions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">10. Changes to Terms</h4>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of InterStock after any changes indicates your acceptance of the new Terms.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary-dark text-base mb-2">11. Contact</h4>
            <p>
              For questions or concerns regarding these Terms, please reach out through the FAQs section or contact the InterStock development team at your institution.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage


