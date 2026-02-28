import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpCircle,
  ChevronDown,
  ChevronRight,
  X,
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

// Stock data lookup
const stockDataLookup = {
  AFRM: {
    symbol: 'AFRM', name: 'Affirm Holdings, Inc.', price: 18.20, change: 11.78, isPositive: true,
    previousClose: '17.32', open: '16.80', bid: '16.61 x 1000', ask: '16.85 x 1100',
    daysRange: '15.56 - 16.90', volume: '5,654,321',
  },
  AAPL: {
    symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5, isPositive: true,
    previousClose: '173.00', open: '174.10', bid: '175.30 x 800', ask: '175.70 x 600',
    daysRange: '173.10 - 176.20', volume: '45,200,000',
  },
  AMD: {
    symbol: 'AMD', name: 'Advanced Micro Devices', price: 72.21, change: 5.79, isPositive: false,
    previousClose: '76.65', open: '75.50', bid: '72.10 x 1200', ask: '72.30 x 900',
    daysRange: '71.80 - 75.50', volume: '32,100,000',
  },
  ABNB: {
    symbol: 'ABNB', name: 'Airbnb, Inc.', price: 107.81, change: 1.59, isPositive: true,
    previousClose: '106.12', open: '106.50', bid: '107.70 x 500', ask: '107.90 x 700',
    daysRange: '106.00 - 108.20', volume: '12,500,000',
  },
  AMZN: {
    symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 100.78, change: 4.40, isPositive: true,
    previousClose: '96.53', open: '97.20', bid: '100.60 x 1100', ask: '100.90 x 800',
    daysRange: '97.00 - 101.20', volume: '28,900,000',
  },
}

// Chart data
const generateChartData = () => [
  { time: '08:00', price: 17.10 }, { time: '08:30', price: 17.05 },
  { time: '09:00', price: 17.20 }, { time: '09:30', price: 17.35 },
  { time: '10:00', price: 17.40 }, { time: '10:30', price: 17.25 },
  { time: '11:00', price: 17.56 }, { time: '11:30', price: 17.30 },
  { time: '12:00', price: 17.15 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white rounded-md px-3 py-2 shadow-lg">
        <p className="text-base sm:text-lg font-medium">${payload[0].value}</p>
        <p className="text-stock-green text-xs sm:text-sm">+3.45% (+0.05%)</p>
      </div>
    )
  }
  return null
}

const StockDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePeriod, setActivePeriod] = useState('24H')
  const [actionsOpen, setActionsOpen] = useState(false)
  const [orderTypeOpen, setOrderTypeOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('Buy')
  const [selectedOrderType, setSelectedOrderType] = useState('Market')

  const stockFromState = location.state?.stock
  const stockSymbol = stockFromState?.symbol || 'AFRM'

  const stock = stockDataLookup[stockSymbol] || {
    symbol: stockSymbol, name: stockFromState?.name || 'Unknown',
    price: stockFromState?.price || 0, change: stockFromState?.change || 0,
    isPositive: stockFromState?.isPositive ?? true,
    previousClose: (stockFromState?.price * 0.98)?.toFixed(2) || '0.00',
    open: (stockFromState?.price * 0.99)?.toFixed(2) || '0.00',
    bid: `${(stockFromState?.price * 0.995)?.toFixed(2) || '0.00'} x 1000`,
    ask: `${(stockFromState?.price * 1.005)?.toFixed(2) || '0.00'} x 1100`,
    daysRange: `${(stockFromState?.price * 0.97)?.toFixed(2) || '0.00'} - ${(stockFromState?.price * 1.01)?.toFixed(2) || '0.00'}`,
    volume: '5,654,321',
  }

  const chartData = generateChartData()

  const overviewItems = [
    { label: 'Previous Close', value: stock.previousClose },
    { label: 'Open', value: stock.open },
    { label: 'Bid', value: stock.bid },
    { label: 'Ask', value: stock.ask },
    { label: "Day's Ranges", value: stock.daysRange },
    { label: 'Volume', value: stock.volume },
  ]

  return (
    <DesktopLayout activePath="/learn">
      {/* Back button */}
      <div className="mb-4 sm:mb-6">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
      </div>

      {/* Stock Info Header */}
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <StockLogo symbol={stock.symbol} size="md" />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{stock.symbol}</h2>
            <p className="text-gray-500 text-base sm:text-lg">{stock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl sm:text-2xl text-gray-900">${stock.price}</p>
          <div className="flex items-center gap-1.5 justify-end">
            <ArrowUpCircle size={18} className="text-stock-green sm:w-5 sm:h-5" fill="#45B369" stroke="white" />
            <span className="text-stock-green text-base sm:text-lg">{stock.change}%</span>
          </div>
        </div>
      </div>

      {/* Time Period Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-1 flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {timePeriods.map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`flex-1 py-2.5 sm:py-3 text-center text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all min-w-[48px] ${
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
      <div className="bg-white rounded-2xl sm:rounded-[30px] p-4 sm:p-8 mb-6 sm:mb-10 overflow-hidden">
        <ResponsiveContainer width="100%" height={250} className="sm:!h-[350px]">
          <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => v.toFixed(2)} />
            <ReferenceLine y={17.2} stroke="#E5E7EB" strokeDasharray="4 4" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="price" stroke="#45B369" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#45B369', stroke: 'white', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
        <button
          onClick={() => { setActionsOpen(true); setOrderTypeOpen(false) }}
          className="bg-primary text-white rounded-xl sm:rounded-[22px] px-6 sm:px-10 py-3 sm:py-4 flex items-center gap-3 sm:gap-5 text-lg sm:text-2xl font-normal hover:bg-primary-variant transition-colors w-full sm:w-auto sm:min-w-[300px] justify-center"
        >
          {selectedAction}
          <ChevronDown size={18} className="sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => { setOrderTypeOpen(true); setActionsOpen(false) }}
          className="bg-white border border-[#c9cbce] text-black rounded-xl sm:rounded-[22px] px-6 sm:px-10 py-3 sm:py-4 flex items-center gap-3 sm:gap-5 text-lg sm:text-2xl font-normal hover:bg-gray-50 transition-colors w-full sm:w-auto sm:min-w-[300px] justify-center"
        >
          {selectedOrderType}
          <ChevronDown size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Select Action Modal */}
      {actionsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={() => setActionsOpen(false)}>
          <div className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-t-[50px] pb-6 sm:pb-10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 sm:gap-[30px] items-start px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col gap-3 sm:gap-[18px] items-center w-full">
                <div className="w-10 h-2 bg-gray-200 rounded-full" />
                <div className="flex items-center justify-between w-full px-1">
                  <h3 className="text-xl sm:text-[28px] font-normal text-gray-900 tracking-[0.2px]">Select Action</h3>
                  <button onClick={() => setActionsOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <X size={24} className="text-gray-900" />
                  </button>
                </div>
                <hr className="w-full border-gray-200" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-[30px] w-full">
                {[
                  { label: 'Buy Stocks', buttonLabel: 'Buy' },
                  { label: 'Sell Stocks', buttonLabel: 'Sell' },
                  { label: 'Short', buttonLabel: 'Short' },
                  { label: 'Buy to Cover', buttonLabel: 'Buy to Cover' },
                ].map((item) => (
                  <button key={item.buttonLabel} onClick={() => { setSelectedAction(item.buttonLabel); setActionsOpen(false) }}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-gray-100 transition-colors w-full">
                    <span className="text-base sm:text-xl text-gray-900 tracking-[0.2px]">{item.label}</span>
                    <ChevronRight size={24} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Type Modal */}
      {orderTypeOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={() => setOrderTypeOpen(false)}>
          <div className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-t-[50px] pb-6 sm:pb-10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 sm:gap-[30px] items-start px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col gap-3 sm:gap-[10px] items-center justify-center w-full">
                <div className="flex items-center justify-between w-full px-1 py-2 sm:py-[10px]">
                  <h3 className="text-xl sm:text-[28px] font-normal text-gray-900 tracking-[0.2px]">Order Type</h3>
                  <button onClick={() => setOrderTypeOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <X size={24} className="text-gray-900" />
                  </button>
                </div>
                <hr className="w-full border-gray-200" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-[30px] w-full">
                {[
                  { label: 'Limit', value: 'limit' },
                  { label: 'Market', value: 'market' },
                  { label: 'Stop Limit', value: 'stop-limit' },
                  { label: 'Trailing Stop', value: 'trailing-stop' },
                ].map((item) => (
                  <button key={item.value} onClick={() => { setSelectedOrderType(item.label); setOrderTypeOpen(false) }}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-gray-100 transition-colors w-full">
                    <span className="text-base sm:text-xl text-gray-900 tracking-[0.2px]">{item.label}</span>
                    <ChevronRight size={24} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Section */}
      <div className="mb-6 sm:mb-10">
        <div className="border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Overview</h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          {overviewItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-between py-2.5 sm:py-3 ${
                index < overviewItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-gray-500 text-sm sm:text-lg">{item.label}</span>
              <span className="text-gray-900 text-sm sm:text-lg">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mb-6 sm:mb-10">
        <button
          onClick={() => {
            const actionMap = { 'Buy': 'buy', 'Sell': 'sell', 'Short': 'short', 'Buy to Cover': 'cover' }
            const action = actionMap[selectedAction] || 'buy'
            navigate(`/buy-sell-stock?action=${action}&orderType=${selectedOrderType.toLowerCase().replace(' ', '-')}`, {
              state: { stock: { symbol: stock.symbol, name: stock.name, price: stock.price } },
            })
          }}
          className="bg-[#047D95] text-white font-bold text-lg sm:text-xl rounded-full px-10 sm:px-16 py-2.5 sm:py-2 transition-colors hover:opacity-90 w-full sm:w-auto"
        >
          Continue
        </button>
      </div>
    </DesktopLayout>
  )
}

export default StockDetailsPage
