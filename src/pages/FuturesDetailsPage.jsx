import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const FuturesDetailsPage = () => {
  const navigate = useNavigate()

  const chartData = [
    { time: '9:00', price: 4500 },
    { time: '10:00', price: 4520 },
    { time: '11:00', price: 4510 },
    { time: '12:00', price: 4530 },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Futures Contract</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="text-3xl font-bold">$4,520.00</h3>
          <span className="text-stock-green font-semibold">+0.44%</span>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Price Chart</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#4846FF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Button className="w-full" onClick={() => navigate('/buy-futures')}>
          Buy Futures
        </Button>
      </div>
    </div>
  )
}

export default FuturesDetailsPage


