import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store'
import NotificationToast from '../components/NotificationToast'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <NotificationToast />
    </Provider>
  )
}

export default MyApp
