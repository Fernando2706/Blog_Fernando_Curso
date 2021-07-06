import Head from 'next/head'

import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Head>
      <title>Fernandpp Blog</title>
      <meta name='description'/>
      <meta name='viewport' content='width=device-width, initial-scale'/>
    </Head>
    <Component {...pageProps} /></Layout>
}

export default MyApp
