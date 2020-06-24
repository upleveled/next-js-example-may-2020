import React, { useState, FormEvent } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import nextCookies from 'next-cookies';
import Header from '../components/Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: To secure your application even further,
    // generate and use a CSRF token and pass it along
    // with the fetch to be verified server-side
    // (see pages/register.tsx)
    fetch('/api/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok !== true) {
          setStatus('Failed logging in - response is not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.loggedIn === false) {
          setStatus('Failed logging in - check username and password');
        } else {
          setStatus('Logged in!!');
          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            Router.replace('/');
          }, 2000);
        }
      })
      .catch(() => {
        setStatus('Failed logging in - request failed');
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Header />

      <h1>Login</h1>

      <form method="POST" onSubmit={onSubmit}>
        <input
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
      {status}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect to homepage right away if logged in already
  if (nextCookies(context).token) {
    context.res.setHeader('location', '/');
    context.res.statusCode = 302;
    context.res.end();
  }

  return {
    props: {},
  };
}
