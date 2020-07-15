require('./extractHerokuDatabaseEnvVars')();
require('dotenv').config();

const postgres = require('postgres');

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

// const products = [
//   { id: '1', name: 'T-Shirt' },
//   { id: '2', name: 'Coffee Cup' },
//   { id: '3', name: 'Screen Cleaner' },
//   { id: '4', name: 'Umbrella' },
// ];

const users = [
  { id: '1', name: 'Hamed', role: 'admin' },
  { id: '2', name: 'Kriz', role: 'user' },
  { id: '3', name: 'Alena', role: 'admin' },
  { id: '4', name: 'Gaby', role: 'user' },
];

export async function getProducts() {
  const products = await sql`
    SELECT * FROM products
  `;
  return products;
}

export async function updateProductNameById(id, name) {
  const product = await sql`
    UPDATE products
      SET name = ${name}
      WHERE id = ${id}
  `;
  return product;
}

export async function deleteProductById(id) {
  const product = await sql`
    DELETE FROM products WHERE id = ${id}
  `;
  return product;
}

// These are incompatible with the new
// authentication users below
export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((user) => user.id === id);
}

// These are incompatible with the old
// users above
export async function selectUserByUsername(username) {
  return sql`
    SELECT * FROM users WHERE username = ${username}
  `;
}

export async function insertUser(username, passwordHash) {
  return sql`
    INSERT INTO users (username, password_hash) VALUES (${username}, ${passwordHash})
  `;
}

export async function selectSessionByToken(token) {
  return sql`
    SELECT * FROM sessions WHERE token = ${token} AND expiry_timestamp >= NOW()
  `;
}

export async function insertSession(userId, token) {
  // Remove expired sessions
  await sql`DELETE FROM sessions WHERE expiry_timestamp < NOW()`;
  return sql`
    INSERT INTO sessions (user_id, token) VALUES (${userId}, ${token})
  `;
}

export async function deleteSessionByToken(token) {
  return sql`
    DELETE FROM sessions WHERE token = ${token}
  `;
}
