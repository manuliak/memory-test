import Head from 'next/head'
import MemoryTest from '../components/MemoryTest'

export default function Home() {
  return (
    <div className="home">
      <Head>
        <title>Memory test</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="home__content">
        <MemoryTest />
      </div>
    </div>
  )
}
