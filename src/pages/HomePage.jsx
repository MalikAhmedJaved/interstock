import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import PortfolioOverview from '../components/PortfolioOverview'
import StockCard from '../components/StockCard'
import QuizHistory from '../components/QuizHistory'
import NotificationPanel from '../components/NotificationPanel'
import UtilityMenu from '../components/UtilityMenu'

const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const userName = user?.name || 'User'

  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5, isPositive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: -1.2, isPositive: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 3.1, isPositive: true },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 pb-20 sm:pb-24 lg:pb-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg lg:text-2xl font-semibold">Hi, {userName} </h2>
          <p className="text-xs sm:text-sm lg:text-base text-text-secondary-light">Welcome to InterStock!</p>
        </div>
        <div className="flex gap-2 sm:gap-3 lg:hidden">
          <NotificationPanel />
          <UtilityMenu />
        </div>
      </div>

      {/* Desktop two-column layout */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Left column - Portfolio + Buttons */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Portfolio Overview */}
          <PortfolioOverview />

          {/* Buy/Sell Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <Button className="flex-1" onClick={() => navigate('/buy-sell-stock?action=buy')}>
              Buy
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => navigate('/buy-sell-stock?action=sell')}>
              Sell
            </Button>
          </div>
        </div>

        {/* Right column - Quiz History (moves below on mobile) */}
        <div className="mt-4 sm:mt-6 lg:mt-0">
          <QuizHistory />
        </div>
      </div>

      {/* Trending Stocks */}
      <div>
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">Trending Stocks</h3>
        <div className="space-y-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 sm:space-y-0">
          {trendingStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

