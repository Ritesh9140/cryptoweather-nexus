import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CityDetails() {
  const router = useRouter()
  const { city } = router.query
  const [historyData, setHistoryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!city) return
    const fetchHistory = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        // Using the forecast endpoint as an example for historical data.
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        const data = await res.json()
        setHistoryData(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchHistory()
  }, [city])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Details for {city}</h1>
      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {historyData.list.map((entry, index) => (
            <div key={index} className="border p-2 my-2">
              <p>{entry.dt_txt}</p>
              <p>Temp: {entry.main.temp} °C</p>
              <p>Condition: {entry.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
