import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'

const PlaceBidPage = () => {
  const navigate = useNavigate()
  const [bidAmount, setBidAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Place bid
    alert('Bid placed successfully')
    navigate('/learn')
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Place Bid</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary-dark mb-2">
              Option
            </label>
            <input
              type="text"
              value="AAPL Call Option"
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
            />
          </div>

          <TextField
            label="Bid Amount"
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter bid amount"
            required
          />

          <Button type="submit" className="w-full">
            Place Bid
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PlaceBidPage


