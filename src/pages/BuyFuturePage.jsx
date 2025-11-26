import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const BuyFuturePage = () => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState('')
  const [price] = useState('4520.00')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/order-confirmed-page')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Buy Futures</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Contract
            </label>
            <input
              type="text"
              value="S&P 500 Futures"
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
            />
          </div>

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />

          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Price
            </label>
            <input
              type="text"
              value={`$${price}`}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between">
              <span className="text-text-secondary-light">Total</span>
              <span className="font-semibold">
                ${quantity ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Buy Futures
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BuyFuturePage


