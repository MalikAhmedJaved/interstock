import { useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import StockLogo from '../components/StockLogo'
import DesktopLayout from '../components/DesktopLayout'

const FuturesOrderPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Get action & contract from URL/state
  const actionParam = searchParams.get('action') || 'buy'
  const contractFromState = location.state?.contract

  const [activeTab, setActiveTab] = useState(actionParam) // 'buy' or 'sell'
  const [contracts, setContracts] = useState(2)

  // Contract / asset info
  const symbol = contractFromState?.symbol || 'AMD'
  const currentPrice = contractFromState?.price || 4234.5

  // Available portfolio balance (mock)
  const availableBalance = 267.90

  // Computed trade summary values
  const isBuy = activeTab === 'buy'
  const direction = isBuy ? 'Long (Buy)' : 'Short (Sell)'
  const entryPrice = 82.92
  const contractValue = 80380
  const marginRequired = 4200

  const handleIncrement = () => setContracts((prev) => prev + 1)
  const handleDecrement = () => setContracts((prev) => (prev > 1 ? prev - 1 : 1))

  const handleConfirmTrade = () => {
    navigate('/order-confirmed-page', {
      state: {
        type: 'futures',
        action: activeTab,
        symbol,
        contracts,
        direction,
        entryPrice,
        contractValue,
        marginRequired,
      },
    })
  }

  return (
    <DesktopLayout activePath="/learn">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto flex-1">
        {/* Back button row */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-gray-900 rotate-180" />
          </button>
        </div>

        {/* Centered content area */}
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
          {/* Buy / Sell Segmented Control */}
          <div className="w-full bg-[#F9FAFB] rounded-2xl sm:rounded-[20px] p-1 flex items-center">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-3 sm:py-4 text-center text-base sm:text-lg font-medium tracking-wide rounded-lg transition-all ${
                activeTab === 'buy'
                  ? 'bg-white text-black shadow-[1px_2px_12px_rgba(17,24,39,0.03)]'
                  : 'text-gray-400'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex-1 py-3 sm:py-4 text-center text-base sm:text-lg font-medium tracking-wide rounded-lg transition-all ${
                activeTab === 'sell'
                  ? 'bg-white text-black shadow-[1px_2px_12px_rgba(17,24,39,0.03)]'
                  : 'text-gray-400'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Selected Asset Section */}
          <div className="w-full">
            <div className="px-2.5 py-2.5 mb-0">
              <p className="text-lg sm:text-xl lg:text-[22px] text-gray-400 tracking-wide">Selected Asset</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-[22px] p-4 sm:p-6 lg:p-[30px] flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <StockLogo symbol={symbol} size="md" />
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 tracking-wide">{symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-semibold tracking-wide">Current Price</p>
                <p className="text-sm sm:text-base lg:text-lg text-[#383E4C] font-semibold tracking-wide">${currentPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Number of Contracts Section */}
          <div className="w-full">
            <div className="px-2.5 py-2.5 mb-0">
              <p className="text-lg sm:text-xl lg:text-[22px] text-gray-400 tracking-wide">Number of Contracts</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-[22px] p-4 sm:p-6 lg:p-[30px] flex items-center justify-between">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 tracking-wide">{contracts}</p>
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handleIncrement}
                  className="hover:bg-gray-100 rounded transition-colors p-0.5"
                >
                  <ChevronUp size={22} className="text-gray-600" />
                </button>
                <button
                  onClick={handleDecrement}
                  className="hover:bg-gray-100 rounded transition-colors p-0.5"
                >
                  <ChevronDown size={22} className="text-gray-600" />
                </button>
              </div>
            </div>
            <div className="px-2.5 py-2.5">
              <p className="text-base sm:text-lg lg:text-xl tracking-wide">
                <span className="text-gray-900">${availableBalance.toFixed(2)}</span>
                <span className="text-gray-400"> available portfolio</span>
              </p>
            </div>
          </div>

          {/* Trade Summary Section */}
          <div className="w-full">
            <div className="border-b border-[#EBECEF] pb-3 sm:pb-4 pt-3 px-3 mb-1">
              <h3 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-gray-900 tracking-wide">Trade Summary</h3>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-[30px] p-5 sm:p-8 lg:p-10">
              {/* Direction */}
              <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-[#EBECEF]">
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-500 tracking-wide">Direction</span>
                <span
                  className={`text-base sm:text-lg lg:text-[22px] font-extrabold italic tracking-wide ${
                    isBuy ? 'text-[#00AD65]' : 'text-[#FF6464]'
                  }`}
                >
                  {direction}
                </span>
              </div>
              {/* Entry Price */}
              <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-[#EBECEF]">
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-500 tracking-wide">Entry Price</span>
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-900 tracking-wide">${entryPrice.toFixed(2)}</span>
              </div>
              {/* Contract Value */}
              <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-[#EBECEF]">
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-500 tracking-wide">Contract Value</span>
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-900 tracking-wide">${contractValue.toLocaleString()}</span>
              </div>
              {/* Margin Required */}
              <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-[#EBECEF]">
                <span className="text-base sm:text-lg lg:text-[22px] text-gray-500 tracking-wide">Margin Required</span>
                <span className="text-base sm:text-lg lg:text-[22px] font-extrabold italic text-primary tracking-wide">
                  ${marginRequired.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Trade Button */}
          <button
            onClick={handleConfirmTrade}
            className="w-full sm:w-auto bg-[#047D95] text-white text-lg sm:text-xl font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
          >
            Confirm Trade - {contracts} contract{contracts !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </DesktopLayout>
  )
}

export default FuturesOrderPage
