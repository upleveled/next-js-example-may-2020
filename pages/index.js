import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
    </Head>

    <Header />

    <main>
      <h1 className="title">Welcome to Next.js!</h1>

      <div className="grid">
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
