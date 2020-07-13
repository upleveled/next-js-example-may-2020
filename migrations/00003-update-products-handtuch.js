// Update product name
exports.up = async (sql) => {
  await sql`
    UPDATE products
      SET name = 'Handtuchz'
      WHERE name = 'Handtuch'
  `;
};

// Roll back product name update
exports.down = async (sql) => {
  await sql`
    UPDATE products
      SET name = 'Handtuch'
      WHERE name = 'Handtuchz'
  `;
};
