import React, { useState, FormEvent } from 'react';
import Head from 'next/head';
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
        }
      })
      .catch(() => {
        setStatus('Failed logging in - request failed');
      });
  }

  return (
    <>
      <Head>
        <title>About</title>
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
