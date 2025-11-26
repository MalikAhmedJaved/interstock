import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const BuySellStockPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action') || 'buy' // 'buy' or 'sell'
  
  const [formData, setFormData] = useState({
    symbol: 'AAPL',
    quantity: '',
    price: '175.50',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process buy/sell order
    navigate('/order-confirmed-page')
  }

  const total = formData.quantity ? (parseFloat(formData.quantity) * parseFloat(formData.price)).toFixed(2) : '0.00'

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">
          {action === 'buy' ? 'Buy Stock' : 'Sell Stock'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Stock Symbol
            </label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter number of shares"
            required
            min="1"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Price per Share
            </label>
            <input
              type="text"
              name="price"
              value={`$${formData.price}`}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary-light">Total Amount</span>
              <span className="text-2xl font-bold text-primary">${total}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              style={{
                backgroundColor: action === 'buy' ? '#45B369' : '#EF4770'
              }}
            >
              {action === 'buy' ? 'Buy Stock' : 'Sell Stock'}
            </Button>
          </div>
        </div>
      </form>

      <div className="card p-4 bg-blue-50 border border-blue-200">
        <p className="text-sm text-text-secondary-dark">
          <strong>Note:</strong> This is a simulated trading environment. No real money will be used.
        </p>
      </div>
    </div>
  )
}

export default BuySellStockPage


