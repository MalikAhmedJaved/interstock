import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown } from 'lucide-react'

const PurchaseHistoryPage = () => {
  const navigate = useNavigate()

  const transactions = [
    { id: 1, symbol: 'AAPL', type: 'Buy', quantity: 10, price: 175.50, date: '2024-01-15' },
    { id: 2, symbol: 'GOOGL', type: 'Sell', quantity: 5, price: 142.30, date: '2024-01-14' },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Purchase History</h2>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {transaction.type === 'Buy' ? (
                  <TrendingUp className="text-stock-green" size={24} />
                ) : (
                  <TrendingDown className="text-stock-red" size={24} />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{transaction.symbol}</h3>
                  <p className="text-sm text-text-secondary-light">
                    {transaction.type} • {transaction.quantity} shares
                  </p>
                  <p className="text-xs text-text-secondary-light mt-1">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${transaction.price}</p>
                <p className="text-sm text-text-secondary-light">
                  ${(transaction.quantity * transaction.price).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchaseHistoryPage


