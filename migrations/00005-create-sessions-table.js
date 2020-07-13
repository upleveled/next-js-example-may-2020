// Create the sessions table
exports.up = async (sql) => {
  sql`
    CREATE TABLE sessions(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(32) NOT NULL
    )
  `;
};

// Delete the sessions table
exports.down = async (sql) => {
  sql`
    DROP TABLE sessions
  `;
};
