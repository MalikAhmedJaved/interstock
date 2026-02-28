import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PortfolioChart = () => {
  const data = [
    { name: 'M', value: 2500 },
    { name: 'T', value: 2200 },
    { name: 'W', value: 2800 },
    { name: 'T', value: 1800 },
    { name: 'F', value: 2600 },
    { name: 'S', value: 2100 },
    { name: 'S', value: 2400 },
  ]

  return (
    <div className="card p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">$18,908.00</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-stock-green font-semibold text-sm sm:text-base">+4.78%</span>
          <span className="text-text-secondary-light text-xs sm:text-sm">+0.20% vs Last week</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200} className="sm:!h-[260px] lg:!h-[300px]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4846FF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-text-secondary-light">Current Price</p>
          <p className="text-base sm:text-lg font-semibold">$17.56</p>
        </div>
        <div className="text-right">
          <p className="text-xs sm:text-sm text-text-secondary-light">Change</p>
          <p className="text-base sm:text-lg font-semibold text-stock-green">+3.45%</p>
        </div>
      </div>
    </div>
  )
}

export default PortfolioChart

