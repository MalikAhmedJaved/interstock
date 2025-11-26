import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: '#F0F4F8' }}>
      <h1 className="text-4xl font-bold font-orbitron" style={{ color: '#4846FF' }}>InterStock</h1>
      <div className="absolute bottom-12">
        <p className="text-sm" style={{ color: '#9CA3AF' }}>For InterStock Students – 100% Free</p>
      </div>
    </div>
  )
}

export default SplashPage




