// utils/loadSQL.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSQL = (filename) => {
  return fs.readFileSync(path.join(__dirname, '..', 'queries', filename), 'utf8');
};