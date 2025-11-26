import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import Button from '../components/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const StockDetailsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock stock data
  const stock = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.50,
    change: 2.5,
    changePercent: 1.45,
    isPositive: true,
    high: 176.20,
    low: 173.10,
    volume: '45.2M',
    marketCap: '2.8T',
  }

  const chartData = [
    { time: '9:00', price: 173.50 },
    { time: '10:00', price: 174.20 },
    { time: '11:00', price: 174.80 },
    { time: '12:00', price: 175.10 },
    { time: '1:00', price: 175.30 },
    { time: '2:00', price: 175.50 },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'chart', label: 'Chart' },
    { id: 'news', label: 'News' },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Stock Details</h2>
      </div>

      {/* Stock Header */}
      <div className="card p-6 space-y-4">
        <div>
          <h3 className="text-3xl font-bold">{stock.symbol}</h3>
          <p className="text-text-secondary-light">{stock.name}</p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-3xl font-bold">${stock.price}</p>
            <div className={`flex items-center gap-2 ${stock.isPositive ? 'text-stock-green' : 'text-stock-red'}`}>
              {stock.isPositive ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )}
              <span className="font-semibold">
                {stock.isPositive ? '+' : ''}{stock.change} ({stock.isPositive ? '+' : ''}{stock.changePercent}%)
              </span>
            </div>
          </div>
        </div>
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="card p-6 space-y-4">
          <h4 className="font-semibold text-lg">Stock Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-secondary-light">High</p>
              <p className="font-semibold">${stock.high}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary-light">Low</p>
              <p className="font-semibold">${stock.low}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary-light">Volume</p>
              <p className="font-semibold">{stock.volume}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary-light">Market Cap</p>
              <p className="font-semibold">{stock.marketCap}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="card p-6 space-y-4">
          <h4 className="font-semibold text-lg">Price Chart</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke={stock.isPositive ? '#45B369' : '#EF4770'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="card p-6 space-y-4">
          <h4 className="font-semibold text-lg">Latest News</h4>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h5 className="font-semibold mb-1">Apple Reports Strong Q4 Earnings</h5>
              <p className="text-sm text-text-secondary-light">Apple Inc. reported better-than-expected earnings...</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h5 className="font-semibold mb-1">New iPhone Launch Boosts Stock</h5>
              <p className="text-sm text-text-secondary-light">The latest iPhone release has generated strong demand...</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate('/buy-sell-stock?action=sell')}
        >
          Sell
        </Button>
        <Button
          className="flex-1"
          onClick={() => navigate('/buy-sell-stock?action=buy')}
        >
          Buy
        </Button>
      </div>
    </div>
  )
}

export default StockDetailsPage


