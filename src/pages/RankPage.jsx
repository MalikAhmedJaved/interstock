import { useState } from 'react'
import { Trophy, Medal, Award } from 'lucide-react'

const RankPage = () => {
  const [activeTab, setActiveTab] = useState('global')

  const tabs = ['Global', 'Class 1', 'Class 2']

  const participants = [
    { rank: 1, name: 'Jawad', rating: 95, isYou: false },
    { rank: 2, name: 'Maha', rating: 92, isYou: false },
    { rank: 3, name: 'You', rating: 88, isYou: true },
    { rank: 4, name: 'Ayesha', rating: 85, isYou: false },
    { rank: 5, name: 'Badar', rating: 82, isYou: false },
  ]

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={32} />
    if (rank === 2) return <Medal className="text-gray-400" size={32} />
    if (rank === 3) return <Award className="text-amber-600" size={32} />
    return <span className="text-lg font-bold text-text-secondary-light">#{rank}</span>
  }

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <h2 className="text-2xl font-bold font-orbitron">Rank</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.toLowerCase().replace(' ', '')
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary-light hover:text-text-primary-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
            {getRankIcon(2)}
          </div>
          <div className="bg-gray-100 rounded-t-xl p-4 w-20 text-center">
            <p className="font-semibold">Maha</p>
            <p className="text-sm text-text-secondary-light">92</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 mb-2 flex items-center justify-center border-2 border-primary">
            {getRankIcon(1)}
          </div>
          <div className="bg-primary rounded-t-xl p-4 w-24 text-center text-white">
            <p className="font-semibold">Jawad</p>
            <p className="text-sm">95</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
            {getRankIcon(3)}
          </div>
          <div className="bg-gray-100 rounded-t-xl p-4 w-20 text-center">
            <p className="font-semibold">Ayesha</p>
            <p className="text-sm text-text-secondary-light">85</p>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.rank}
            className={`card p-4 flex items-center justify-between ${
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

