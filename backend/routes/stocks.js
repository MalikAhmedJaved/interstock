const express = require('express')
const router = express.Router()

// ─── Yahoo Finance public API base URLs ───
const YF_CHART = 'https://query1.finance.yahoo.com/v8/finance/chart'
const YF_SEARCH = 'https://query1.finance.yahoo.com/v1/finance/search'

// ─── In-memory cache to avoid hammering Yahoo Finance ───
const cache = new Map()
const CACHE_TTL = 60 * 1000 // 60 seconds

function getCached(key) {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data
  return null
}
function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() })
}

// ─── Default popular symbols shown on the listing page ───
const POPULAR_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
  'META', 'NVDA', 'AMD', 'NFLX', 'ABNB',
]

// User-Agent header to avoid 403s
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

// ─── Helper: fetch a single quote via Yahoo Finance chart API ───
async function fetchQuote(symbol) {
  const cacheKey = `quote_${symbol}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  try {
    const url = `${YF_CHART}/${encodeURIComponent(symbol)}?range=1d&interval=1d&includePrePost=false`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()
    const result = json.chart?.result?.[0]
    if (!result) return null

    const meta = result.meta
    const price = meta.regularMarketPrice ?? 0
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? 0
    const changeAmt = price - prevClose
    const changePct = prevClose > 0 ? (changeAmt / prevClose) * 100 : 0

    const indicators = result.indicators?.quote?.[0] || {}
    const timestamps = result.timestamp || []

    // Get today's OHLCV from the last bar
    const lastIdx = timestamps.length - 1
    const dayOpen = indicators.open?.[lastIdx] ?? meta.regularMarketOpen ?? 0
    const dayHigh = indicators.high?.[lastIdx] ?? meta.regularMarketDayHigh ?? 0
    const dayLow = indicators.low?.[lastIdx] ?? meta.regularMarketDayLow ?? 0
    const volume = indicators.volume?.[lastIdx] ?? meta.regularMarketVolume ?? 0

    const data = {
      symbol: meta.symbol || symbol,
      name: meta.shortName || meta.longName || symbol,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(Math.abs(changePct).toFixed(2)),
      changeAmount: parseFloat(changeAmt.toFixed(2)),
      isPositive: changePct >= 0,
      previousClose: parseFloat(prevClose.toFixed(2)),
      open: parseFloat(dayOpen.toFixed(2)),
      dayHigh: parseFloat(dayHigh.toFixed(2)),
      dayLow: parseFloat(dayLow.toFixed(2)),
      volume,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? 0,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? 0,
      currency: meta.currency || 'USD',
      exchange: meta.exchangeName || meta.fullExchangeName || '',
    }

    setCache(cacheKey, data)
    return data
  } catch (err) {
    console.error(`Error fetching quote for ${symbol}:`, err.message)
    return null
  }
}

// ──────────────────────────────────────────────────────────
// GET /api/stocks/quote/:symbol
// Fetch a single live stock quote
// ──────────────────────────────────────────────────────────
router.get('/quote/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase()
    const data = await fetchQuote(symbol)
    if (!data) {
      return res.status(404).json({ error: `No data found for symbol: ${symbol}` })
    }
    res.json(data)
  } catch (error) {
    console.error('Stock quote error:', error)
    res.status(500).json({ error: 'Failed to fetch stock quote' })
  }
})

// ──────────────────────────────────────────────────────────
// GET /api/stocks/quotes?symbols=AAPL,MSFT,GOOGL
// Fetch multiple live stock quotes at once
// ──────────────────────────────────────────────────────────
router.get('/quotes', async (req, res) => {
  try {
    const symbolsParam = req.query.symbols || POPULAR_SYMBOLS.join(',')
    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)

    const results = await Promise.all(symbols.map(fetchQuote))
    const quotes = results.filter(Boolean)

    res.json(quotes)
  } catch (error) {
    console.error('Stock quotes error:', error)
    res.status(500).json({ error: 'Failed to fetch stock quotes' })
  }
})

// ──────────────────────────────────────────────────────────
// GET /api/stocks/trending
// Return popular/trending stocks with live prices
// ──────────────────────────────────────────────────────────
router.get('/trending', async (req, res) => {
  try {
    const cacheKey = 'trending'
    const cached = getCached(cacheKey)
    if (cached) return res.json(cached)

    const results = await Promise.all(POPULAR_SYMBOLS.map(fetchQuote))
    const trending = results.filter(Boolean)

    setCache(cacheKey, trending)
    res.json(trending)
  } catch (error) {
    console.error('Trending stocks error:', error)
    res.status(500).json({ error: 'Failed to fetch trending stocks' })
  }
})

// ──────────────────────────────────────────────────────────
// GET /api/stocks/search?q=apple
// Search for stocks by name or symbol
// ──────────────────────────────────────────────────────────
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q
    if (!query || query.trim().length === 0) {
      return res.json([])
    }

    const cacheKey = `search_${query.toLowerCase()}`
    const cached = getCached(cacheKey)
    if (cached) return res.json(cached)

    const url = `${YF_SEARCH}?q=${encodeURIComponent(query)}&quotesCount=10&newsCount=0&listsCount=0`
    const searchRes = await fetch(url, { headers: HEADERS })
    if (!searchRes.ok) throw new Error(`Search HTTP ${searchRes.status}`)

    const json = await searchRes.json()
    const stocks = (json.quotes || [])
      .filter(q => q.quoteType === 'EQUITY' && q.symbol)
      .map(q => ({
        symbol: q.symbol,
        name: q.shortname || q.longname || q.symbol,
        exchange: q.exchDisp || q.exchange || '',
      }))

    // Fetch live prices for search results (top 8)
    const topSymbols = stocks.slice(0, 8)
    const quotesData = await Promise.all(topSymbols.map(s => fetchQuote(s.symbol)))
    const enriched = topSymbols.map((s, i) => {
      const q = quotesData[i]
      return q ? { ...s, ...q } : s
    })

    setCache(cacheKey, enriched)
    res.json(enriched)
  } catch (error) {
    console.error('Stock search error:', error)
    res.status(500).json({ error: 'Failed to search stocks' })
  }
})

// ──────────────────────────────────────────────────────────
// GET /api/stocks/history/:symbol?range=1mo&interval=1d
// Fetch historical price data for charts
//
// range:    1d, 5d, 1mo, 3mo, 6mo, 1y, 5y, max
// interval: 1m, 5m, 15m, 30m, 1h, 1d, 1wk, 1mo
// ──────────────────────────────────────────────────────────
router.get('/history/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase()
    const range = req.query.range || '1mo'
    const interval = req.query.interval || getDefaultInterval(range)

    const cacheKey = `history_${symbol}_${range}_${interval}`
    const cached = getCached(cacheKey)
    if (cached) return res.json(cached)

    const url = `${YF_CHART}/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&includePrePost=false`
    const chartRes = await fetch(url, { headers: HEADERS })
    if (!chartRes.ok) throw new Error(`Chart HTTP ${chartRes.status}`)

    const json = await chartRes.json()
    const result = json.chart?.result?.[0]
    if (!result) {
      return res.status(404).json({ error: 'No chart data found' })
    }

    const timestamps = result.timestamp || []
    const indicators = result.indicators?.quote?.[0] || {}
    const meta = result.meta

    const quotes = timestamps.map((ts, i) => {
      const close = indicators.close?.[i]
      if (close == null) return null
      return {
        time: new Date(ts * 1000).toISOString(),
        price: parseFloat(close.toFixed(2)),
        open: indicators.open?.[i] != null ? parseFloat(indicators.open[i].toFixed(2)) : null,
        high: indicators.high?.[i] != null ? parseFloat(indicators.high[i].toFixed(2)) : null,
        low: indicators.low?.[i] != null ? parseFloat(indicators.low[i].toFixed(2)) : null,
        volume: indicators.volume?.[i] ?? 0,
      }
    }).filter(Boolean)

    const data = {
      symbol,
      range,
      interval,
      currency: meta?.currency || 'USD',
      previousClose: meta?.chartPreviousClose ?? 0,
      quotes,
    }

    setCache(cacheKey, data)
    res.json(data)
  } catch (error) {
    console.error('Stock history error:', error)
    res.status(500).json({ error: 'Failed to fetch stock history' })
  }
})

// ─── Helpers ─────────────────────────────────────────────

function getDefaultInterval(range) {
  const map = {
    '1d': '5m',
    '5d': '15m',
    '1mo': '1d',
    '3mo': '1d',
    '6mo': '1d',
    '1y': '1wk',
    '5y': '1mo',
    'max': '1mo',
  }
  return map[range] || '1d'
}

module.exports = router
