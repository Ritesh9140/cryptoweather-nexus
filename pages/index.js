import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../store/weatherSlice'
import { fetchCrypto } from '../store/cryptoSlice'
import { fetchNews } from '../store/newsSlice'
import Link from 'next/link'
import useCryptoWebSocket from '../hooks/useCryptoWebSocket'
import useWeatherAlerts from '../hooks/useWeatherAlerts'

export default function Dashboard() {
  const dispatch = useDispatch()
  const weather = useSelector(state => state.weather)
  const crypto = useSelector(state => state.crypto)
  const news = useSelector(state => state.news)

  // Initialize WebSocket for crypto price updates
  useCryptoWebSocket()
  // Initialize simulated weather alerts
  useWeatherAlerts()

  useEffect(() => {
    dispatch(fetchWeather())
    dispatch(fetchCrypto())
    dispatch(fetchNews())

    // Poll data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchWeather())
      dispatch(fetchCrypto())
      dispatch(fetchNews())
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CryptoWeather Nexus Dashboard</h1>

      {/* Weather Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Weather</h2>
        {weather.loading ? (
          <p>Loading weather data...</p>
        ) : weather.error ? (
          <p>Error: {weather.error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weather.data.map((cityData, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{cityData.name}</h3>
                <p>Temp: {cityData.main?.temp} °C</p>
                <p>Humidity: {cityData.main?.humidity}%</p>
                <p>Condition: {cityData.weather?.[0]?.description}</p>
                <Link 
                  href={`/city/${cityData.name}`} 
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cryptocurrency Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Cryptocurrency</h2>
        {crypto.loading ? (
          <p>Loading crypto data...</p>
        ) : crypto.error ? (
          <p>Error: {crypto.error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crypto.data.map((coin, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="text-xl font-bold capitalize">{coin.id}</h3>
                <p>Price: ${coin.market_data?.current_price?.usd}</p>
                <p>24h Change: {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%</p>
                <p>Market Cap: ${coin.market_data?.market_cap?.usd}</p>
                <Link 
                  href={`/crypto/${coin.id}`} 
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Crypto News</h2>
        {news.loading ? (
          <p>Loading news...</p>
        ) : news.error ? (
          <p>Error: {news.error}</p>
        ) : (
          <ul className="list-disc pl-5">
            {news.data.map((article, index) => (
              <li key={index}>
                <a href={article.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
