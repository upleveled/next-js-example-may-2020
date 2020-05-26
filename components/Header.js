import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Header() {
  const linkList = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Products', url: '/products' },
    { name: 'Users', url: '/users' },
  ];

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {linkList.map((link) => {
          return (
            <Link key={link.url} href={link.url}>
              <a style={{ margin: '0 10px' }}>{link.name}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
