import {
    getAccountPayableAgent,
    getHousingComputationPerAgent,
    postAgentDisbursementTransaction,
    getTransactionList
} from '../models/agentModel.js';


// READ ALL
export const getAccountPayableAgentController = async (req, res) => {
  try {
      const ap = await getAccountPayableAgent(req.query.agentid);
      res.status(200).json(ap);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};



// READ ALL
export const getHousingComputationPerAgentController = async (req, res) => {
  try {
      const data = await getHousingComputationPerAgent(req.query.agentid);
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};



  // Posting
    export const postAgentDisbursementTransactionController = async (req, res) => {
      console.log("Posting Request");
      const {transaction, transactionDetails, withdrawalDetails} = req.body;
      try {
        const Id = await postAgentDisbursementTransaction(transaction, transactionDetails, withdrawalDetails);
        res.status(201).json({ message: 'Transaction Posted', Id: Id });
      } catch (err) {
        res.status(500).json({ error: err.message });
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
    