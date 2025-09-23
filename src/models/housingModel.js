import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';


const insertHousingApplicationQuery = loadSQL('insertHousingLoan.sql');

export const insertHousingApplication = async (application) => {

    const {
    ClientID,
    ReferenceNo,
    AgentID,
    RealtyID,
    HouseAndLotPackage,
    ProcessingPercentageID,
    ProcessingFee,
    TotalContractPrice,
    LoanableAmount,
    Equity,
    EquityPercentage,
    ReservationFee,
    NetEquity,
    CommissionPercentageID,
    CommissionableAmount,
    PaymentTerm,
    ProcessedBy,
    TransactionDate,
    ApplicationStatus
  } = application;

  const conn = await db.getConnection();

  try{

    await conn.beginTransaction();

    //Generate Reference Number
    const [rows] = await conn.query('SELECT COALESCE(MAX(Id), 0) + 1 AS NextId FROM tblhousingapplication');
    const refCount = rows[0].NextId;
    const ReferenceNo = refCount.toString().padStart(7, '0'); // Format as 0000001, etc.

    //Insert into DB
    const [result] = await conn.query(insertHousingApplicationQuery,[
        ClientID,
        ReferenceNo,
        AgentID,
        RealtyID,
        HouseAndLotPackage,
        ProcessingPercentageID,
        ProcessingFee,
        TotalContractPrice,
        LoanableAmount,
        Equity,
        EquityPercentage,
        ReservationFee,
        NetEquity,
        CommissionPercentageID,
        CommissionableAmount,
        PaymentTerm,
        ProcessedBy,
        ApplicationStatus
    ]);

    await conn.commit();

    // Return the inserted ID
    return result.insertId;

  } catch(err){
    await conn.rollback();
    throw err;
  } finally{
    conn.release();
  }

  
};



// READ ALL
export const getProcessingPercentage = async (typeId) => {
  const [rows] = await db.query('SELECT * FROM tblpercentage WHERE PercentageTypeID = ?',[typeId]);
  return rows;
};

// READ ALL
const getSLTypeQuery = loadSQL('getSLType.sql');

export const getSLType = async (Id) => {
  const [rows] = await db.query(getSLTypeQuery,[Id]);
  return rows[0];
};


// READ ALL
export const getRealty = async () => {
  const [rows] = await db.query('SELECT * FROM tblrealty');
  return rows;
};



// READ ALL
export const getAgentList = async (realtyId) => {
  const [rows] = await db.query('SELECT * FROM tblagent WHERE RealtyID = ?',[realtyId]);
  return rows;
};


// READ ALL
export const getApplicationStatus = async () => {
  const [rows] = await db.query('SELECT * FROM tblapplicationstatus');
  return rows;
};

const getHousingApplicationQuery = loadSQL('getHousingApplication.sql');

export const getHousingApplication = async (ClientID) => {
  const [rows] = await db.query(getHousingApplicationQuery,[ClientID]);
  return rows;
};

const updateHousingApplicationQuery = loadSQL('updateHousingLoan.sql');

export const updateHousingApplication = async (Id, updatedApplication) => {
  const {
    AgentID,
    RealtyID,
    HouseAndLotPackage,
    ProcessingPercentageID,
    ProcessingFee,
    TotalContractPrice,
    LoanableAmount,
    Equity,
    EquityPercentage,
    ReservationFee,
    NetEquity,
    CommissionPercentageID,
    CommissionableAmount,
    PaymentTerm,
    ProcessedBy,
    ApplicationStatus
  } = updatedApplication;

  const [result] = await db.query(updateHousingApplicationQuery,
    [
      AgentID,
      RealtyID,
      HouseAndLotPackage,
      ProcessingPercentageID,
      ProcessingFee,
      TotalContractPrice,
      LoanableAmount,
      Equity,
      EquityPercentage,
      ReservationFee,
      NetEquity,
      CommissionPercentageID,
      CommissionableAmount,
      PaymentTerm,
      ProcessedBy,
      ApplicationStatus,
      Id
    ]
  );

  return result.affectedRows;
};



export const getHousingApplicationCount = async (ClientID) => {
  const [rows] = await db.query(`SELECT  count(*)  as Count FROM tblhousingapplication WHERE ClientID = ?`,[ClientID]);
  return rows[0].Count;
};



const insertHousingTransactionSummaryQuery = loadSQL('insertHousingTransactionSummary.sql');
const insertHousingAccountReceivableQuery = loadSQL('insertHousingAccountReceivable.sql');
const insertHousingAccountPayableQuery = loadSQL('insertHousingAccountPayable.sql');
const insertHousingTransactionDetailsQuery = loadSQL('insertHousingTransactionDetails.sql');
const insertAgentEarningsQuery = loadSQL('insertAgentEarnings.sql');

export const postHousingApplication = async (transaction, transactionDetails, accountsReceivable, accountsPayable) => {
    const conn = await db.getConnection();

    try{
      await conn.beginTransaction();

      // Get new CTLNo
      const [ctlRows] = await conn.query(`
        SELECT COALESCE(MAX(CTLNo), 0) + 1 AS CTLNo 
        FROM tbltransactionsummary 
        WHERE TransactionCode = ? AND TransYear = YEAR(NOW())
      `, [transaction.TransactionCode]);

      //Create Control Number
      const controlNo = ctlRows[0].CTLNo;

      //Insert Transaction Summary
      await conn.query(insertHousingTransactionSummaryQuery,
        [
          transaction.TransactionCode,
          controlNo,
          transaction.ClientID,
          transaction.Explanation,
          transaction.PostedBy
        ]);


        //Insert Account Receivable
        for(const item of accountsReceivable){
          const [refResult] = await conn.query(
            `SELECT COALESCE(MAX(RefCount), 0) + 1 AS RefCount FROM tblaccountsreceivable WHERE SLC_CODE = ? AND SLT_CODE = ?`,
            [item.SLC_CODE, item.SLT_CODE]
          );
          
          let refCount = refResult[0].RefCount;

          const newRefNo = String(item.SLC_CODE).padStart(2, '0') +
                           String(item.SLT_CODE).padStart(2, '0') +
                           String(refCount).padStart(6, '0');


          await conn.query(insertHousingAccountReceivableQuery,
            [
              item.SLC_CODE,
              item.SLT_CODE,
              item.SLE_CODE,
              item.AccountStatusID,
              item.ClientID,
              newRefNo,
              refCount,
              item.Amount,
              item.UserID,
              item.Remarks,
              item.HousingReferenceNo,
              item.IsMainSL
            ]);
        }



        //Insert Account Payable
        for(const item of accountsPayable){
          let APReferenceNo = "";

          const [referenceResult] = await conn.query(
            `SELECT ReferenceNo FROM tblaccountspayable WHERE SLC_CODE = ? AND SLT_CODE = ? AND AgentID = ?`,
            [item.SLC_CODE, item.SLT_CODE,item.AgentID]);



          if(referenceResult.length > 0 && referenceResult[0].ReferenceNo){

            APReferenceNo = referenceResult[0].ReferenceNo;

          }
          else{
            const [refResult] = await conn.query(
              `SELECT COALESCE(MAX(RefCount), 0) + 1 AS RefCount FROM tblaccountspayable WHERE SLC_CODE = ? AND SLT_CODE = ?`,
              [item.SLC_CODE, item.SLT_CODE]
            );
            
            let refCount = refResult[0].RefCount;

            APReferenceNo = String(item.SLC_CODE).padStart(2, '0') +
                            String(item.SLT_CODE).padStart(2, '0') +
                            String(refCount).padStart(6, '0');


            await conn.query(insertHousingAccountPayableQuery,
              [
                item.SLC_CODE,
                item.SLT_CODE,
                item.SLE_CODE,
                item.AccountStatusID,
                item.AgentID,
                item.RealtyID,
                APReferenceNo,
                refCount,
                item.Amount,
                item.UserID,
                item.Remarks,
                item.HousingReferenceNo
              ]);

            }

            //insert Agent Earnings
            await conn.query(insertAgentEarningsQuery,
            [
              item.AgentID,
              item.SLC_CODE,
              item.SLT_CODE,
              item.SLE_CODE,
              APReferenceNo,
              item.Amount,
              item.HousingReferenceNo
            ]);
          
        }
        

        //Insert Transaction Details
        let sequence = 0;

        for(const detail of transactionDetails){
          let ReferenceNo = "";
          
          if(detail.SLC_CODE == 12){
            const [refResult] = await conn.query(
            `SELECT ReferenceNo FROM tblacccountsreceivable WHERE SLC_CODE = ? AND SLT_CODE = ? AND ClientID = ?`,
            [detail.SLC_CODE, detail.SLT_CODE,detail.ClientID]);


            ReferenceNo = refResult[0].ReferenceNo;
            
          }
          else if(detail.SLC_CODE == 16){
            const [refResult] = await conn.query(
            `SELECT ReferenceNo FROM tblaccountspayable WHERE SLC_CODE = ? AND SLT_CODE = ? AND AgentID = ?`,
            [detail.SLC_CODE, detail.SLT_CODE,detail.AgentID]);


            ReferenceNo = refResult[0].ReferenceNo;
            
          }

          await conn.query(insertHousingTransactionDetailsQuery,[
            detail.TransactionCode,
            controlNo,
            detail.AccountCode,
            detail.ClientID,
            detail.SLC_CODE,
            detail.SLT_CODE,
            ReferenceNo,
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


        await conn.query(
        `UPDATE tblhousingapplication SET 
          ApplicationStatus = 5,
          CTLNo = ?
         WHERE ClientID = ?`,
        [
          controlNo,
          transaction.ClientID
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




const reverseTransactionSummaryQuery = loadSQL('reverseTransactionSummary.sql');
const reverseTransactionDetailsQuery = loadSQL('reverseTransactionDetails.sql');

export const reverseHousingApplication = async (transaction) => {
  const {
    TransactionCode,
    CTLNo,
    TransYear,
    ReferenceNo
  } = transaction;

    const conn = await db.getConnection();

    try{
      await conn.beginTransaction();

      const ReversalTransCode = 3;
      // Get new CTLNo
      const [ctlRows] = await conn.query(`
        SELECT COALESCE(MAX(CTLNo), 0) + 1 AS CTLNo 
        FROM tbltransactionsummary 
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


      await conn.query(
      `UPDATE tbltransactiondetails SET 
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
      `UPDATE tblhousingapplication SET 
        ApplicationStatus = 2
        WHERE ReferenceNo = ?`,
      [
        ReferenceNo
      ]);


      await conn.query(
      `UPDATE tblaccountsreceivable SET 
        AccountStatusID = 2
        WHERE HousingReferenceNo = ?`,
      [
        ReferenceNo
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