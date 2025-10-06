import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';

// READ ONE
export const getClientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM questions WHERE id = ?', [id]);
  return rows[0];
};