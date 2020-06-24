import crypto from 'crypto';
import { serialize } from 'cookie';
import { selectUserByUsername, insertSession } from '../../db';
import { hashPassword, verifyHashMatchesPassword } from '../../hashing';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // TODO: To secure your application even further,
  // accept a CSRF token here and verify it
  // (see pages/register.tsx)

  const username = req.body.username;
  const password = req.body.password;
  const users = await selectUserByUsername(username);

  if (users.length === 0) {
    console.log('denied login - zero users with that username');
    res.json({ loggedIn: false });
    return;
  }

  if (!(await verifyHashMatchesPassword(users[0].password_hash, password))) {
    console.log("denied login - password doesn't match");
    res.json({ loggedIn: false });
    return;
  }

  console.log('logged in');

  const maxAge = 60 * 60 * 8; // 8 hours
  const token = crypto.randomBytes(24).toString('base64');

  await insertSession(users[0].id, token);

  const cookie = serialize('token', token, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production
    secure: process.env.NODE_ENV === 'production',

    path: '/',
    sameSite: 'lax',
  });

  // TODO: In order to prevent your database
  // from overflowing with sessions, you should
  // remove the old sessions here.

  res.setHeader('Set-Cookie', cookie);

  res.json({ loggedIn: true });
}
