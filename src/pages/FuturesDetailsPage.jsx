import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpCircle,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import StockLogo from '../components/StockLogo'
import DesktopLayout from '../components/DesktopLayout'

// Time period tabs
const timePeriods = ['24H', '7D', '1M', '3M', '1Y', 'ALL']

// Futures contract data lookup
const futuresDataLookup = {
  ES: {
    symbol: 'ES',
    name: 'E-mini S&P 500',
    price: 18.20,
    change: 11.78,
    isPositive: true,
    marginRequired: '$13,200',
    trend: 'Bearish',
    trendColor: 'text-[#FF6464]',
    volatility: 'Moderate',
    support: '$4227.27',
    resistance: '$4228.28',
  },
  NQ: {
    symbol: 'NQ',
    name: 'E-mini S&P 500',
    price: 14567.75,
    change: 23.5,
    isPositive: false,
    marginRequired: '$13,200',
    trend: 'Bearish',
    trendColor: 'text-[#FF6464]',
    volatility: 'Moderate',
    support: '$14520.00',
    resistance: '$14610.50',
  },
}

// Chart data
const generateChartData = () => [
  { time: '08:00', price: 17.10 },
  { time: '08:30', price: 17.05 },
  { time: '09:00', price: 17.20 },
  { time: '09:30', price: 17.35 },
  { time: '10:00', price: 17.40 },
  { time: '10:30', price: 17.25 },
  { time: '11:00', price: 17.56 },
  { time: '11:30', price: 17.30 },
  { time: '12:00', price: 17.15 },
]

// Custom tooltip for chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white rounded-md px-3 py-2 shadow-lg">
        <p className="text-lg font-medium">${payload[0].value}</p>
        <p className="text-stock-green text-sm">+3.45% (+0.05%)</p>
      </div>
    )
  }
  return null
}

const FuturesDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePeriod, setActivePeriod] = useState('24H')

  // Get contract from location state or use default
  const contractFromState = location.state?.contract
  const contractSymbol = contractFromState?.symbol || 'ES'

  const contract = futuresDataLookup[contractSymbol] || {
    symbol: contractSymbol,
    name: contractFromState?.name || 'Unknown',
    price: contractFromState?.price || 0,
    change: contractFromState?.change || 0,
    isPositive: contractFromState?.isPositive ?? true,
    marginRequired: contractFromState?.margin || '$13,200',
    trend: 'Bearish',
    trendColor: 'text-[#FF6464]',
    volatility: 'Moderate',
    support: '$0.00',
    resistance: '$0.00',
  }

  const chartData = generateChartData()

  const quickAnalysisItems = [
    { label: 'Trend', value: contract.trend, colorClass: contract.trendColor },
    { label: 'Volatility', value: contract.volatility, colorClass: 'text-gray-900' },
    { label: 'Support', value: contract.support, colorClass: 'text-gray-900' },
    { label: 'Resistance', value: contract.resistance, colorClass: 'text-gray-900' },
  ]

  return (
    <DesktopLayout activePath="/learn">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto flex-1">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Contract Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <StockLogo symbol="ABNB" size="md" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{contract.symbol}</h2>
              <p className="text-gray-500 text-base sm:text-lg">{contract.name}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xl sm:text-2xl text-gray-900">${contract.price}</p>
            <div className="flex items-center gap-1.5 sm:justify-end">
              <ArrowUpCircle size={20} className="text-stock-green" fill="#45B369" stroke="white" />
              <span className="text-stock-green text-base sm:text-lg">{contract.change}%</span>
            </div>
          </div>
        </div>

        {/* Margin Required */}
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
          <span className="font-medium">Margin Required: </span>
          <span className="text-gray-700">{contract.marginRequired}</span>
        </p>

        {/* Time Period Tabs */}
        <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-1 flex items-center mb-6 sm:mb-8 overflow-x-auto">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`flex-1 min-w-[48px] py-2.5 sm:py-3 text-center text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all ${
                activePeriod === period
                  ? 'bg-gray-50 text-black font-medium shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl sm:rounded-[30px] p-4 sm:p-8 mb-8 sm:mb-10 overflow-hidden">
          <ResponsiveContainer width="100%" height={250} className="sm:!h-[350px]">
            <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
              <XAxis
                dataKey="time"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(v) => v.toFixed(2)}
              />
              <ReferenceLine y={17.2} stroke="#E5E7EB" strokeDasharray="4 4" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#45B369"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: '#45B369', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-8 sm:mb-10">
          <button
            onClick={() => navigate('/futures-order?action=buy', { state: { contract: { symbol: contract.symbol, name: contract.name, price: contract.price } } })}
            className="w-full sm:w-auto sm:flex-1 sm:max-w-[360px] bg-[#00AD65] text-white text-lg sm:text-2xl font-medium py-4 sm:py-5 rounded-2xl sm:rounded-[22px] hover:opacity-90 transition-opacity text-center"
          >
            Buy Long
          </button>
          <button
            onClick={() => navigate('/futures-order?action=sell', { state: { contract: { symbol: contract.symbol, name: contract.name, price: contract.price } } })}
            className="w-full sm:w-auto sm:flex-1 sm:max-w-[360px] bg-[#FF6464] text-white text-lg sm:text-2xl font-medium py-4 sm:py-5 rounded-2xl sm:rounded-[22px] hover:opacity-90 transition-opacity text-center"
          >
            Sell Short
          </button>
        </div>

        {/* Quick Analysis Section */}
        <div className="mb-8 sm:mb-10">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Quick Analysis</h3>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
            {quickAnalysisItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2.5 sm:py-3 border-b border-gray-100"
              >
                <span className="text-gray-500 text-base sm:text-lg">{item.label}</span>
                <span className={`text-base sm:text-lg ${item.colorClass}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopLayout>
  )
}

export default FuturesDetailsPage
