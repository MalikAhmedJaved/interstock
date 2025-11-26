import { Link, useLocation } from 'react-router-dom'
import Button from './Button'

const PublicHeader = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isRegisterPage = location.pathname === '/register-email'

  return (
    <header className="w-full px-6 py-4 flex justify-end items-center">
      <div className="flex gap-3">
        {!isLoginPage && (
          <Link to="/login">
            <Button variant="outline" className="px-4 py-2 text-sm">
              Login
            </Button>
          </Link>
        )}
        {!isRegisterPage && (
          <Link to="/register-email">
            <Button className="px-4 py-2 text-sm">
              Register
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default PublicHeader

