import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';

// READ AR FO
const getAccountPayableAgentQuery = loadSQL('getAccountPayableAgent.sql');

export const getAccountPayableAgent = async (agentid) => {

  const [rows] = await db.query(getAccountPayableAgentQuery,[agentid]);
  return rows;
};

const getHousingComputationPerAgentQuery = loadSQL('getHousingComputationPerAgent.sql');
export const getHousingComputationPerAgent = async (agentid) => {

  const [rows] = await db.query(getHousingComputationPerAgentQuery,[agentid]);
  return rows;
};






const insertHousingTransactionSummaryQuery = loadSQL('insertHousingTransactionSummary.sql');
const insertHousingTransactionDetailsQuery = loadSQL('insertHousingTransactionDetails.sql');
const insertAgentWithdrawalsQuery = loadSQL('insertAgentWithdrawals.sql');

export const postAgentDisbursementTransaction = async (transaction, transactionDetails, withdrawalDetails) => {
    const conn = await db.getConnection();

    try{
      await conn.beginTransaction();

      // Get new CTLNo
      const [ctlRows] = await conn.query(`
        SELECT COALESCE(MAX(CTLNo), 0) + 1 AS CTLNo 
        FROM tbltransactionsummary 
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


        for(const detail of withdrawalDetails){
          
          await conn.query(insertAgentWithdrawalsQuery,[
            detail.TransactionCode,
            detail.SLC_CODE,
            detail.SLT_CODE,
            detail.SLE_CODE,
            controlNo,
            detail.AgentID,
            detail.HousingReferenceNo,
            detail.Amount,
            detail.UPDTag
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
  const TransactionCode = 4;
  const [rows] = await db.query(getTransactionListQuery,[TransactionCode]);
  return rows;
};