import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCryptoPrice } from '../store/cryptoSlice'

// Establish a WebSocket connection to CoinCap for live crypto price updates.
export default function useCryptoWebSocket() {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum')
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      // Dispatch an action to update the crypto prices.
      dispatch(updateCryptoPrice(data))
    }

    socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    return () => socket.close()
  }, [dispatch])
}
