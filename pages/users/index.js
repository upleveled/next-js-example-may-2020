import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import { getUsers } from '../../db';

// Beware: this will only work as long as you are importing from
// another file and not doing some REAL database queries or anything
// else that needs to run ONLY on the server.
//
// As soon as you need a real database, you will need to use
// something like getServerSideProps or getStaticProps
//
// https://nextjs.org/docs/basic-features/data-fetching
const usersList = getUsers();

const Users = () => (
  <div className="container">
    <Head>
      <title>Users</title>
    </Head>

    <Header />

    <main>
      <h1>Users</h1>

      <ul>
        {usersList.map(({ id, name }) => (
          <li key={`usersList-${id}`}>
            <Link href="/users/[id]" as={'/users/' + id}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
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

export default Users;
