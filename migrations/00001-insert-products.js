// Insert products into database
exports.up = async (sql) => {
  await sql`
    INSERT INTO products (name) VALUES
      ('T-Shirt'),
      ('Coffee Cup'),
      ('Screen Cleaner'),
      ('Umbrella')
  `;
};

// Remove products from database
exports.down = async (sql) => {
  await sql`
    DELETE FROM products
      WHERE name IN ('T-Shirt', 'Coffee Cup', 'Screen Cleaner', 'Umbrella')
  `;
};
