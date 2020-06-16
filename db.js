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

export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((user) => user.id === id);
}
