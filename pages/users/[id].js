import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import { getUserById } from '../../db';

const User = (props) => {
  if (!props.user) return <div>User not found!</div>;

  return (
    <div className="container">
      <Head>
        <title>
          {props.user.id} {props.user.name}
        </title>
      </Head>

      <Header />

      <main>
        <h1>{props.user.name}</h1>

        <p>id: {props.user.id}</p>

        <p>{props.user.role === 'admin' ? props.user.role : ''}</p>

        <pre>{JSON.stringify(props, null, 2)}</pre>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default User;

// getServerSideProps will ONLY be run on the server, so
// you can write code here that is "secret" - eg. passwords,
// database connection information, etc.
export function getServerSideProps(context) {
  console.log('server-side context', context.params.id);

  const user = getUserById(context.params.id);

  if (user === undefined) {
    return { props: {} };
  }

  return {
    // will be passed to the page component as props
    props: {
      user,
    },
  };
}
