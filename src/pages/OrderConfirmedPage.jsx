import { useNavigate, useLocation } from 'react-router-dom'
import DesktopLayout from '../components/DesktopLayout'

// Success checkmark illustration with sparkle stars
const SuccessIllustration = () => (
  <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px]">
    {/* Outer circle */}
    <div className="absolute inset-0 rounded-full border-[1.5px] border-stock-green" />
    {/* Inner gradient circle */}
    <div
      className="absolute inset-[5px] rounded-full"
      style={{ background: 'linear-gradient(135deg, #ECF7F0 0%, #D4EDDA 100%)' }}
    />
    {/* Checkmark */}
    <svg className="absolute inset-0 m-auto" width="52" height="38" viewBox="0 0 52 38" fill="none">
      <path
        d="M5 19L19 33L47 5"
        stroke="#45B369"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {/* Decorative sparkle stars */}
    <svg className="absolute -top-3 -left-2" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#FFD84A" />
    </svg>
    <svg className="absolute -top-5 left-6" width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#FFD84A" />
    </svg>
    <svg className="absolute bottom-2 -left-4" width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#FFD84A" />
    </svg>
    <svg className="absolute -top-2 right-0" width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#45B369" />
    </svg>
    <svg className="absolute top-1/3 -right-5" width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#45B369" />
    </svg>
    <svg className="absolute bottom-0 -right-3" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#45B369" />
    </svg>
  </div>
)

const OrderConfirmedPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get order data from location state or use defaults
  const order = location.state?.order || {
    symbol: 'AAPL',
    quantity: '10',
    price: '175.50',
    total: '207.67',
    amount: '207.67',
    action: 'buy',
  }

  const actionLabel = order.action === 'sell' ? 'Sell' : order.action === 'short' ? 'Short' : order.action === 'cover' ? 'Buy to Cover' : 'Buy'
  const amountNum = parseFloat(order.amount || order.total || '0')
  const priceNum = parseFloat(order.price || '0')
  const estimatedShares = priceNum > 0 ? (amountNum / priceNum).toFixed(4) : order.quantity

  return (
    <DesktopLayout activePath="/learn">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-y-auto flex justify-center">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[60px] items-center max-w-3xl w-full">
          {/* Success Illustration */}
          <SuccessIllustration />

          {/* Text */}
          <div className="flex flex-col gap-2 sm:gap-3 items-center text-center">
            <h2 className="text-2xl sm:text-[32px] font-medium text-gray-900 tracking-[0.2px]">
              {actionLabel} Order Received
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-[523px] leading-[1.5] font-roboto">
              Your order has been received and will be executed as soon as the market opens.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white border border-gray-100 rounded-xl sm:rounded-[22px] px-5 sm:px-10 py-3 sm:py-5 w-full">
            {/* Quantity */}
            <div className="flex items-center justify-between py-3 sm:py-5 border-b border-[#EBECEF]">
              <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Quantity</span>
              <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">{estimatedShares} Shares</span>
            </div>
            {/* Buy Price */}
            <div className="flex items-center justify-between py-3 sm:py-5 border-b border-[#EBECEF]">
              <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">{actionLabel} Price</span>
              <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">${amountNum.toFixed(2)}</span>
            </div>
            {/* Purchase Fee */}
            <div className="flex items-center justify-between py-3 sm:py-5 border-b border-[#EBECEF]">
              <span className="text-gray-500 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Purchase Fee</span>
              <span className="text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]" style={{ color: '#45B369' }}>Free</span>
            </div>
            {/* Total */}
            <div className="flex items-center justify-between py-3 sm:py-5">
              <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto leading-[1.6]">Total</span>
              <span className="text-gray-900 text-base sm:text-lg tracking-[0.2px] font-roboto text-right leading-[1.6]">${amountNum.toFixed(2)}</span>
            </div>
          </div>

          {/* Back to Learn Button */}
          <button
            onClick={() => navigate('/learn')}
            className="text-white font-bold text-base font-satoshi rounded-xl px-10 sm:px-16 py-3 sm:py-4 w-full sm:w-[327px] tracking-[0.2px] transition-colors hover:opacity-90"
            style={{ backgroundColor: '#164951' }}
          >
            Back to Learn
          </button>
        </div>
      </div>
    </DesktopLayout>
  )
}

export default OrderConfirmedPage


