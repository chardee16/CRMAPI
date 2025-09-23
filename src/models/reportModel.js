import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';


const getHousingComputationAllQuery = loadSQL('getHousingComputationAll.sql');
export const getHousingComputationAll = async () => {

  const [rows] = await db.query(getHousingComputationAllQuery);
  return rows;
};

