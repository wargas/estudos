import '../styles/globals.css';
import '../styles/app.scss';
import Head from 'next/head';
import Layout from '../components/layout';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    document.body.setAttribute('data-ma-theme', 'teal')
  }, [])

  return (
    <>
      <Head>
        <title>APP</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </>
  )
}

export default MyApp
