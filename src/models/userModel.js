import db from '../../db.js'; // your mysql2 pool

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (email, hashedPassword) => {
  const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  return result.insertId;
};