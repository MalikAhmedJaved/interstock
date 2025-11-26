import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../components/Button'

const OrderConfirmedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="card p-6 space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-stock-green/10 flex items-center justify-center">
            <CheckCircle className="text-stock-green" size={48} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">Order Confirmed!</h3>
          <p className="text-text-secondary-light">
            Your order has been placed successfully.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary-light">Stock</span>
            <span className="font-semibold">AAPL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary-light">Quantity</span>
            <span className="font-semibold">10 shares</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary-light">Price</span>
            <span className="font-semibold">$175.50</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">$1,755.00</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={() => navigate('/home')}>
            Go to Home
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => navigate('/purchase-history')}>
            View History
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmedPage


