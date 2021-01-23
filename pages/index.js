import Head from 'next/head'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Go to {''}
          <Link href="/test/jobs">
          <a>Job List</a>
          </Link>
        </h1>
      </main>
    </div>
  )
}
