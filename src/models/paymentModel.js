import db from '../../db.js';

// Insert
export const insertPayment = async (payment) => {
  const {
    clientId,
    amount,
    type,
    homeowners,
    guests,
    date 
  } = payment;

  const [result] = await db.query(`
    INSERT INTO payments (clientId, amount, type,homeowner,guest, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      clientId, amount, type, homeowners, guests, new Date(date)
    ]
  );

  return result.insertId;
};



// READ ONE
export const getPaymentById = async (clientId ) => {
  
  const [rows] = await db.query('SELECT id, amount, homeowner,guest,type, date FROM payments WHERE clientId = ? ORDER BY date DESC', [clientId ]);
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
                    date 
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