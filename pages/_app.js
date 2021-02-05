import '../styles/globals.css';
import '../styles/app.scss';
import Head from 'next/head';
import Layout from './components/layout';

function MyApp({ Component, pageProps }) {
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
