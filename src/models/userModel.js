import db from '../../db.js'; // your mysql2 pool
import bcrypt from 'bcryptjs';

// export const findUserByEmail = async (username) => {
//   console.log(username);
//   const [rows] = await db.query('SELECT * FROM users WHERE Username = ?', [username]);
//   return rows[0];
// };

export const findUserByUsername = async (username) => {
  const [rows] = await db.query(
    `SELECT 
        u.UserID,
        u.Username,
        u.Password, 
        u.IsAdmin,
        MAX(CASE WHEN s.StaticID = 1 THEN s.StaticValue END) AS MinimumBill,
        MAX(CASE WHEN s.StaticID = 2 THEN s.StaticValue END) AS MinimumConsumption,
        MAX(CASE WHEN s.StaticID = 3 THEN s.StaticValue END) AS FirstExcess,
        MAX(CASE WHEN s.StaticID = 4 THEN s.StaticValue END) AS SecondExcess,
        MAX(CASE WHEN s.StaticID = 5 THEN s.StaticValue END) AS ThirdExcess,
        MAX(CASE WHEN s.StaticID = 6 THEN s.StaticValue END) AS LastExcess,
        u.IsTeller,
        IFNULL(u.AccountCodeCASH, 0) AS AccountCodeCASH,
		    IFNULL(u.AccountCodeCOCI, 0) AS AccountCodeCOCI
     FROM users u
     LEFT JOIN tblStatic s ON s.StaticID IN (1, 2, 3, 4, 5, 6)
     WHERE u.Username = ? AND u.IsActive = 1
     GROUP BY u.UserID,
              u.Username,
              u.IsAdmin,
              u.Password,
              u.IsTeller,
              u.AccountCodeCASH,
              u.AccountCodeCOCI`,
    [username]
  );
  return rows[0]; // one user
};



// export const createUser = async (email, hashedPassword) => {
//   const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
//   return result.insertId;
// };

// CREATE
export const createUser = async (user) => {

    const {
    Username,
    Password,
    FirstName,
    MiddleName,
    LastName,
    IsActive,
    IsAdmin,
    IsReset
  } = user;


  const saltRounds = 10; // higher = slower but more secure
  const hashedPassword = await bcrypt.hash(Password, saltRounds);

  const [result] = await db.query(`
    INSERT INTO users (
      Username,
      Password,
      Firstname,
      Middlename,
      Lastname,
      IsActive,
      IsAdmin,
      IsReset
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      Username,
      hashedPassword,
      FirstName,
      MiddleName,
      LastName,
      IsActive ? 1 : 0,
      IsAdmin ? 1 : 0,
      IsReset ? 1 : 0
    ]
  );

  return result.insertId;

  
};




export const getAllUsers = async () => {
  const [rows] = await db.query(`
      Select
      UserID,
      Username,
      Password,
      Firstname,
      Middlename,
      Lastname,
      IsAdmin,
      CONCAT_WS(' ', Firstname, Middlename, Lastname) AS FullName
    from users
    `);
  return rows;
};