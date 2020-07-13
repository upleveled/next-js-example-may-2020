// Insert products into database
exports.up = async (sql) => {
  await sql`
    INSERT INTO products (name) VALUES
      ('Handtuch')
  `;
};

// Remove products from database
exports.down = async (sql) => {
  await sql`
    DELETE FROM products
      WHERE name IN ('Handtuch')
  `;
};
