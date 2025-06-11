import {
    insertPayment,
    getPaymentById,
    getPaymentReport,
    fetchPayment,
    deletePayment,
    updateMultiplePayments
  } from '../models/paymentModel.js';


  // Insert
  export const createPaymentController = async (req, res) => {
    try {
      console.log('Request Parameter:', req.body);
      const resultId = await insertPayment(req.body);
      res.status(201).json({ message: 'Payment Recorded', resultId: resultId });
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('Error:', err.message );
    }
  };


  // READ ONE
  export const getPaymentByIdController = async (req, res) => {
    try {
      //console.log('Request Parameter:', req.params.clientId);
      const client = await getPaymentById(req.params.clientId);
      if (!client) return res.status(404).json({ message: 'Payment not found' });
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



  export const fetchPaymentController = async (req, res) => {
    try {
      const report = await fetchPayment();

      if (!report) return res.status(404).json({ message: 'Report is Empty' });

      res.status(200).json(report);

    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('Error: ', err.message);
    }
  };


  // DELETE
  export const deletePaymentController = async (req, res) => {
    try {
      const affectedRows = await deletePayment(req.params.paymentId);
      if (!affectedRows) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//Update Multple
  export const updateMultiplePaymentsController = async (req, res) => {
    try {
      //console.log('Request Parameter:', req.query);
      const { paymentIds } = req.body;

      if (!Array.isArray(paymentIds) || paymentIds.length === 0) {
        return res.status(400).json({ error: 'paymentIds must be a non-empty array' });
      }
      
      await updateMultiplePayments(paymentIds);
      res.status(200).json({ message: 'Payment updated' });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
