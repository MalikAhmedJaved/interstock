import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Plus, FileText, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

// Default notes (pre-existing)
const defaultNotes = [
    { 
      id: 1, 
      title: 'Trading Basics', 
      date: '2024-01-15', 
      preview: 'Notes about stock market fundamentals...',
      content: `# Trading Basics

## Introduction to Stock Market

The stock market is a platform where shares of publicly traded companies are bought and sold. Understanding the fundamentals is crucial for successful trading.

## Key Concepts

### 1. What are Stocks?
Stocks represent ownership shares in a company. When you buy a stock, you become a shareholder and own a portion of that company.

### 2. Market Types
- **Bull Market**: A market characterized by rising prices and investor optimism
- **Bear Market**: A market with falling prices and investor pessimism
- **Sideways Market**: A market with little price movement

### 3. Trading Orders
- **Market Order**: Buy or sell immediately at current market price
- **Limit Order**: Buy or sell at a specific price or better
- **Stop Order**: Triggers a market order when price reaches a certain level

## Trading Strategies

### Day Trading
Buying and selling stocks within the same trading day to profit from short-term price movements.

### Swing Trading
Holding stocks for several days or weeks to profit from price swings.

### Position Trading
Holding stocks for months or years based on long-term trends.

## Important Tips

1. Always do your research before investing
2. Never invest more than you can afford to lose
3. Diversify your portfolio
4. Keep emotions out of trading decisions
5. Set stop-loss orders to limit losses

## Conclusion

Mastering trading basics is the foundation for becoming a successful trader. Continue learning and practicing with simulated trading before investing real money.`
    },
    { 
      id: 2, 
      title: 'Risk Management', 
      date: '2024-01-10', 
      preview: 'Important strategies for managing risk...',
      content: `# Risk Management

## Understanding Risk in Trading

Risk management is one of the most critical aspects of successful trading. It involves identifying, assessing, and controlling potential losses.

## Types of Risk

### 1. Market Risk
The risk of losses due to market movements. This is inherent in all trading activities.

### 2. Liquidity Risk
The risk that you cannot buy or sell an asset quickly enough to prevent a loss.

### 3. Concentration Risk
The risk of having too much invested in a single asset or sector.

## Risk Management Strategies

### Position Sizing
Never risk more than 1-2% of your trading capital on a single trade. This helps protect your account from significant losses.

### Stop-Loss Orders
Always set stop-loss orders to automatically exit a position if it moves against you beyond a predetermined level.

### Diversification
Spread your investments across different assets, sectors, and markets to reduce overall risk.

### Risk-Reward Ratio
Only take trades where the potential reward is at least 2-3 times the potential risk.

## Portfolio Management

### Asset Allocation
- Stocks: 60-70% for growth
- Bonds: 20-30% for stability
- Cash: 5-10% for opportunities

### Rebalancing
Regularly review and adjust your portfolio to maintain your desired risk level.

## Emotional Control

### Common Mistakes
- FOMO (Fear of Missing Out)
- Revenge trading after losses
- Holding losing positions too long
- Cutting winning positions too early

### Best Practices
- Stick to your trading plan
- Accept losses as part of trading
- Don't let emotions drive decisions
- Take breaks when needed

## Conclusion

Effective risk management is what separates successful traders from unsuccessful ones. Always prioritize capital preservation over profit maximization.`
  },
]

const MyNotesPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [showDialog, setShowDialog] = useState(false)
  const [notes, setNotes] = useState([])

  // Function to load notes
  const loadNotes = () => {
    // Load deleted default notes
    const deletedDefaultNotes = localStorage.getItem('deletedDefaultNotes')
    const parsedDeletedNotes = deletedDefaultNotes ? JSON.parse(deletedDefaultNotes) : []
    
    // Load saved notes from localStorage
    const savedNotes = localStorage.getItem('userNotes')
    const parsedSavedNotes = savedNotes ? JSON.parse(savedNotes) : []
    
    // Get IDs of saved default notes (default notes that have been edited/saved)
    const savedDefaultNoteIds = parsedSavedNotes
      .filter(saved => defaultNotes.find(defaultNote => defaultNote.id === saved.id))
      .map(saved => saved.id)
    
    // Filter out deleted default notes and default notes that have been saved (edited)
    const availableDefaultNotes = defaultNotes.filter(note => 
      !parsedDeletedNotes.includes(note.id) && !savedDefaultNoteIds.includes(note.id)
    )
    
    // Get saved default notes (edited default notes)
    const savedDefaultNotes = parsedSavedNotes.filter(saved => 
      defaultNotes.find(defaultNote => defaultNote.id === saved.id)
    )
    
    // Get user-created notes (not default notes)
    const userCreatedNotes = parsedSavedNotes.filter(saved => 
      !defaultNotes.find(defaultNote => defaultNote.id === saved.id)
    )
    
    // Combine: available default notes, saved default notes (edited), then user-created notes
    const allNotes = [...availableDefaultNotes, ...savedDefaultNotes, ...userCreatedNotes].sort((a, b) => {
      // Sort by date (newest first) for saved notes, keep defaults in their order
      if (a.id <= 2 && b.id <= 2) return a.id - b.id // Default notes keep original order
      if (a.id <= 2) return -1 // Default notes first
      if (b.id <= 2) return 1
      return new Date(b.date) - new Date(a.date) // Saved notes by date
    })
    
    setNotes(allNotes)
  }

  // Load notes from localStorage and combine with default notes
  useEffect(() => {
    if (!isActive) {
      setShowDialog(true)
    }

    loadNotes()
  }, [isActive, location.key]) // location.key ensures refresh when navigating back

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-text-primary-dark">
            ← Back
          </button>
          <h2 className="text-2xl font-bold font-orbitron">My Notes</h2>
        </div>
        {isActive && (
          <button
            onClick={() => navigate('/my-note-details')}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {showDialog && !isActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 relative">
          <button
            onClick={() => setShowDialog(false)}
            className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-blue-800 font-semibold text-sm">Account Deactivated</p>
              <p className="text-blue-700 text-sm mt-1">You can see only old notes which were shown before account deactivation. You can see new notes when you activate your account.</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate('/my-note-details', { state: { note } })}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-sm text-text-secondary-light mt-1">{note.preview}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-text-secondary-light">{note.date}</p>
                  {note.username && (
                    <>
                      <span className="text-xs text-text-secondary-light">•</span>
                      <p className="text-xs text-primary font-medium">
                        Uploaded by {note.username === user?.name ? 'You' : note.username}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyNotesPage


