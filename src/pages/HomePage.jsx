import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import PortfolioOverview from '../components/PortfolioOverview'
import StockCard from '../components/StockCard'
import QuizHistory from '../components/QuizHistory'
import NotificationPanel from '../components/NotificationPanel'
import UtilityMenu from '../components/UtilityMenu'

const HomePage = () => {
  const navigate = useNavigate()

  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5, isPositive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: -1.2, isPositive: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 3.1, isPositive: true },
  ]

  return (
    <div className="px-6 py-6 space-y-6 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Hi, Ishmal Fatima 👋</h2>
          <p className="text-sm text-text-secondary-light">Welcome to InterStock!</p>
        </div>
        <div className="flex gap-3">
          <NotificationPanel />
          <UtilityMenu />
        </div>
      </div>

      {/* Portfolio Overview */}
      <PortfolioOverview />

      {/* Buy/Sell Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1" onClick={() => navigate('/buy-sell-stock')}>
          Buy
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => navigate('/buy-sell-stock')}>
          Sell
        </Button>
      </div>

      {/* Trending Stocks */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Trending Stocks</h3>
        <div className="space-y-2">
          {trendingStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Community */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Community</h3>
          <button
            onClick={() => navigate('/community-posts')}
            className="text-primary text-sm font-medium hover:underline"
          >
            See All
          </button>
        </div>
        <div className="card p-4">
          <p className="text-text-secondary-light">Recent community posts...</p>
        </div>
      </div>

      {/* Popular Schools */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Popular Schools</h3>
          <button
            onClick={() => navigate('/school-page')}
            className="text-primary text-sm font-medium hover:underline"
          >
            See All
          </button>
        </div>
        <div className="card p-4">
          <p className="text-text-secondary-light">Top schools...</p>
        </div>
      </div>

      {/* Quiz History */}
      <QuizHistory />
    </div>
  )
}

export default HomePage

