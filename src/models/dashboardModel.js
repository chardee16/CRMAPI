import db from '../../db.js'; // adjust path as needed




export const getAllData = async () => {
  const [rows] = await db.query(`
    SELECT 
      (SELECT COUNT(*) FROM tblclient ) AS totalClients,
      (SELECT IFNULL(SUM(amount), 0) FROM payments WHERE DATE(date) = CURDATE()) AS paymentsToday,
      (SELECT COUNT(*) FROM tblclient WHERE ClientAccountStatusID = 1) AS activeClients,
      (SELECT COUNT(*) FROM payments WHERE ispaid = 0) AS pendingPayment
    `);
  return rows[0];
};
