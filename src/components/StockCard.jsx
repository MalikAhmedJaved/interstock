import { TrendingUp, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StockCard = ({ stock }) => {
  const navigate = useNavigate()
  const { symbol, name, price, change, isPositive } = stock

  return (
    <div
      onClick={() => navigate('/stock-details', { state: { stock } })}
      className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-lg">{symbol}</h4>
          <p className="text-sm text-text-secondary-light">{name}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">${price}</p>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-stock-green' : 'text-stock-red'}`}>
            {isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockCard

