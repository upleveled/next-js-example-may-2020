const argon2 = require('argon2');

export async function hashPassword(password: string) {
  return argon2.hash(password);
}

export async function verifyHashMatchesPassword(
  passwordHash: string,
  password: string,
) {
  return argon2.verify(passwordHash, password);
}
