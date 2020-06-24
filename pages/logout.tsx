import React, { useState } from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
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
  // TODO: best practice would be to also
  // delete the cookie using an API route
  // such as /pages/api/logout.ts
  const { deleteSessionByToken } = await import('../db');
  const { token } = nextCookies(context);
  await deleteSessionByToken(token);

  return {
    props: {},
  };
}
