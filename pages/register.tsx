import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

type Props = {
  csrfToken: string;
};

export default function Register(props: Props) {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Header />

      <h1>Register</h1>

      <form method="POST">
        <input name="username" />
        <input name="password" type="password" />
        <input type="hidden" name="csrf" value={props.csrfToken} />
        <button>Register</button>
      </form>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // TODO: Do this in an API Route instead!
  //
  // This also helps to avoid all of the buffer code
  // and the query-string dependency below!

  const queryString = await import('query-string');
  const { insertUser } = await import('../db');
  const { hashPassword } = await import('../hashing');

  const Tokens = (await import('csrf')).default;
  const tokens = new Tokens();

  const secret = process.env.CSRF_TOKEN;
  if (typeof secret !== 'string') {
    throw new Error('Token secret misconfigured!');
  }

  let buffer = '';

  context.req.on('data', (chunk) => {
    buffer += chunk;
  });

  context.req.on('end', async () => {
    const body = queryString.parse(Buffer.from(buffer).toString());

    if (
      typeof body.username !== 'string' ||
      typeof body.password !== 'string'
    ) {
      console.log('No username or password passed in body');
      return;
    }

    const username = body.username;
    const passwordHash = await hashPassword(body.password);

    const requestToken = body.csrf;

    if (typeof requestToken !== 'string') {
      throw new Error('No CSRF token passed!');
    }

    if (tokens.verify(secret, requestToken)) {
      // console.log(user);
      insertUser(username, passwordHash)
        .then(() => console.log('succeeded'))
        .catch((err) => console.error("didn't work", err));
    } else {
      console.error('CSRF token not valid!!');
    }
  });

  const props: Props = {
    csrfToken: tokens.create(secret),
  };

  return {
    props,
  };
}
