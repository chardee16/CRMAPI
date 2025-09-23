import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';


// READ AR FO
const getAccountReceivableFOQuery = loadSQL('getAccountReceivableFO.sql');

export const getAccountReceivableFO = async (clientid) => {
  const IsMainSL = 1;
  const [rows] = await db.query(getAccountReceivableFOQuery,[clientid, IsMainSL]);
  return rows;
};


export const getAccountReceivableOtherFO = async (clientid) => {
  const IsMainSL = 0;
  const [rows] = await db.query(getAccountReceivableFOQuery,[clientid, IsMainSL]);
  return rows;
};






  // READ ALL COCI TYPE
export const getCOCIType = async () => {
  const [rows] = await db.query('SELECT * FROM tblcocitype');
  return rows;
};


export const getAccountDetails = async (AccountCode) => {
  const [rows] = await db.query(`
      SELECT 
        IFNULL(gl.SLC_CODE, 0) AS SLC_CODE,
        IFNULL(gl.SLT_CODE, 0) AS SLT_CODE,
        IFNULL(gl.SLE_CODE, 0) AS SLE_CODE,
        IFNULL(gl.StatusID, 0) AS StatusID,
        IFNULL(gl.AccountCode, 0) AS AccountCode,
        coa.COADesc
      FROM tblchartofaccounts coa
      LEFT JOIN tblGLControl gl
        ON gl.AccountCode = coa.COAID
      WHERE coa.COAID = ?`
    ,[AccountCode]);
  return rows[0];
};


  // READ ALL COCI TYPE
export const getBanks = async () => {
  const [rows] = await db.query('SELECT * FROM tblbanks');
  return rows;
};



const insertHousingTransactionSummaryQuery = loadSQL('insertHousingTransactionSummary.sql');
const insertHousingTransactionDetailsQuery = loadSQL('insertHousingTransactionDetails.sql');
const insertTransactionCheckQuery = loadSQL('insertTransactionCheck.sql');

export const postFrontOfficeTransaction = async (transaction, transactionDetails, transactionCheck) => {
    const conn = await db.getConnection();

    try{
      await conn.beginTransaction();

      // Get new CTLNo
      const [ctlRows] = await conn.query(`
        SELECT COALESCE(MAX(CTLNo), 0) + 1 AS CTLNo 
        FROM tblTransactionSummary 
        WHERE TransactionCode = ? AND TransYear = YEAR(NOW())
      `, [transaction.TransactionCode]);

      const controlNo = ctlRows[0].CTLNo;
      
      await conn.query(insertHousingTransactionSummaryQuery,
        [
          transaction.TransactionCode,
          controlNo,
          transaction.ClientID,
          transaction.Explanation,
          transaction.PostedBy
        ]);


        let sequence = 0;

        for(const detail of transactionDetails){
          
          await conn.query(insertHousingTransactionDetailsQuery,[
            detail.TransactionCode,
            controlNo,
            detail.AccountCode,
            detail.ClientID,
            detail.SLC_CODE,
            detail.SLT_CODE,
            detail.ReferenceNo,
            detail.SLE_CODE,
            detail.StatusID,
            detail.Amt,
            detail.PostedBy,
            detail.UPDTag,
            sequence,
            detail.ClientName,
            detail.AgentID,
            detail.RealtyID
          ]);

          sequence++;
        }


        for(const detail of transactionCheck){
          
          await conn.query(insertTransactionCheckQuery,[
            detail.TransactionCode,
            controlNo,
            detail.COCITypeID,
            detail.BankID,
            detail.CheckNumber,
            detail.CheckDate,
            detail.UPDTag,
            detail.Amt
          ]);

        }





      await conn.commit();
      return 1;
    }
    catch(error){
        await conn.rollback();
        console.log(error);
        throw error;
    } 
    finally{
    conn.release();
    }
};





const getTransactionListQuery = loadSQL('getTransactionList.sql');

export const getTransactionList = async () => {
  const TransactionCode = 1;
  const [rows] = await db.query(getTransactionListQuery,[TransactionCode]);
  return rows;
};


const getSelectedTransactionQuery = loadSQL('getSelectedTransaction.sql');
export const getSelectedTransaction = async (transaction) => {
  const {
    TransactionCode,
    CTLNo,
    TransYear
  } = transaction;

  const [rows] = await db.query(getSelectedTransactionQuery,
    [
      TransactionCode,
      CTLNo,
      TransYear
    ]);
  return rows;

}





const reverseTransactionSummaryQuery = loadSQL('reverseTransactionSummary.sql');
const reverseTransactionDetailsQuery = loadSQL('reverseTransactionDetails.sql');
const reverseAgentWithdrawalsQuery = loadSQL('reverseAgentWithdrawals.sql');

export const reverseFrontOfficeTransaction = async (transaction) => {
  const {
    TransactionCode,
    CTLNo,
    TransYear
  } = transaction;

    const conn = await db.getConnection();

    try{
      await conn.beginTransaction();

      const ReversalTransCode = 3;
      // Get new CTLNo
      const [ctlRows] = await conn.query(`
        SELECT COALESCE(MAX(CTLNo), 0) + 1 AS CTLNo 
        FROM tblTransactionSummary 
        WHERE TransactionCode = ? AND TransYear = YEAR(NOW())
      `, [ReversalTransCode]);

      //Create Control Number
      const controlNo = ctlRows[0].CTLNo;

      //Insert Transaction Summary
      await conn.query(reverseTransactionSummaryQuery,
      [
        controlNo,
        TransactionCode,
        CTLNo,
        TransYear
      ]);

      await conn.query(reverseTransactionDetailsQuery,
      [
        controlNo,
        TransactionCode,
        CTLNo,
        TransYear
      ]);


      await conn.query(reverseAgentWithdrawalsQuery,
      [
        controlNo,
        TransactionCode,
        CTLNo,
        TransYear
      ]);

      await conn.query(
      `UPDATE tblTransactionDetails SET 
        UPDTag = 5
        WHERE TransactionCode = ?
        AND CTLNo = ?
        AND TransYear = ?`,
      [
        TransactionCode,
        CTLNo,
        TransYear
      ]);


      await conn.query(
      `UPDATE tblagentwithdrawals SET 
        UPDTag = 5
        WHERE TransactionCode = ?
        AND CTLNo = ?
        AND TransYear = ?`,
      [
        TransactionCode,
        CTLNo,
        TransYear
      ]);


      await conn.commit();
      return 1;
    }
    catch(error){
        await conn.rollback();
        throw error;
    } 
    finally{
    conn.release();
    }
};



const getSLHistoryQuery = loadSQL('getSLHistory.sql');

export const getSLTransactionHistory = async (ReferenceNo) => {
  const [rows] = await db.query(getSLHistoryQuery,[ReferenceNo]);
  return rows;
};
