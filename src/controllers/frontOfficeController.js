import {
    getAccountReceivableFO,
    getCOCIType,
    getBanks,
    postFrontOfficeTransaction,
    getAccountReceivableOtherFO,
    getAccountDetails,
    getTransactionList,
    getSelectedTransaction,
    reverseFrontOfficeTransaction,
    getSLTransactionHistory
} from '../models/frontOfficeModel.js';




// READ ALL
export const getAccountReceivableFOController = async (req, res) => {
  try {
      const ar = await getAccountReceivableFO(req.query.clientid);
      res.status(200).json(ar);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};

// READ ALL
export const getAccountReceivableOtherFOController = async (req, res) => {
  try {
      const ar = await getAccountReceivableOtherFO(req.query.clientid);
      res.status(200).json(ar);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};



// READ ALL COCI TYPE
export const getCOCITypeController = async (req, res) => {
  try {
    const cocitypes = await getCOCIType();
    res.status(200).json(cocitypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error: ', err.message);
  }
};



  // READ ALL COCI TYPE
export const getBanksController = async (req, res) => {
  try {
    const banks = await getBanks();
    res.status(200).json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error: ', err.message);
  }
};



// Posting
export const postFrontOfficeTransactionController = async (req, res) => {
  console.log("Posting Request");
  const {transaction, transactionDetails, transactionCheck} = req.body;
  try {
    const Id = await postFrontOfficeTransaction(transaction, transactionDetails, transactionCheck);
    res.status(201).json({ message: 'Transaction Posted', Id: Id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAccountDetailsController = async (req, res) => {
  try {
      const details = await getAccountDetails(req.query.AccountCode);
      res.status(200).json(details);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};




export const getTransactionListController = async (req, res) => {
  try {
    const transactions = await getTransactionList();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error: ', err.message);
  }
};



export const getSelectedTransactionController = async (req, res) => {
  try {
    const transaction = await getSelectedTransaction(req.body);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const reverseFrontOfficeTransactionController = async (req, res) => {
  try {
    const Id = await reverseFrontOfficeTransaction(req.body);
    res.status(201).json({ message: 'Transaction Reversed', Id: Id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getSLTransactionHistoryController = async (req, res) => {
  try {
      const data = await getSLTransactionHistory(req.query.ReferenceNo);
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};