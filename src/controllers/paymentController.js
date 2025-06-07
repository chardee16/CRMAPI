import {
    insertPayment,
    getPaymentById,
    getPaymentReport
  } from '../models/paymentModel.js';


  // Insert
  export const createPaymentController = async (req, res) => {
    try {
      //console.log('Request Parameter:', req.body);
      const resultId = await insertPayment(req.body);
      res.status(201).json({ message: 'Payment Recorded', resultId: resultId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // READ ONE
  export const getPaymentByIdController = async (req, res) => {
    try {
      //console.log('Request Parameter:', req.params.clientId);
      const client = await getPaymentById(req.params.clientId);
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const getPaymentReportController = async (req, res) => {
    try {
      //console.log('Request Parameter:', req.query);
      const { from, to } = req.query;

      if (!from || !to) {
        return res.status(400).json({ message: 'Missing from or to date' });
      }
      
      const report = await getPaymentReport(from, to);

      if (!report) return res.status(404).json({ message: 'Report is Empty' });

      res.status(200).json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };