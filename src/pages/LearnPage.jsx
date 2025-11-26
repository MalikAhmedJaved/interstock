import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import StockCard from '../components/StockCard'

const LearnPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('stocks')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'stocks', label: 'Stocks' },
    { id: 'futures', label: 'Futures' },
    { id: 'options', label: 'Options' },
  ]

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5, isPositive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: -1.2, isPositive: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 3.1, isPositive: true },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -0.8, isPositive: false },
  ]

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      <h2 className="text-2xl font-bold font-orbitron">Learn Trading</h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={20} />
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary-light hover:text-text-primary-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stock List */}
      <div className="space-y-3">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  )
}

export default LearnPage

