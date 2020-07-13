// Create the users table
exports.up = async (sql) => {
  await sql`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      password_hash VARCHAR(100) NOT NULL
    )
  `;
};

// Delete the users table
exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
