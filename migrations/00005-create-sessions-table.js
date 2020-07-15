// Create the sessions table
exports.up = async (sql) => {
  await sql`
    CREATE TABLE sessions(
      id SERIAL PRIMARY KEY,
      expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      token VARCHAR(32) UNIQUE NOT NULL,
      user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
};

// Delete the sessions table
exports.down = async (sql) => {
  await sql`
    DROP TABLE sessions
  `;
};
