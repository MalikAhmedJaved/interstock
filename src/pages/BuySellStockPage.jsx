import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  X,
  Loader2,
} from 'lucide-react'
import StockLogo from '../components/StockLogo'
import DesktopLayout from '../components/DesktopLayout'
import { API_ENDPOINTS } from '../config/api'

// Action tabs
const actionTabs = [
  { label: 'Buy', value: 'buy' },
  { label: 'Sell', value: 'sell' },
  { label: 'Short', value: 'short' },
  { label: 'Buy to Cover', value: 'cover' },
]

// Fallback available stocks (used while live data loads)
const fallbackStocks = [
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 72.21 },
  { symbol: 'ABNB', name: 'Airbnb, Inc.', price: 107.81 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 100.78 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50 },
  { symbol: 'AFRM', name: 'Affirm Holdings, Inc.', price: 18.20 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 248.50 },
]

const BuySellStockPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const actionParam = searchParams.get('action') || 'buy'
  const stockFromState = location.state?.stock

  const [activeTab, setActiveTab] = useState(actionParam)
  const [selectedStock, setSelectedStock] = useState(
    stockFromState
      ? { symbol: stockFromState.symbol, name: stockFromState.name || '', price: stockFromState.price || 0 }
      : fallbackStocks[0]
  )
  const [amount, setAmount] = useState('100.00')
  const [quantity, setQuantity] = useState('25')
  const [assetSelectorOpen, setAssetSelectorOpen] = useState(false)
  const [orderPreviewOpen, setOrderPreviewOpen] = useState(false)

  // ─── Live data state ───
  const [availableStocks, setAvailableStocks] = useState(fallbackStocks)
  const [stocksLoading, setStocksLoading] = useState(true)

  // Fetch live prices for the asset selector
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const symbols = fallbackStocks.map(s => s.symbol).join(',')
        const res = await fetch(`${API_ENDPOINTS.STOCKS.QUOTES}?symbols=${symbols}`)
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setAvailableStocks(data)
            // If selected stock matches, update its price
            const updated = data.find(s => s.symbol === selectedStock.symbol)
            if (updated) setSelectedStock(prev => ({ ...prev, price: updated.price, name: updated.name }))
          }
        }
      } catch (err) {
        console.error('Failed to fetch stock prices:', err)
      } finally {
        setStocksLoading(false)
      }
    }
    fetchStocks()
  }, [])

  // Refresh selected stock price when it changes
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.STOCKS.QUOTE(selectedStock.symbol))
        if (res.ok) {
          const data = await res.json()
          setSelectedStock(prev => ({ ...prev, price: data.price, name: data.name }))
        }
      } catch (err) {
        // Keep existing price
      }
    }
    fetchPrice()
  }, [selectedStock.symbol])

  const availableBalance = 267.90

  const getActionLabel = () => {
    switch (activeTab) {
      case 'buy': return 'buy'
      case 'sell': return 'sell'
      case 'short': return 'short'
      case 'cover': return 'buy to cover'
      default: return 'buy'
    }
  }

  const amountNum = parseFloat(amount) || 0
  const estimatedShares = selectedStock.price > 0 ? (amountNum / selectedStock.price).toFixed(4) : '0.0000'
  const totalPurchase = amountNum.toFixed(2)

  const handleContinue = () => setOrderPreviewOpen(true)

  const handleBuyNow = () => {
    const orderData = {
      symbol: selectedStock.symbol, quantity, amount,
      price: selectedStock.price, action: activeTab, total: totalPurchase,
    }
    navigate('/order-confirmed-page', { state: { order: orderData } })
  }

  const handleViewOrder = () => navigate('/purchase-history')

  return (
    <DesktopLayout activePath="/learn">
      {/* Back button */}
      <div className="mb-4 sm:mb-6">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-3xl mx-auto">
        {/* Segmented Control */}
        <div className="w-full bg-gray-50 rounded-xl sm:rounded-[20px] p-1 flex items-center">
          {actionTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-3 sm:py-4 text-center text-sm sm:text-lg rounded-lg transition-all ${
                  isActive ? 'bg-white text-black font-normal shadow-sm' : 'text-gray-400'
                }`}
                style={isActive ? { boxShadow: '1px 2px 12px rgba(17,24,39,0.03)' } : {}}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Form Fields */}
        <div className="w-full flex flex-col gap-4 sm:gap-6">
          {/* Select Asset */}
          <div className="flex flex-col">
            <p className="text-gray-400 text-base sm:text-[22px] tracking-[0.2px] px-2 sm:px-2.5 py-2 sm:py-2.5 leading-snug">
              Select Asset
            </p>
            <button
              onClick={() => setAssetSelectorOpen(true)}
              className="bg-white rounded-xl sm:rounded-[22px] p-4 sm:p-[30px] flex items-center justify-between w-full hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <StockLogo symbol={selectedStock.symbol} size="md" />
                <span className="text-gray-900 text-lg sm:text-2xl tracking-[0.2px]">
                  {selectedStock.symbol}
                </span>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <p className="text-gray-400 text-base sm:text-[22px] tracking-[0.2px] px-2 sm:px-2.5 py-2 sm:py-2.5 leading-snug">
              How much to {getActionLabel()}?
            </p>
            <div className="bg-white rounded-xl sm:rounded-[22px] p-4 sm:p-[30px] flex items-center justify-between w-full">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-gray-900 text-lg sm:text-2xl tracking-[0.2px] bg-transparent outline-none w-full"
                placeholder="0.00"
              />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-gray-500 text-base sm:text-[22px] tracking-[0.2px]">USD</span>
                <ChevronRight size={24} className="text-gray-400" />
              </div>
            </div>
            <p className="px-2 sm:px-2.5 py-2 sm:py-2.5 text-base sm:text-xl">
              <span className="text-gray-900 font-normal">${availableBalance.toFixed(2)}</span>
              <span className="text-gray-400"> available portfolio</span>
            </p>
          </div>

          {/* Number of Stocks */}
          <div className="flex flex-col">
            <p className="text-gray-400 text-base sm:text-[22px] tracking-[0.2px] px-2 sm:px-2.5 py-2 sm:py-2.5 leading-snug">
              Number of Stocks
            </p>
            <div className="bg-white rounded-xl sm:rounded-[22px] p-4 sm:p-[30px] flex items-center w-full">
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="text-gray-900 text-lg sm:text-2xl tracking-[0.2px] bg-transparent outline-none w-full"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="bg-[#047D95] text-white font-bold text-lg sm:text-xl rounded-full px-10 sm:px-16 py-2.5 sm:py-2 transition-colors hover:opacity-90 w-full sm:w-auto"
        >
          Continue
        </button>
      </div>

      {/* Order Preview Modal */}
      {orderPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={() => setOrderPreviewOpen(false)}
        >
          <div
            className="bg-white rounded-3xl sm:rounded-[55px] p-6 sm:p-10 lg:p-[60px] w-full max-w-[730px] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6 sm:gap-10 lg:gap-[60px] items-center justify-center max-w-[610px] mx-auto">
              {/* Header: close button + logo */}
              <div className="flex items-start justify-between w-full">
                <div className="w-6 h-6" />
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <StockLogo symbol={selectedStock.symbol} size="lg" />
                </div>
                <button onClick={() => setOrderPreviewOpen(false)} className="hover:bg-gray-100 rounded-lg p-1 transition-colors">
                  <X size={24} className="text-gray-900" />
                </button>
              </div>

              {/* Title + subtitle */}
              <div className="flex flex-col gap-3 sm:gap-4 items-center text-center w-full">
                <h2 className="text-xl sm:text-2xl lg:text-[32px] font-normal text-gray-900 tracking-[0.2px] font-roboto">
                  {selectedStock.symbol} Order Preview
                </h2>
                <p className="text-base sm:text-xl text-gray-400 max-w-[484px] leading-[1.5] font-roboto">
                  Your order to {getActionLabel()} ${amountNum.toFixed(2)} of {selectedStock.symbol} is queued for market open.
                </p>
              </div>

              {/* Stats card + total */}
              <div className="flex flex-col items-start w-full">
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 w-full">
                  <div className="flex items-center justify-between py-4 sm:py-5 border-b border-[#EBECEF]">
                    <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Amount Invested</span>
                    <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">${amountNum.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 sm:py-5 border-b border-[#EBECEF]">
                    <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Estimated Shares</span>
                    <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">{estimatedShares}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 sm:py-5">
                    <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Purchase Fee</span>
                    <span className="text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6] text-stock-green">Free</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full px-2.5 py-3 sm:py-4">
                  <span className="text-gray-500 text-sm sm:text-base tracking-[0.2px] font-roboto leading-[1.6]">Total Purchase</span>
                  <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">${totalPurchase}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full">
                <button onClick={handleViewOrder}
                  className="border border-[#BF4040] text-[#BF4040] font-bold text-base sm:text-xl font-inter rounded-full px-4 py-2 hover:bg-red-50 transition-colors w-full sm:w-auto">
                  View Order
                </button>
                <button onClick={handleBuyNow}
                  className="bg-[#047D95] text-white font-bold text-base sm:text-xl font-inter rounded-full px-4 py-2 hover:opacity-90 transition-colors w-full sm:w-auto">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Selector Modal */}
      {assetSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm" onClick={() => setAssetSelectorOpen(false)}>
          <div className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-t-[50px] pb-6 sm:pb-10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 sm:gap-[30px] items-start px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col gap-3 sm:gap-[18px] items-center w-full">
                <div className="w-10 h-2 bg-gray-200 rounded-full" />
                <div className="flex items-center justify-between w-full px-1">
                  <h3 className="text-xl sm:text-[28px] font-normal text-gray-900 tracking-[0.2px]">Select Asset</h3>
                  <button onClick={() => setAssetSelectorOpen(false)} className="text-gray-900 text-2xl leading-none hover:bg-gray-100 rounded-lg p-1 transition-colors">
                    ✕
                  </button>
                </div>
                <hr className="w-full border-gray-200" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-[20px] w-full max-h-[50vh] sm:max-h-[400px] overflow-y-auto">
                {availableStocks.map((stock) => (
                  <button key={stock.symbol} onClick={() => { setSelectedStock(stock); setAssetSelectorOpen(false) }}
                    className={`rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-gray-100 transition-colors w-full ${
                      selectedStock.symbol === stock.symbol ? 'bg-gray-100 border border-primary' : 'bg-gray-50 border border-gray-100'
                    }`}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <StockLogo symbol={stock.symbol} size="sm" />
                      <div className="text-left">
                        <p className="text-gray-900 text-base sm:text-lg">{stock.symbol}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{stock.name}</p>
                      </div>
                    </div>
                    <span className="text-gray-900 text-base sm:text-lg">${stock.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  )
}

export default BuySellStockPage
