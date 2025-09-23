import {
    getProcessingPercentage,
    getSLType,
    getRealty,
    getAgentList,
    insertHousingApplication,
    getApplicationStatus,
    getHousingApplication,
    updateHousingApplication,
    getHousingApplicationCount,
    postHousingApplication,
    reverseHousingApplication
  } from '../models/housingModel.js';



  // CREATE
  export const insertHousingApplicationController = async (req, res) => {
    try {
      const Id = await insertHousingApplication(req.body);
      res.status(201).json({ message: 'Client created', Id: Id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // READ ALL
  export const getProcessingPercentageController = async (req, res) => {
    try {
      const percentage = await getProcessingPercentage(req.query.typeId);
      res.status(200).json(percentage);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };


  // READ ALL
  export const getSLTypeController = async (req, res) => {
    try {
      const sltype = await getSLType(req.query.Id);
      res.status(200).json(sltype);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };


  // READ ALL
  export const getRealtyController = async (req, res) => {
    try {
      const realtyList = await getRealty();
      res.status(200).json(realtyList);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };


  export const getAgentListController = async (req, res) => {
    try {
      const agents = await getAgentList(req.query.realtyId);
      res.status(200).json(agents);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };



  export const getApplicationStatusController = async (req, res) => {
    try {
      const realtyList = await getApplicationStatus();
      res.status(200).json(realtyList);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };


  export const geHousingApplicationController = async (req, res) => {
    try {
      const application = await getHousingApplication(req.query.ClientID);
      res.status(200).json(application);
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };


  // UPDATE
  export const updateHousingApplicationController = async (req, res) => {
    try {
      console.log("Request Update");
      const affectedRows = await updateHousingApplication(req.params.Id, req.body);
      if (!affectedRows) return res.status(404).json({ message: 'Application not found' });
      res.status(200).json({ message: 'Application updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



  export const geHousingApplicationCountController = async (req, res) => {
    try {
      const count = await getHousingApplicationCount(req.query.ClientID);
      res.status(200).send(count.toString());
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
    }
  };




  // Posting
  export const postHousingApplicationController = async (req, res) => {
    
    const {transaction, transactionDetails, accountsReceivable, accountsPayable} = req.body;
    try {
      const Id = await postHousingApplication(transaction, transactionDetails, accountsReceivable, accountsPayable);
      res.status(201).json({ message: 'Transaction Posted', Id: Id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


    // Posting
  export const reverseHousingApplicationController = async (req, res) => {
    
    try {
      const Id = await reverseHousingApplication(req.body);
      res.status(201).json({ message: 'Transaction Posted', Id: Id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
