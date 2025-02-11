import { SessionProvider } from 'next-auth/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/assets/css/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp