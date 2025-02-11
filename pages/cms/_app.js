import { SessionProvider } from 'next-auth/react'
import 'bootstrap/dist/css/bootstrap.min.css'

function CMSApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default CMSApp