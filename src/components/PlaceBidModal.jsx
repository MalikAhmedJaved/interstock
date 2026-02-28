import { useState } from 'react'

// Figma assets
import bidCloseIcon from '../assets/figma/bid-close.svg'
import auctionBidMain from '../assets/figma/auction-bid-main.svg'
import auctionBidDetail from '../assets/figma/auction-bid-detail.svg'

const PlaceBidModal = ({ isOpen, onClose, minimumBid = '$267.90' }) => {
  const [bidAmount, setBidAmount] = useState('100.00')

  if (!isOpen) return null

  const handleBidChange = (e) => {
    const value = e.target.value
    // Allow only numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setBidAmount(value)
    }
  }

  const handlePlaceBid = () => {
    // Handle bid placement logic
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[55px] w-full max-w-[610px] p-[60px] animate-slide-up">
          <div className="flex flex-col gap-[60px] items-center">

            {/* Header with icon and close button */}
            <div className="flex items-start justify-between w-full">
              <div className="w-6" />
              {/* Auction Bid Icon */}
              <div className="bg-[#F9FAFB] border border-gray-100 rounded-full w-32 h-32 flex items-center justify-center relative overflow-hidden">
                <img src={auctionBidMain} alt="" className="w-[60px] h-[60px] absolute" style={{ top: '0', left: '0.04%' }} />
                <img src={auctionBidDetail} alt="" className="absolute" style={{ bottom: '0', right: '0.04%', width: '27px', height: '12px' }} />
              </div>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <img src={bidCloseIcon} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Title + Subtitle */}
            <div className="flex flex-col gap-4 items-center text-center w-full">
              <h2 className="text-gray-900 text-[32px] leading-normal tracking-wide">
                Place Your{'\n'}Bid
              </h2>
              <p className="text-[#84868C] text-xl">
                Enter your maximum bid amount
              </p>
            </div>

            {/* Bid Amount Input */}
            <div className="flex flex-col gap-3 w-full">
              <p className="text-gray-400 text-xl tracking-wide">Bid Amount ($)</p>
              <div className="bg-[#F5F5F5] rounded-[12px] p-5 flex items-center justify-between">
                <input
                  type="text"
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="bg-transparent text-gray-900 text-[32px] leading-[1.2] outline-none w-full"
                  placeholder="0.00"
                />
                <span className="text-gray-500 text-2xl tracking-wide ml-4 shrink-0">USD</span>
              </div>
              <p className="text-gray-400 text-xl tracking-wide">
                Minimum Bid{' '}
                <span className="text-gray-900">{minimumBid}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5 items-center justify-center w-full">
              <button
                onClick={onClose}
                className="border border-[#BF4040] text-[#BF4040] text-xl font-bold py-2 px-6 rounded-full hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBid}
                className="bg-[#047D95] text-white text-xl font-bold py-2 px-6 rounded-full hover:opacity-90 transition-opacity"
              >
                Place Bid
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceBidModal
