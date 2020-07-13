// Create the sessions table
exports.up = async (sql) => {
  await sql`
    CREATE TABLE sessions(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(32) NOT NULL
    )
  `;
};

// Delete the sessions table
exports.down = async (sql) => {
  await sql`
    DROP TABLE sessions
  `;
};
