import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Notification from '../components/UI/notification'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Notification
        title="Test"
        message="This is a test"
        status="success"
      />
    </Layout>
  )
}

export default MyApp