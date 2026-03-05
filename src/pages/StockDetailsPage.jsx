import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronDown,
  ChevronRight,
  X,
  Loader2,
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
import { API_ENDPOINTS } from '../config/api'

// Time period tabs → mapped to Yahoo Finance ranges + intervals
const timePeriods = [
  { label: '24H', range: '1d', interval: '5m' },
  { label: '7D', range: '5d', interval: '15m' },
  { label: '1M', range: '1mo', interval: '1d' },
  { label: '3M', range: '3mo', interval: '1d' },
  { label: '1Y', range: '1y', interval: '1wk' },
  { label: 'ALL', range: 'max', interval: '1mo' },
]

// Fallback stock data lookup (used if API fails)
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value
    return (
      <div className="bg-black text-white rounded-md px-3 py-2 shadow-lg">
        <p className="text-base sm:text-lg font-medium">${val.toFixed(2)}</p>
      </div>
    )
  }
  return null
}

// Format large numbers
function formatVolume(vol) {
  if (!vol) return '0'
  if (vol >= 1_000_000) return (vol / 1_000_000).toFixed(1) + 'M'
  if (vol >= 1_000) return (vol / 1_000).toFixed(0) + 'K'
  return vol.toLocaleString()
}

// Format chart time labels
function formatTimeLabel(dateStr, range) {
  const d = new Date(dateStr)
  if (range === '1d' || range === '5d') {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  if (range === '1mo' || range === '3mo') {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }
  return d.toLocaleDateString([], { month: 'short', year: '2-digit' })
}

const StockDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePeriod, setActivePeriod] = useState(timePeriods[0])
  const [actionsOpen, setActionsOpen] = useState(false)
  const [orderTypeOpen, setOrderTypeOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('Buy')
  const [selectedOrderType, setSelectedOrderType] = useState('Market')

  const stockFromState = location.state?.stock
  const stockSymbol = stockFromState?.symbol || 'AAPL'

  // ─── Live data state ───
  const [stock, setStock] = useState(() => {
    const fallback = stockDataLookup[stockSymbol]
    if (fallback) return fallback
    return {
      symbol: stockSymbol, name: stockFromState?.name || 'Loading...',
      price: stockFromState?.price || 0, change: stockFromState?.change || 0,
      isPositive: stockFromState?.isPositive ?? true,
      previousClose: '—', open: '—', bid: '—', ask: '—', daysRange: '—', volume: '—',
    }
  })
  const [chartData, setChartData] = useState([])
  const [chartLoading, setChartLoading] = useState(true)
  const [quoteLoading, setQuoteLoading] = useState(true)

  // Fetch live quote
  useEffect(() => {
    const fetchQuote = async () => {
      setQuoteLoading(true)
      try {
        const res = await fetch(API_ENDPOINTS.STOCKS.QUOTE(stockSymbol))
        if (res.ok) {
          const data = await res.json()
          setStock({
            symbol: data.symbol,
            name: data.name,
            price: data.price,
            change: Math.abs(data.change),
            isPositive: data.isPositive,
            previousClose: data.previousClose?.toFixed(2) || '—',
            open: data.open?.toFixed(2) || '—',
            bid: data.bid ? `${data.bid.toFixed(2)} x ${data.bidSize || '—'}` : '—',
            ask: data.ask ? `${data.ask.toFixed(2)} x ${data.askSize || '—'}` : '—',
            daysRange: data.dayLow && data.dayHigh ? `${data.dayLow.toFixed(2)} - ${data.dayHigh.toFixed(2)}` : '—',
            volume: formatVolume(data.volume),
          })
        }
      } catch (err) {
        console.error('Failed to fetch quote:', err)
      } finally {
        setQuoteLoading(false)
      }
    }
    fetchQuote()
  }, [stockSymbol])

  // Fetch chart data when period changes
  useEffect(() => {
    const fetchChart = async () => {
      setChartLoading(true)
      try {
        const url = `${API_ENDPOINTS.STOCKS.HISTORY(stockSymbol)}?range=${activePeriod.range}&interval=${activePeriod.interval}`
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          const formatted = (data.quotes || []).map(q => ({
            time: formatTimeLabel(q.time, activePeriod.range),
            price: q.price,
          }))
          setChartData(formatted)
        }
      } catch (err) {
        console.error('Failed to fetch chart:', err)
      } finally {
        setChartLoading(false)
      }
    }
    fetchChart()
  }, [stockSymbol, activePeriod])

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
          {quoteLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-gray-400 ml-auto" />
          ) : (
            <>
              <p className="text-xl sm:text-2xl text-gray-900">${typeof stock.price === 'number' ? stock.price.toFixed(2) : stock.price}</p>
              <div className="flex items-center gap-1.5 justify-end">
                {stock.isPositive ? (
                  <ArrowUpCircle size={18} className="text-stock-green sm:w-5 sm:h-5" fill="#45B369" stroke="white" />
                ) : (
                  <ArrowDownCircle size={18} className="text-stock-red sm:w-5 sm:h-5" fill="#EF4770" stroke="white" />
                )}
                <span className={`text-base sm:text-lg ${stock.isPositive ? 'text-stock-green' : 'text-stock-red'}`}>
                  {stock.change}%
                </span>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">LIVE</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Time Period Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-1 flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {timePeriods.map((period) => (
          <button
            key={period.label}
            onClick={() => setActivePeriod(period)}
            className={`flex-1 py-2.5 sm:py-3 text-center text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all min-w-[48px] ${
              activePeriod.label === period.label
                ? 'bg-gray-50 text-black font-medium shadow-sm'
                : 'text-gray-400'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl sm:rounded-[30px] p-4 sm:p-8 mb-6 sm:mb-10 overflow-hidden">
        {chartLoading ? (
          <div className="flex items-center justify-center h-[250px] sm:h-[350px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250} className="sm:!h-[350px]">
            <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => v.toFixed(2)} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke={stock.isPositive ? '#45B369' : '#EF4770'} strokeWidth={2} dot={false} activeDot={{ r: 5, fill: stock.isPositive ? '#45B369' : '#EF4770', stroke: 'white', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] sm:h-[350px] text-gray-400">
            No chart data available
          </div>
        )}
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
