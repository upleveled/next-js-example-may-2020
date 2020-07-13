// Create the users table
exports.up = async (sql) => {
  sql`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      password_hash VARCHAR(100) NOT NULL
    )
  `;
};

// Delete the users table
exports.down = async (sql) => {
  sql`
    DROP TABLE users
  `;
};
