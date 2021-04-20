import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss'

import AppLayout from '../components/AppLayout'
import { TestState } from '../context/TestContext'
import { AuthState } from '../context/AuthContext'

import '../translations/i18n';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <TestState>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </TestState>
    </AuthState>
  )
}

export default MyApp
