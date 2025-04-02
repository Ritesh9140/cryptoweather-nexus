import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../store/notificationSlice'
import { useEffect } from 'react'

export default function NotificationToast() {
  const notifications = useSelector(state => state.notification.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(0))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notifications, dispatch])

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((note, index) => (
        <div key={index} className="bg-blue-500 text-white p-4 rounded shadow">
          <p>{note.message}</p>
        </div>
      ))}
    </div>
  )
}
