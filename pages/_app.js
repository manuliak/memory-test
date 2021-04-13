import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss'
import AppLayout from '../components/AppLayout'
import { TestState } from '../context/test/TestState'

function MyApp({ Component, pageProps }) {
  return (
    <TestState>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </TestState>
  )
}

export default MyApp
