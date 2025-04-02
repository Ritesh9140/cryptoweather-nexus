import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../store/notificationSlice'

// Simulate weather alerts by dispatching a notification every 90 seconds.
export default function useWeatherAlerts() {
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      const alert = {
        type: 'weather_alert',
        message: 'Severe weather alert in New York!',
      }
      dispatch(addNotification(alert))
    }, 90000)

    return () => clearInterval(interval)
  }, [dispatch])
}
