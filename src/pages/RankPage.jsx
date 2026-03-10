import { useState } from 'react'
import { Trophy, Medal, Award, Info } from 'lucide-react'

/**
 * Competition Criteria
 * 
 * Basis of competition:
 * - Portfolio Performance: Overall return percentage on simulated investments
 * - Quiz Scores: Average score across all attempted quizzes
 * - Assignment Completion: Percentage of assignments submitted on time
 * - Community Participation: Activity level in chat rooms and discussions
 * 
 * Rating Calculation (out of 100):
 * - Portfolio Return: 40% weight (highest portfolio gain gets max points)
 * - Quiz Average: 30% weight (average score across all quizzes)
 * - Assignment Score: 20% weight (on-time completion rate)
 * - Participation: 10% weight (chat activity and engagement)
 * 
 * Winner Determination:
 * - Rankings are calculated at the end of each batch/semester
 * - Students are ranked by their composite rating score
 * - Top 3 performers are featured on the Hall of Fame
 * - Ties are broken by portfolio return percentage
 * - Rankings update weekly based on the latest data
 */

const RankPage = () => {
  const [activeTab, setActiveTab] = useState('fa22')
  const [showCriteria, setShowCriteria] = useState(false)

  const tabs = ['FA22']

  // Participants sorted by highest rating first
  const participants = [
    { rank: 1, name: 'Jawad', rating: 95, portfolioReturn: 42, quizAvg: 92, assignmentScore: 100, isYou: false },
    { rank: 2, name: 'Maha', rating: 92, portfolioReturn: 38, quizAvg: 88, assignmentScore: 95, isYou: false },
    { rank: 3, name: 'You', rating: 88, portfolioReturn: 35, quizAvg: 85, assignmentScore: 90, isYou: true },
    { rank: 4, name: 'Ayesha', rating: 85, portfolioReturn: 30, quizAvg: 82, assignmentScore: 88, isYou: false },
    { rank: 5, name: 'Badar', rating: 82, portfolioReturn: 28, quizAvg: 80, assignmentScore: 85, isYou: false },
  ]

  // Get top 3 for podium (sorted by rating)
  const topThree = participants.slice(0, 3)

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={32} />
    if (rank === 2) return <Medal className="text-gray-400" size={32} />
    if (rank === 3) return <Award className="text-amber-600" size={32} />
    return <span className="text-lg font-bold text-text-secondary-light">#{rank}</span>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-orbitron">Rank</h2>

      {/* Competition Criteria Info Button */}
      <button
        onClick={() => setShowCriteria(!showCriteria)}
        className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
      >
        <Info size={16} />
        {showCriteria ? 'Hide Competition Criteria' : 'View Competition Criteria'}
      </button>

      {/* Criteria Panel */}
      {showCriteria && (
        <div className="card p-4 sm:p-6 space-y-3 bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-lg">How Rankings Are Calculated</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">40%</span>
              <div>
                <p className="font-medium">Portfolio Return</p>
                <p className="text-text-secondary-light">Overall return on simulated investments</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">30%</span>
              <div>
                <p className="font-medium">Quiz Scores</p>
                <p className="text-text-secondary-light">Average score across all attempted quizzes</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">20%</span>
              <div>
                <p className="font-medium">Assignment Completion</p>
                <p className="text-text-secondary-light">On-time submission rate</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">10%</span>
              <div>
                <p className="font-medium">Participation</p>
                <p className="text-text-secondary-light">Chat activity and engagement level</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-secondary-light">Winners are determined at the end of each semester. Top 3 performers are featured in the Hall of Fame. Ties are broken by portfolio return.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.toLowerCase().replace(' ', '') || activeTab === 'fa22'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary-light hover:text-text-primary-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-2 sm:gap-4 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
            {getRankIcon(2)}
          </div>
          <div className="bg-gray-100 rounded-t-xl p-2 sm:p-4 w-16 sm:w-20 text-center">
            <p className="font-semibold text-xs sm:text-base">{topThree[1]?.name || 'Maha'}</p>
            <p className="text-xs sm:text-sm text-text-secondary-light">{topThree[1]?.rating || 92}</p>
          </div>
        </div>
        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 mb-2 flex items-center justify-center border-2 border-primary">
            {getRankIcon(1)}
          </div>
          <div className="bg-primary rounded-t-xl p-3 sm:p-4 w-20 sm:w-24 text-center text-white">
            <p className="font-semibold text-xs sm:text-base">{topThree[0]?.name || 'Jawad'}</p>
            <p className="text-xs sm:text-sm">{topThree[0]?.rating || 95}</p>
          </div>
        </div>
        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
            {getRankIcon(3)}
          </div>
          <div className="bg-gray-100 rounded-t-xl p-2 sm:p-4 w-16 sm:w-20 text-center">
            <p className="font-semibold text-xs sm:text-base">{topThree[2]?.name || 'You'}</p>
            <p className="text-xs sm:text-sm text-text-secondary-light">{topThree[2]?.rating || 88}</p>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="space-y-2 lg:space-y-3 max-w-4xl lg:mx-auto">
        {participants.map((participant) => (
          <div
            key={participant.rank}
            className={`card p-4 sm:p-5 flex items-center justify-between ${
              participant.isYou ? 'border-2 border-primary/30' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                {getRankIcon(participant.rank)}
              </div>
              <div>
                <p className="font-semibold">
                  {participant.name}
                  {participant.isYou && (
                    <span className="text-primary ml-2">(You)</span>
                  )}
                </p>
                <p className="text-sm text-stock-red">Rating {participant.rating}</p>
                <div className="flex gap-3 mt-1 text-xs text-text-secondary-light">
                  <span>Return: {participant.portfolioReturn}%</span>
                  <span>Quiz: {participant.quizAvg}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">#{participant.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankPage

