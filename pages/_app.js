import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss'
import AppLayout from '../components/AppLayout'

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
