import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rocket, TrendingUp, UserCog, AlertTriangle, BookOpen, MessageSquare, Trophy, ChevronDown, ChevronUp } from 'lucide-react'

const HelpCenterPage = () => {
  const navigate = useNavigate()
  const [expandedTopic, setExpandedTopic] = useState(null)

  const helpTopics = [
    {
      title: 'Getting Started',
      icon: Rocket,
      items: [
        { q: 'How do I create an account?', a: 'Tap "Register" on the login screen, enter your name, email, and create a password. You will be directed to the onboarding screens to get familiar with the platform.' },
        { q: 'What is InterStock?', a: 'InterStock is an educational stock trading simulation platform. It allows you to practice buying and selling stocks, futures, and options using virtual money — no real funds are involved.' },
        { q: 'How do I navigate the app?', a: 'Use the bottom navigation bar to switch between Home, Learn, Trade, and Profile sections. The Home page shows your portfolio overview and quick access to key features.' },
        { q: 'Is real money involved?', a: 'No. All trading on InterStock is simulated. Your portfolio balance is virtual and used purely for educational purposes.' },
      ]
    },
    {
      title: 'Trading Guide',
      icon: TrendingUp,
      items: [
        { q: 'How do I buy or sell stocks?', a: 'Go to the Listing page, select a stock, and tap "Buy" or "Sell". Enter the number of shares and confirm your order. The trade will be reflected in your portfolio.' },
        { q: 'What are Futures?', a: 'Futures are contracts to buy or sell an asset at a predetermined price at a future date. On InterStock, you can practice placing futures orders to understand how they work.' },
        { q: 'What are Options?', a: 'Options give you the right (but not the obligation) to buy or sell an asset at a set price before a certain date. InterStock lets you explore call and put options in a risk-free environment.' },
        { q: 'How do I view my portfolio?', a: 'The Home page displays your portfolio overview including total value, gains/losses, and a performance chart. Tap on any holding to see detailed information.' },
        { q: 'What is the Watchlist?', a: 'The Watchlist lets you save stocks you are interested in for quick access. You can add stocks from the Listing page by tapping the bookmark icon.' },
      ]
    },
    {
      title: 'Quizzes & Assignments',
      icon: BookOpen,
      items: [
        { q: 'Where do I find quizzes?', a: 'Go to Learn → Quiz Home to see all available quizzes. Each quiz covers a different topic related to stock markets and trading concepts.' },
        { q: 'How are quizzes scored?', a: 'Each quiz consists of multiple-choice questions with a timer. Your score is based on correct answers. You can review your quiz history and past results.' },
        { q: 'How do I submit assignments?', a: 'Navigate to Learn → Assignments, select an assignment, and upload your file. Supported formats include PDF and document files.' },
        { q: 'Can I retake a quiz?', a: 'Yes, you can retake quizzes to improve your score. Your best attempt will be recorded on the leaderboard.' },
      ]
    },
    {
      title: 'Chat & Community',
      icon: MessageSquare,
      items: [
        { q: 'How do I start a conversation?', a: 'Go to Chat → Conversations and tap the new message button. Select a user to start a private conversation.' },
        { q: 'What are Chat Rooms?', a: 'Chat Rooms are group discussions where multiple users can communicate. You can browse and join available rooms from the Chat Rooms page.' },
        { q: 'Is there an AI assistant?', a: 'Yes! The AI Chatbot is available from the chat section. It can answer questions about trading concepts, help with platform navigation, and provide learning support.' },
        { q: 'How do I report inappropriate messages?', a: 'If you encounter inappropriate content, please contact the platform administrators through the FAQs section.' },
      ]
    },
    {
      title: 'Achievements & Rankings',
      icon: Trophy,
      items: [
        { q: 'How do I earn achievements?', a: 'Achievements are earned by completing milestones such as making your first trade, completing quizzes, or reaching portfolio targets. Check the Achievements page to see your progress.' },
        { q: 'How does the leaderboard work?', a: 'The leaderboard ranks all users based on their portfolio performance and quiz scores. Top performers are featured in the Hall of Fame.' },
        { q: 'What is the Hall of Fame?', a: 'The Hall of Fame showcases the top-performing students on the platform with a podium-style display. Aim for the top to get featured!' },
      ]
    },
    {
      title: 'Account & Settings',
      icon: UserCog,
      items: [
        { q: 'How do I edit my profile?', a: 'Go to Profile → Edit Profile. You can update your name, profile picture, and other account details.' },
        { q: 'How do I change my password?', a: 'Go to Profile → Change Password. Enter your current password and set a new one.' },
        { q: 'How do I deactivate my account?', a: 'Go to Profile and tap "Deactivate My Account" at the bottom. You can reactivate it later by logging in again.' },
        { q: 'I forgot my password. What do I do?', a: 'On the login screen, tap "Forgot Password" and enter your registered email. Follow the instructions to reset your password.' },
      ]
    },
    {
      title: 'Troubleshooting',
      icon: AlertTriangle,
      items: [
        { q: 'The app is loading slowly. What should I do?', a: 'Try refreshing the page or clearing your browser cache. Ensure you have a stable internet connection.' },
        { q: 'My trades are not showing up.', a: 'Trades may take a moment to reflect in your portfolio. If the issue persists, try logging out and back in.' },
        { q: 'I cannot log in to my account.', a: 'Double-check your email and password. If you\'ve forgotten your password, use the "Forgot Password" option on the login screen.' },
        { q: 'Notifications are not appearing.', a: 'Ensure notifications are enabled in your browser settings. You can also check the Notifications page from your Profile.' },
      ]
    },
  ]

  const toggleTopic = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Help Centre</h2>
      </div>

      <p className="text-text-secondary-light text-sm">
        Find answers to common questions about using InterStock. Tap on a topic to expand it.
      </p>

      <div className="space-y-3">
        {helpTopics.map((topic, index) => {
          const Icon = topic.icon
          const isExpanded = expandedTopic === index
          return (
            <div key={index} className="card overflow-hidden">
              <button
                onClick={() => toggleTopic(index)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="font-semibold text-sm">{topic.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-text-secondary-light" />
                ) : (
                  <ChevronDown size={18} className="text-text-secondary-light" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {topic.items.map((item, i) => (
                    <div key={i} className="border-t border-gray-100 dark:border-gray-700/50 pt-3">
                      <p className="font-medium text-sm text-text-primary-dark">{item.q}</p>
                      <p className="text-text-secondary-light text-sm mt-1 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HelpCenterPage


