import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const OtpVerifyPage = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/create-password')
  }

  return (
    <div className="min-h-screen bg-background-light px-6 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Verify OTP</h2>
        <p className="text-text-secondary-light mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 border-gray-300 focus:border-primary focus:outline-none"
              />
            ))}
          </div>

          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary-light">
            Didn't receive code?{' '}
            <button className="text-primary font-semibold hover:underline">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtpVerifyPage




