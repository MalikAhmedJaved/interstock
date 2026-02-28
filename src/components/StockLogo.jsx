const stockConfigs = {
  AMD: { bg: '#00B386' },
  ABNB: { bg: '#FF5A5F' },
  AMZN: { bg: '#FF9900' },
  APPL: { bg: '#1C1C1E' },
  AAPL: { bg: '#1C1C1E' },
  APPS: { bg: '#E84466' },
  GOOGL: { bg: '#4285F4' },
  MSFT: { bg: '#00A4EF' },
  TSLA: { bg: '#CC0000' },
  AFRM: { bg: '#0FA0EA' },
}

// SVG icons for each stock brand
const StockIcon = ({ symbol, iconSize }) => {
  const s = iconSize

  switch (symbol) {
    // AMD - stylized triangle / arrow
    case 'AMD':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M12 4L3 20h6l3-5.5L15 20h6L12 4z" fill="white" />
        </svg>
      )

    // Airbnb - the iconic A-loop
    case 'ABNB':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C10.5 3 9.2 4 8.5 5.5C7.5 7.5 6 10 5 12.5C4.2 14.5 4 16 4.5 17.5C5 19 6.5 20.5 8.5 20.5C9.8 20.5 10.8 19.8 12 18.5C13.2 19.8 14.2 20.5 15.5 20.5C17.5 20.5 19 19 19.5 17.5C20 16 19.8 14.5 19 12.5C18 10 16.5 7.5 15.5 5.5C14.8 4 13.5 3 12 3ZM12 6C12.5 6 13.2 6.8 13.8 8C14.5 9.5 15.5 11.5 16.5 13.5C17 14.8 17.3 15.8 17 16.8C16.7 17.8 15.8 18.5 15.3 18.5C14.5 18.5 13.8 17.8 12.8 16.5L12 15.5L11.2 16.5C10.2 17.8 9.5 18.5 8.7 18.5C8.2 18.5 7.3 17.8 7 16.8C6.7 15.8 7 14.8 7.5 13.5C8.5 11.5 9.5 9.5 10.2 8C10.8 6.8 11.5 6 12 6Z"
            fill="white"
          />
        </svg>
      )

    // Amazon - arrow smile
    case 'AMZN':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M6 10C6 10 8 7 12 7C16 7 18 10 18 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 15C5 15 8 18 12 18C16 18 20 15 20 15L18 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    // Apple
    case 'APPL':
    case 'AAPL':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path
            d="M17.05 12.54C17.03 10.18 18.97 9.04 19.06 8.99C17.94 7.34 16.21 7.11 15.6 7.09C14.11 6.94 12.67 7.98 11.91 7.98C11.14 7.98 9.95 7.11 8.7 7.13C7.08 7.16 5.57 8.09 4.74 9.57C3.03 12.58 4.3 17.05 5.94 19.48C6.76 20.67 7.72 22.01 8.97 21.96C10.18 21.91 10.64 21.18 12.09 21.18C13.53 21.18 13.95 21.96 15.22 21.93C16.53 21.91 17.36 20.72 18.15 19.52C19.1 18.14 19.49 16.79 19.51 16.72C19.48 16.71 17.07 15.78 17.05 12.54Z"
            fill="white"
          />
          <path
            d="M14.73 5.52C15.4 4.7 15.85 3.58 15.72 2.45C14.76 2.49 13.58 3.1 12.88 3.9C12.26 4.61 11.72 5.77 11.87 6.86C12.95 6.94 14.05 6.32 14.73 5.52Z"
            fill="white"
          />
        </svg>
      )

    // Digital Turbine (APPS) - target/circle
    case 'APPS':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      )

    // Google - G
    case 'GOOGL':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.5 19 18.26 16.77 18.82 13.75H12.5V11H21.1C21.2 11.65 21.25 12.33 21.25 13C21.25 17.97 17.22 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.47 2 16.72 2.95 18.39 4.5L16.25 6.64C15.09 5.62 13.62 5 12 5Z"
            fill="white"
          />
        </svg>
      )

    // Microsoft - 4 squares
    case 'MSFT':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="7.5" height="7.5" fill="white" rx="1" />
          <rect x="12.5" y="4" width="7.5" height="7.5" fill="white" rx="1" />
          <rect x="4" y="12.5" width="7.5" height="7.5" fill="white" rx="1" />
          <rect x="12.5" y="12.5" width="7.5" height="7.5" fill="white" rx="1" />
        </svg>
      )

    // Tesla - T
    case 'TSLA':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M12 6L12 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 6C4 6 6 4 12 4C18 4 20 6 20 6" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )

    // Affirm - stylized 'a'
    case 'AFRM':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path
            d="M15.5 18V12.5C15.5 9.5 13.5 7 10.5 7C8.5 7 7 8 6 9.5"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
          />
          <circle cx="10.5" cy="13.5" r="4" stroke="white" strokeWidth="2.5" />
          <line x1="15.5" y1="7" x2="15.5" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    // Default - first letter
    default:
      return (
        <span className="font-bold" style={{ color: 'white', fontSize: s * 0.5 }}>
          {symbol?.[0] || '?'}
        </span>
      )
  }
}

const StockLogo = ({ symbol, size = 'md' }) => {
  const sizeClasses =
    size === 'lg' ? 'w-14 h-14' : size === 'md' ? 'w-12 h-12' : 'w-10 h-10'
  const iconSize = size === 'lg' ? 28 : size === 'md' ? 22 : 18

  const config = stockConfigs[symbol] || { bg: '#6B7280' }

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center shrink-0`}
      style={{ backgroundColor: config.bg }}
    >
      <StockIcon symbol={symbol} iconSize={iconSize} />
    </div>
  )
}

export default StockLogo
