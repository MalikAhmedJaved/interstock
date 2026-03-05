import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Eye,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  Download,
  Upload,
  X,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import StockLogo from '../components/StockLogo'
import OptionsTradeModal from '../components/OptionsTradeModal'
import DesktopLayout from '../components/DesktopLayout'
import { API_ENDPOINTS } from '../config/api'

// Fallback trending stocks (used while loading)
const fallbackTrendingStocks = [
  { symbol: 'AMD', price: 72.21, change: 5.79, isPositive: false },
  { symbol: 'ABNB', price: 107.81, change: 1.59, isPositive: true },
  { symbol: 'AMZN', price: 100.78, change: 4.40, isPositive: true },
  { symbol: 'AAPL', price: 175.50, change: 2.50, isPositive: true },
  { symbol: 'TSLA', price: 248.50, change: 2.80, isPositive: false },
]

// Assets data
const assets = [
  {
    symbol: 'ABNB',
    shares: '2.8990',
    yearChange: '+3.50%',
    portfolioValue: '$1,897.34',
    profits: '$324.78',
    profitPositive: true,
  },
  {
    symbol: 'AMZN',
    shares: '3.5643',
    yearChange: '+5.76%',
    portfolioValue: '$752.00',
    profits: '$56.20',
    profitPositive: false,
  },
]

// All searchable stocks - will be populated from live API
const fallbackAllStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.50, isPositive: true },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 72.21, change: 5.79, isPositive: false },
  { symbol: 'ABNB', name: 'Airbnb, Inc.', price: 107.81, change: 1.59, isPositive: true },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 100.78, change: 4.40, isPositive: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: 1.20, isPositive: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 3.10, isPositive: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 248.50, change: 2.80, isPositive: false },
]

// Active contracts data (Futures)
const activeContracts = [
  {
    symbol: 'ES',
    name: 'E-mini S&P 500',
    price: '$4234.50',
    change: '+12.25%',
    isPositive: true,
    expiry: '21/03/2025',
    multiplier: '50x',
    volume: '2.1M',
    margin: '$13,200',
  },
  {
    symbol: 'NQ',
    name: 'E-mini S&P 500',
    price: '$14567.75',
    change: '-23.5%',
    isPositive: false,
    expiry: '21/03/2025',
    multiplier: '50x',
    volume: '2.1M',
    margin: '$13,200',
  },
]

// Positions data (Futures)
const positions = [
  {
    symbol: 'ES',
    contracts: '2 contracts',
    type: 'Long',
    entryPrice: '$4210.25',
    currentPrice: '$4234.5',
    pnl: '$+2425.00',
    pnlPositive: true,
    marginUsed: '$26,400',
  },
  {
    symbol: 'ES',
    contracts: '1 contracts',
    type: 'Short',
    entryPrice: '$4210.25',
    currentPrice: '$4234.5',
    pnl: '$+2425.00',
    pnlPositive: true,
    marginUsed: '$26,400',
  },
]

// Options chain data
const optionsChainData = [
  { calls: '28.5 / 29', strike: '18400', put: '28.5 / 29' },
  { calls: '28.5 / 29', strike: '18500', put: '28.5 / 29' },
  { calls: '28.5 / 29', strike: '18600', put: '28.5 / 29' },
]

// Purchase history data
const purchaseHistory = [
  {
    symbol: 'ABNB',
    type: 'Buy',
    time: '09:15 PM',
    amount: '$207.00',
    sharesCount: '2.9087 Shares',
    isBuy: true,
  },
  {
    symbol: 'AMD',
    type: 'Sell',
    time: '09:15 PM',
    amount: '$100.0',
    sharesCount: '1.5200 Shares',
    isBuy: false,
  },
]

const ListingPage = () => {
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectActionOpen, setSelectActionOpen] = useState(false)
  const [activeSegment, setActiveSegment] = useState('Stocks')
  const [optionsTradeModalOpen, setOptionsTradeModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const searchInputRef = useRef(null)

  // ─── Live data state ───
  const [trendingStocks, setTrendingStocks] = useState(fallbackTrendingStocks)
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  // Fetch trending stocks on mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.STOCKS.TRENDING)
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) setTrendingStocks(data)
        }
      } catch (err) {
        console.error('Failed to fetch trending stocks:', err)
      } finally {
        setTrendingLoading(false)
      }
    }
    fetchTrending()
  }, [])

  // Live search with debounce
  const searchTimeoutRef = useRef(null)
  const handleSearchChange = useCallback((e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    if (!query.trim()) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.STOCKS.SEARCH}?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setSearchResults(data)
        }
      } catch (err) {
        console.error('Search error:', err)
        // Fallback to local search
        const filtered = fallbackAllStocks.filter(
          (s) =>
            s.symbol.toLowerCase().includes(query.toLowerCase()) ||
            s.name.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(filtered)
      } finally {
        setSearchLoading(false)
      }
    }, 400)
  }, [])

  const filteredStocks = searchQuery.trim() ? searchResults : []

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const handleOpenSearch = () => {
    setSearchOpen(true)
    setSearchQuery('')
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <DesktopLayout activePath="/learn">
      {/* Back + Search */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <button
          onClick={handleOpenSearch}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 sm:px-5 py-2 hover:shadow-sm transition-shadow cursor-pointer"
        >
          <Search size={18} className="text-gray-400 sm:w-5 sm:h-5" />
          <span className="text-gray-400 text-sm sm:text-base">Search Here....</span>
        </button>
      </div>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/30 backdrop-blur-sm pt-4 sm:pt-0 px-4" onClick={handleCloseSearch}>
          <div
            className="w-full max-w-xl rounded-2xl sm:rounded-[40px] border-2 border-gray-200 p-4 sm:p-8 flex flex-col gap-4 sm:gap-6"
            style={{
              backgroundImage: 'linear-gradient(126deg, rgba(255,255,255,0.86) 24%, rgba(255,255,255,0.72) 97%)',
              backdropFilter: 'blur(112px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-white border border-primary/40 rounded-xl h-12 sm:h-14 px-3">
                <Search size={18} className="text-gray-400 shrink-0 sm:w-5 sm:h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search stocks..."
                  className="flex-1 text-base sm:text-lg text-gray-900 outline-none bg-transparent placeholder:text-gray-400"
                />
              </div>
              <button onClick={handleCloseSearch} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                <X size={22} className="text-gray-900" />
              </button>
            </div>

            {/* Results */}
            {searchLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-gray-500">Searching...</span>
              </div>
            )}

            {!searchLoading && filteredStocks.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-base sm:text-lg text-gray-900 font-normal">Symbols</p>
                <div className="flex flex-col gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => {
                        handleCloseSearch()
                        navigate('/stock-details', { state: { stock } })
                      }}
                      className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <StockLogo symbol={stock.symbol} size="sm" />
                        <div>
                          <p className="text-gray-900 text-sm sm:text-base">{stock.symbol}</p>
                          <p className="text-gray-500 text-xs sm:text-sm">{stock.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-gray-900 text-sm sm:text-base">${stock.price}</p>
                        <div className="flex items-center gap-1">
                          <ArrowUpCircle size={16} className="text-stock-green sm:w-[18px] sm:h-[18px]" fill="#45B369" stroke="white" />
                          <span className="text-stock-green text-xs sm:text-sm">{stock.change}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!searchLoading && searchQuery.trim() && filteredStocks.length === 0 && (
              <p className="text-center text-gray-400 py-4">No stocks found for &quot;{searchQuery}&quot;</p>
            )}
          </div>
        </div>
      )}

      {/* Portfolio Balance + Buy/Sell */}
      <div className="flex flex-col gap-4 sm:gap-5 items-center mb-8 sm:mb-10">
        {/* Segmented Control */}
        <div className="bg-[#f9fafb] flex items-center p-1.5 sm:p-2 rounded-xl sm:rounded-[20px] w-full max-w-[1116px]">
          {['Stocks', 'Futures', 'Options'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSegment(tab)}
              className={`flex-1 py-3 sm:py-5 px-2 rounded-lg sm:rounded-xl text-sm sm:text-lg font-medium tracking-[0.2px] transition-all ${
                activeSegment === tab
                  ? 'bg-white text-black shadow-[1px_2px_12px_0px_rgba(17,24,39,0.03)]'
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Balance + Actions */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 sm:pb-10 border-b border-gray-300 w-full p-4 sm:p-8 lg:p-[60px]">
          {/* Balance section */}
          <div className="flex-shrink-0 w-full md:w-96">
            <p className="text-gray-500 text-base sm:text-lg mb-2 sm:mb-3">Portfolio Balance</p>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800">$18,908.00</h2>
              <Eye size={18} className="text-gray-400 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpCircle size={18} className="text-stock-green sm:w-5 sm:h-5" fill="#45B369" stroke="white" />
              <span className="text-stock-green text-sm sm:text-base">
                4.78% (+0.20%)
              </span>
              <span className="text-gray-400 text-sm sm:text-base ml-0.5">vs Last week</span>
            </div>
          </div>

          {/* Action buttons */}
          {activeSegment === 'Futures' ? (
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center w-full">
              <button
                onClick={() => setSelectActionOpen(true)}
                className="w-full sm:flex-1 bg-[#00AD65] text-white text-lg sm:text-2xl font-medium py-3 sm:py-5 rounded-xl sm:rounded-[22px] hover:opacity-90 transition-opacity"
              >
                Long Position
              </button>
              <button
                onClick={() => setSelectActionOpen(true)}
                className="w-full sm:flex-1 bg-[#FF6464] text-white text-lg sm:text-2xl font-medium py-3 sm:py-5 rounded-xl sm:rounded-[22px] hover:opacity-90 transition-opacity"
              >
                Short Position
              </button>
            </div>
          ) : activeSegment === 'Options' ? null : (
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center w-full">
              <button
                onClick={() => setSelectActionOpen(true)}
                className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-6 hover:shadow-md transition-shadow w-full sm:w-56"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#00AD65] flex items-center justify-center">
                  <Plus size={18} className="text-white sm:w-[22px] sm:h-[22px]" />
                </div>
                <span className="text-gray-500 text-base sm:text-lg">Buy Stocks</span>
              </button>

              <div className="hidden sm:block w-px h-20 bg-gray-200"></div>

              <button
                onClick={() => setSelectActionOpen(true)}
                className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-6 hover:shadow-md transition-shadow w-full sm:w-56"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#FF6464] flex items-center justify-center">
                  <Upload size={18} className="text-white sm:w-[22px] sm:h-[22px]" />
                </div>
                <span className="text-gray-500 text-base sm:text-lg">Sell Stocks</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Select Action Modal */}
      {selectActionOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setSelectActionOpen(false)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-t-[50px] pb-6 sm:pb-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 sm:gap-[30px] items-start px-4 sm:px-8 py-4 sm:py-6">
              {/* Handle + Header */}
              <div className="flex flex-col gap-3 sm:gap-[18px] items-center w-full">
                <div className="w-10 h-2 bg-gray-200 rounded-full" />
                <div className="flex items-center justify-between w-full px-1">
                  <h3 className="text-xl sm:text-[28px] font-normal text-gray-900 tracking-[0.2px]">Select Action</h3>
                  <button
                    onClick={() => setSelectActionOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-gray-900" />
                  </button>
                </div>
                <hr className="w-full border-gray-200" />
              </div>

              {/* Action List */}
              <div className="flex flex-col gap-3 sm:gap-[30px] w-full">
                {[
                  { label: 'Buy Stocks', action: 'buy' },
                  { label: 'Sell Stocks', action: 'sell' },
                  { label: 'Short', action: 'short' },
                  { label: 'Buy to Cover', action: 'cover' },
                ].map((item) => (
                  <button
                    key={item.action}
                    onClick={() => {
                      setSelectActionOpen(false)
                      navigate(`/buy-sell-stock?action=${item.action}`)
                    }}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-gray-100 transition-colors w-full"
                  >
                    <span className="text-base sm:text-xl text-gray-900 tracking-[0.2px]">{item.label}</span>
                    <ChevronRight size={24} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSegment === 'Options' ? (
        <>
          {/* Options Chain Table */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-2xl sm:rounded-[30px] overflow-hidden overflow-x-auto">
              {/* Table Header */}
              <div className="flex min-w-[300px]">
                {['Calls', 'Strike', 'Put'].map((header) => (
                  <div
                    key={header}
                    className="flex-1 bg-[rgba(72,70,255,0.03)] border-b border-primary p-4 sm:p-7"
                  >
                    <p className="text-primary text-base sm:text-xl font-semibold tracking-wide">{header}</p>
                  </div>
                ))}
              </div>
              {/* Table Rows */}
              {optionsChainData.map((row, index) => (
                <div key={index} className="flex min-w-[300px]">
                  <div className="flex-1 bg-[#F9F9F9] p-4 sm:p-7">
                    <p className="text-gray-900 text-sm sm:text-base tracking-wide">{row.calls}</p>
                  </div>
                  <div className="flex-1 bg-[#F9F9F9] p-4 sm:p-7">
                    <p className="text-gray-900 text-sm sm:text-base tracking-wide">{row.strike}</p>
                  </div>
                  <div className="flex-1 bg-[#F9F9F9] p-4 sm:p-7">
                    <p className="text-gray-900 text-sm sm:text-base tracking-wide">{row.put}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Option Card */}
          <div
            className="bg-[#F9FAFB] border border-gray-100 rounded-xl sm:rounded-[22px] p-4 sm:p-7 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow mb-6 sm:mb-8"
            onClick={() => navigate('/options-details', { state: { option: { strike: 18500, type: 'CE', expiry: 'Sept 2025' } } })}
          >
            <p className="text-gray-900 text-sm sm:text-base tracking-wide">18500 CE (Call, Sept 2025 expiry)</p>
            <ChevronRight size={22} className="text-gray-500" />
          </div>

          {/* Place Bid Button */}
          <div className="flex justify-center mb-8 sm:mb-16">
            <button
              onClick={() => {
                setSelectedOption({ strike: 18500, type: 'CE', expiry: 'Sept 2025' })
                setOptionsTradeModalOpen(true)
              }}
              className="bg-[#047D95] text-white text-base sm:text-xl font-bold py-3 px-8 sm:px-16 rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Place Bid - Min $36.10
            </button>
          </div>
        </>
      ) : activeSegment === 'Futures' ? (
        <>
          {/* Active Contracts */}
          <section className="mb-8 sm:mb-16">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Active Contracts</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-10">
              {activeContracts.map((contract, index) => (
                <div
                  key={`${contract.symbol}-${index}`}
                  onClick={() => navigate('/futures-details', { state: { contract } })}
                  className="bg-white border border-gray-100 rounded-2xl sm:rounded-[30px] p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <StockLogo symbol="ABNB" size="lg" />
                      <div>
                        <p className="text-gray-900 text-sm sm:text-base">{contract.symbol}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{contract.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 text-sm sm:text-base">{contract.price}</p>
                      <p className={`text-xs sm:text-sm font-semibold ${contract.isPositive ? 'text-[#00AD65]' : 'text-[#FF6464]'}`}>
                        {contract.change}
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <p className="text-gray-500">
                        <span className="font-semibold">Expiry: </span>
                        <span className="text-gray-700">{contract.expiry}</span>
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">Multiplier: </span>
                        <span className="text-gray-700">{contract.multiplier}</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <p className="text-gray-500">
                        <span className="font-semibold">Volume: </span>
                        <span className="text-gray-700">{contract.volume}</span>
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">Margin: </span>
                        <span className="text-gray-700">{contract.margin}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Positions */}
          <section className="mb-8 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Your Positions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-10">
              {positions.map((pos, index) => (
                <div
                  key={`${pos.symbol}-${pos.type}-${index}`}
                  className="bg-white border border-gray-100 rounded-2xl sm:rounded-[30px] p-4 sm:p-6 flex flex-col gap-3 sm:gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <StockLogo symbol="ABNB" size="lg" />
                      <div>
                        <p className="text-gray-900 text-sm sm:text-base">{pos.symbol}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{pos.contracts}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-sm sm:text-base font-semibold ${
                        pos.type === 'Long'
                          ? 'bg-[rgba(0,173,101,0.1)] text-[#00AD65]'
                          : 'bg-[rgba(255,90,95,0.1)] text-[#FF5A5F]'
                      }`}
                    >
                      {pos.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-500 font-semibold">Entry Price</p>
                      <p className="text-gray-700 font-semibold">{pos.entryPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">Current Price</p>
                      <p className="text-gray-700 font-semibold">{pos.currentPrice}</p>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-500 font-semibold">Unrealized P&L</p>
                      <p className={`font-extrabold italic ${pos.pnlPositive ? 'text-[#00AD65]' : 'text-stock-red'}`}>
                        {pos.pnl}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">Margin Used</p>
                      <p className="text-gray-700 font-semibold">{pos.marginUsed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Trending Stocks */}
          <section className="mb-8 sm:mb-16">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Trending Stocks</h3>
                {!trendingLoading && (
                  <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">LIVE</span>
                )}
              </div>
              <button
                onClick={() => navigate('/stock-details')}
                className="text-primary font-medium text-base sm:text-lg hover:underline"
              >
                View All
              </button>
            </div>
            <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {trendingStocks.map((stock, index) => (
                <div
                  key={`${stock.symbol}-${index}`}
                  onClick={() => navigate('/stock-details', { state: { stock } })}
                  className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 min-w-[150px] sm:min-w-[180px] cursor-pointer hover:shadow-md transition-shadow flex flex-col gap-3 sm:gap-4"
                >
                  <StockLogo symbol={stock.symbol} size="md" />
                  <p className="text-gray-900 text-sm sm:text-base font-normal">{stock.symbol}</p>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-gray-500 text-xs sm:text-sm">${typeof stock.price === 'number' ? stock.price.toFixed(2) : stock.price}</span>
                    <div className="flex items-center gap-1">
                      {stock.isPositive ? (
                        <ArrowUpCircle size={16} className="text-stock-green sm:w-[18px] sm:h-[18px]" fill="#45B369" stroke="white" />
                      ) : (
                        <ArrowDownCircle size={16} className="text-stock-red sm:w-[18px] sm:h-[18px]" fill="#EF4770" stroke="white" />
                      )}
                      <span
                        className={`text-xs sm:text-sm ${
                          stock.isPositive ? 'text-stock-green' : 'text-stock-red'
                        }`}
                      >
                        {stock.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Assets */}
          <section className="mb-8 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Your Assets</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-10">
              {assets.map((asset, index) => (
                <div
                  key={`${asset.symbol}-${index}`}
                  className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <StockLogo symbol={asset.symbol} size="lg" />
                      <div>
                        <p className="text-gray-900 text-sm sm:text-base">{asset.symbol}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{asset.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 text-sm sm:text-base">{asset.yearChange}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">Per year</p>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Portfolio value</p>
                      <p className="text-gray-900 text-base sm:text-lg font-medium">{asset.portfolioValue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs sm:text-sm">Profits</p>
                      <p
                        className={`text-base sm:text-lg font-medium ${
                          asset.profitPositive ? 'text-stock-green' : 'text-stock-red'
                        }`}
                      >
                        {asset.profits}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Purchase History */}
      {activeSegment !== 'Options' && (
        <section className="mb-8 sm:mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Purchase History</h3>
            <button
              onClick={() => navigate('/purchase-history')}
              className="text-primary font-medium text-base sm:text-lg hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-10">
            {purchaseHistory.map((item, index) => (
              <div
                key={`${item.symbol}-${index}`}
                className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <StockLogo symbol={item.symbol} size="lg" />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white flex items-center justify-center ${
                        item.isBuy ? 'bg-stock-green' : 'bg-stock-red'
                      }`}
                    >
                      {item.isBuy ? (
                        <Download size={8} className="text-white sm:w-[10px] sm:h-[10px]" />
                      ) : (
                        <Upload size={8} className="text-white sm:w-[10px] sm:h-[10px]" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {item.type} {item.symbol}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">{item.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 text-base sm:text-lg">{item.amount}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.sharesCount}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Options Trade Modal */}
      <OptionsTradeModal
        isOpen={optionsTradeModalOpen}
        onClose={() => setOptionsTradeModalOpen(false)}
        option={selectedOption}
      />
    </DesktopLayout>
  )
}

export default ListingPage

