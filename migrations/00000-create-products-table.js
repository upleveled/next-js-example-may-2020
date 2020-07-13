// Create the products table
exports.up = async (sql) => {
  await sql`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `;
};

// Delete the products table
exports.down = async (sql) => {
  await sql`
    DROP TABLE products
  `;
};
