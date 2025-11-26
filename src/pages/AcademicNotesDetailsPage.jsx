import { useNavigate } from 'react-router-dom'
import { FileText, Calendar, BookOpen } from 'lucide-react'
import Button from '../components/Button'

const AcademicNotesDetailsPage = () => {
  const navigate = useNavigate()

  // Mock data - in a real app, this would come from route params or state
  const note = {
    id: 1,
    title: 'Introduction to Stocks',
    subject: 'Finance',
    date: '2024-01-15',
    content: `# Introduction to Stocks

## What are Stocks?

Stocks represent ownership shares in a company. When you buy a stock, you become a shareholder and own a small portion of that company.

## Key Concepts

### 1. Stock Market
The stock market is where stocks are bought and sold. Major exchanges include:
- New York Stock Exchange (NYSE)
- NASDAQ
- London Stock Exchange (LSE)

### 2. Stock Price
The price of a stock is determined by supply and demand. Factors affecting price include:
- Company performance
- Market conditions
- Economic indicators
- Investor sentiment

### 3. Types of Stocks
- **Common Stocks**: Give voting rights and potential dividends
- **Preferred Stocks**: Priority in dividends but usually no voting rights

## Investment Strategies

1. **Long-term Investing**: Buy and hold stocks for extended periods
2. **Day Trading**: Buy and sell stocks within the same day
3. **Value Investing**: Focus on undervalued stocks
4. **Growth Investing**: Focus on companies with high growth potential

## Risk Management

Always remember:
- Never invest more than you can afford to lose
- Diversify your portfolio
- Do thorough research before investing
- Consider your risk tolerance

## Conclusion

Understanding stocks is fundamental to successful investing. Continue learning and practicing with simulated trading before investing real money.`
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Note Details</h2>
      </div>

      <div className="card p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="text-primary" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold">{note.title}</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-text-secondary-light">
                <BookOpen size={16} />
                <span className="text-sm">{note.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary-light">
                <Calendar size={16} />
                <span className="text-sm">{note.date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-text-primary-dark leading-relaxed">
              {note.content}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
            Back to Notes
          </Button>
          <Button className="flex-1" onClick={() => alert('Edit functionality coming soon!')}>
            Edit Note
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AcademicNotesDetailsPage


