import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { GetServerSidePropsContext } from 'next';

export default function Logout() {
  return (
    <div>
      <Header />
      <Head>
        <title>Logged out</title>
      </Head>
      Successfully Logged Out
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');
  const nextCookies = (await import('next-cookies')).default;
  const { deleteSessionByToken } = await import('../db');

  const { token } = nextCookies(context);
  await deleteSessionByToken(token);

  // Remove the cookie
  context.res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
