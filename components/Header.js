import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import cookies from 'js-cookie';

function login() {
  const user = 'Karl';

  // You can also do this with vanilla
  // JavaScript using the complicated
  // document.cookie API:
  //
  // document.cookie = `user=${user}`;
  cookies.set('user', user);

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
  // You can also do this with vanilla
  // JavaScript using the complicated
  // document.cookie API:
  //
  // document.cookie = 'user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  cookies.remove('user');

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

  // You can also do this with vanilla
  // JavaScript using the complicated
  // document.cookie API:
  //
  // document.cookie.match(/user=[^;]+/)
  const user = cookies.get('user');

  let loginLogoutButton = null;

  if (inTheBrowser) {
    if (user) {
      loginLogoutButton = <button onClick={logout}>Logout</button>;
    } else {
      loginLogoutButton = <button onClick={login}>Login</button>;
    }
  }

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
          <div>{loginLogoutButton}</div>

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
