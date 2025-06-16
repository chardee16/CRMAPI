//import mysql from 'mysql2';
import db from '../../db.js';

// Insert
export const insertPayment = async (payment) => {
  const {
    clientId,
    amount,
    type,
    homeowners,
    guests,
    date,
    ispaid
  } = payment;

  // const [result] = await db.query(`
  //   INSERT INTO payments (clientId, amount, type,homeowner,guest, date,ispaid) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  //   [
  //     clientId, amount, type, homeowners, guests, new Date(date), ispaid
  //   ]
  // );
  const sqlQuery = `INSERT INTO payments 
                      (
                          clientId, 
                          amount, 
                          type,
                          homeowner,
                          guest, 
                          date,
                          ispaid
                      ) VALUES 
                      (?, ?, ?, ?, ?, ?, ?)`;

  const params = [clientId, amount, type, homeowners, guests, new Date(date), ispaid];

  //const fullQuery = mysql.format(sqlQuery, params);
  //console.log('Formatted SQL Query:', fullQuery);

  const [result] = await db.query(sqlQuery, params);



  return result.insertId;
};



// READ ONE
export const getPaymentById = async (clientId ) => {
  
  const [rows] = await db.query('SELECT id, amount, homeowner,guest,type, date, ispaid, isfetched FROM payments WHERE clientId = ? ORDER BY date DESC', [clientId ]);
  return rows;
};


//READ WITH DATES
export const getPaymentReport = async (from, to) => { 
  //console.log('result:', rows);
  const fromDate = new Date(from + 'T00:00:00.000Z');
  const toDate = new Date(to + 'T23:59:59.999Z');

  // const [rows] = await db.query(
  //   `SELECT * FROM payments WHERE date BETWEEN ? AND ? ORDER BY date DESC`,
  //   [fromDate, toDate]
  // );
  const sql = `SELECT id,  
                    p.clientId,     
                    CONCAT(c.FirstName, ' ', c.LastName) AS Fullname,
                    amount,     
                    homeowner,     
                    guest,     
                    date,
                    ispaid,
                    isfetched
                FROM payments p 
                LEFT JOIN 
                  tblclient c  ON c.clientId = p.clientId 
                WHERE 
                date BETWEEN ? AND ?  
                ORDER BY date DESC LIMIT 0, 1000`;
  const params = [fromDate, toDate];


  const [rows] = await db.query(sql, params);
  return rows;
};



//READ Unfetched payment
export const fetchPayment = async () => { 

  const sql = `SELECT id,  
                    p.clientId,     
                    CONCAT(c.FirstName, ' ', c.LastName) AS Fullname,
                    amount,     
                    homeowner,     
                    guest,     
                    date,
                    ispaid,
                    isfetched
                FROM payments p 
                LEFT JOIN 
                  tblclient c  ON c.clientId = p.clientId 
                WHERE 
                ispaid = 0
                and isfetched = 0
                ORDER BY date DESC LIMIT 0, 1000`;


  const [rows] = await db.query(sql);
  return rows;
};


// DELETE
export const deletePayment = async (paymentId) => {
  const [result] = await db.query('DELETE FROM payments WHERE id = ?', [paymentId]);
  return result.affectedRows;
};


export const updateMultiplePayments = async (paymentIds) => {
  
  try {
    const placeholders = paymentIds.map(() => '?').join(',');
    const sql = `UPDATE payments SET isfetched = 1 WHERE id IN (${placeholders})`;


     const [result] = await db.execute(sql); // assumes mysql2/promise
     return result.affectedRows;

  } catch (error) {
    console.error('Error updating payments:', error);
  }
};
