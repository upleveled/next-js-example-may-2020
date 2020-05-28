import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function login() {
  const newUser = 'Karl';
  document.cookie = `user=${newUser}`;

  // Below we refresh the page using
  // window.location.reload() in order
  // to re-read the cookies everywhere
  // that is using them.
  //
  // Another way of doing this would be to
  // set a state variable in order to
  // tell React to re-render this component
  // (so that the Login button changes to a
  // Logout button). However, this approach
  // with a state variable doesn't work if
  // you need to re-render more than just
  // this component.
  window.location.reload();
}

function logout() {
  document.cookie = 'user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';

  // Below we refresh the page using
  // window.location.reload() in order
  // to re-read the cookies everywhere
  // that is using them.
  //
  // Another way of doing this would be to
  // set a state variable in order to
  // tell React to re-render this component
  // (so that the Login button changes to a
  // Logout button). However, this approach
  // with a state variable doesn't work if
  // you need to re-render more than just
  // this component.
  window.location.reload();
}

export default function Header() {
  const linkList = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Products', url: '/products' },
    { name: 'Users', url: '/users' },
    { name: 'Profile', url: '/profile' },
  ];

  const inTheBrowser = typeof window !== 'undefined';
  const lastUsersVisited = inTheBrowser
    ? JSON.parse(window.localStorage.getItem('lastUsersVisited'))
    : [];

  const user = inTheBrowser ? document.cookie.match(/user=[^;]+/) : null;

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div>
          {linkList.map((link) => {
            return (
              <Link key={link.url} href={link.url}>
                <a style={{ margin: '0 10px' }}>{link.name}</a>
              </Link>
            );
          })}
        </div>

        {/* ["3","2","1","3"] */}
        <div>
          <div>
            {inTheBrowser ? (
              user === null ? (
                <button onClick={login}>Login</button>
              ) : (
                <button onClick={logout}>Logout</button>
              )
            ) : null}
          </div>

          {lastUsersVisited.map((userId, index) => {
            return (
              <React.Fragment key={`lastUsersVisited-${userId}-${index}`}>
                <Link href="/users/[id]" as={'/users/' + userId}>
                  <a>{userId}</a>
                </Link>{' '}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
        }

        .container > :last-child {
          margin-left: auto;
          display: flex;
        }

        .container > :last-child > :first-child {
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
}
