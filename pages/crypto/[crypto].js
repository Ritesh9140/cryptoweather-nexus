import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CryptoDetails() {
  const router = useRouter()
  const { crypto } = router.query
  const [coinData, setCoinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!crypto) return
    const fetchCoinData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`)
        const data = await res.json()
        setCoinData(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchCoinData()
  }, [crypto])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Crypto Details for {crypto}</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="border p-4 rounded">
          <h2 className="text-2xl font-bold">{coinData.name}</h2>
          <p>Current Price: ${coinData.market_data?.current_price?.usd}</p>
          <p>24h Change: {coinData.market_data?.price_change_percentage_24h?.toFixed(2)}%</p>
          <p>Market Cap: ${coinData.market_data?.market_cap?.usd}</p>
          {/* Additional historical data or extended metrics can be added here */}
        </div>
      )}
    </div>
  )
}
