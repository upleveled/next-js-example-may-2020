// Insert products into database
exports.up = async (sql) => {
  sql`
    INSERT INTO products (name) VALUES
      ('Handtuch')
  `;
};

// Remove products from database
exports.down = async (sql) => {
  sql`
    DELETE FROM products
      WHERE name IN ('Handtuch')
  `;
};
