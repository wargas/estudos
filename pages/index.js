import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'antd';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/disciplinas">
        <Button type="primary">Disciplinas</Button>
      </Link>

    </div>
  )
}
