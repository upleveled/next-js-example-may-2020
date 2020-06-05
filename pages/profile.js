import React from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
import Header from '../components/Header';

/**
 * @typedef {{
 *   user: string,
 * }} Props
 */

const Profile = (/** @type {Props} */ props) => {
  return (
    <div className="container">
      <Head>
        <title>Profile page</title>
      </Head>

      <Header />

      <main>
        <h1>{props.user || 'Please login'}</h1>
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

export default Profile;

// getServerSideProps will ONLY be run on the server, so
// you can write code here that is "secret" - eg. passwords,
// database connection information, etc.
export function getServerSideProps(context) {
  // You can also do this with vanilla
  // JavaScript using the complicated
  // document.cookie API:
  //
  // const userMatches = context.req.headers.cookie.match(/user=([^;]+)/);
  // let user = null;
  // if (userMatches && userMatches.length > 0) { user = userMatches[1]; }

  // The line below is the same as writing this line:
  // const user = nextCookies(context).user;
  const { user } = nextCookies(context);

  return {
    // will be passed to the page component as props
    props: {
      // This is a shorthand for the line below
      // user,
      ...(user ? { user: user } : undefined),
    },
  };
}
