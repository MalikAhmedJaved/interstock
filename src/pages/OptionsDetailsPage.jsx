import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
} from 'lucide-react'
import StockLogo from '../components/StockLogo'
import PlaceBidModal from '../components/PlaceBidModal'
import DesktopLayout from '../components/DesktopLayout'

// Time period tabs
const timePeriods = ['24H', '7D', '1M', '3M', '1Y', 'ALL']

const OptionsDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePeriod, setActivePeriod] = useState('24H')
  const [placeBidOpen, setPlaceBidOpen] = useState(false)

  // Get option from location state or use defaults
  const optionFromState = location.state?.option

  const option = {
    name: optionFromState?.name || 'TechStart IPO',
    company: optionFromState?.company || 'TechStart Solution Inc.',
    marginRequired: optionFromState?.marginRequired || '$13,200',
    price: optionFromState?.price || 18.20,
    timeLeft: optionFromState?.timeLeft || '2h 22m',
    totalShares: optionFromState?.totalShares || 300,
    startingPrice: optionFromState?.startingPrice || '$82.92',
    activeBidders: optionFromState?.activeBidders || 8,
    minIncrement: optionFromState?.minIncrement || '$0.30',
    minBid: optionFromState?.minBid || '$36.10',
  }

  const statsItems = [
    { label: 'Total Shares', value: option.totalShares },
    { label: 'Starting Price', value: option.startingPrice },
    { label: 'Active Bidders', value: option.activeBidders },
    { label: 'Min Increment', value: option.minIncrement },
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

        {/* Option Info Header */}
        <div className="flex flex-col gap-2.5 mb-8 sm:mb-10">
          {/* Name Row */}
          <div className="flex items-center gap-3">
            <StockLogo symbol="ABNB" size="lg" />
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-gray-800 leading-tight">{option.name}</h2>
              <p className="text-gray-500 text-base sm:text-lg lg:text-xl">{option.company}</p>
            </div>
          </div>

          {/* Price + Timer Row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
                <span className="font-medium">Margin Required: </span>
                <span className="text-gray-700">{option.marginRequired}</span>
              </p>
              <p className="text-primary text-2xl sm:text-[28px]">${option.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={24} className="text-gray-400 sm:w-7 sm:h-7" />
              <span className="text-[#FF6464] text-xl sm:text-2xl lg:text-[28px] font-medium">{option.timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Time Period Tabs */}
        <div className="bg-white border border-gray-100 rounded-xl sm:rounded-[20px] p-1 flex items-center mb-8 sm:mb-10 overflow-x-auto">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`flex-1 min-w-[48px] py-3 sm:py-4 text-center text-sm sm:text-base rounded-xl sm:rounded-[20px] transition-all ${
                activePeriod === period
                  ? 'bg-[#F9F9F9] text-black shadow-[0px_-1px_6px_rgba(17,24,39,0.02),1px_2px_6px_rgba(17,24,39,0.04)]'
                  : 'text-gray-400'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Stats Card */}
        <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-[30px] p-5 sm:p-8 lg:p-10 mb-8 sm:mb-10">
          {statsItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2.5 sm:py-3 border-b border-[#EBECEF]"
            >
              <span className="text-gray-500 text-base sm:text-lg lg:text-xl tracking-wide">{item.label}</span>
              <span className="text-gray-900 text-base sm:text-lg lg:text-xl tracking-wide text-right">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Place Bid Button */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <button
            onClick={() => setPlaceBidOpen(true)}
            className="w-full sm:w-auto bg-[#047D95] text-white text-lg sm:text-xl font-bold py-3 px-8 sm:px-16 rounded-full hover:opacity-90 transition-opacity"
          >
            Place Bid - Min {option.minBid}
          </button>
        </div>
      </div>

      {/* Place Bid Modal */}
      <PlaceBidModal
        isOpen={placeBidOpen}
        onClose={() => setPlaceBidOpen(false)}
        minimumBid={option.minBid}
      />
    </DesktopLayout>
  )
}

export default OptionsDetailsPage
