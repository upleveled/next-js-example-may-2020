// Create the products table
exports.up = async (sql) => {
  sql`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL
    )
  `;
};

// Delete the products table
exports.down = async (sql) => {
  sql`
    DROP TABLE products
  `;
};
