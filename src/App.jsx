import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import NavigationTabs from './components/NavigationTabs'
import FloatingChatButton from './components/FloatingChatButton'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <div className="app-container">
              <AppRouter />
              <NavigationTabs />
              <FloatingChatButton />
            </div>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
