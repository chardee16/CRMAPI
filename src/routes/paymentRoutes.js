import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createPaymentController,
  getPaymentByIdController,
  getPaymentReportController,
  fetchPaymentController,
  deletePaymentController
} from '../controllers/paymentController.js';

const router = express.Router();
router.post('/', verifyToken, createPaymentController);
// router.get('/', getAllClientsController);
router.get('/:clientId', verifyToken, getPaymentByIdController);

router.get('/', verifyToken, getPaymentReportController);
router.get('/FetchPayment', verifyToken,  fetchPaymentController);
// router.put('/:id', updateClientController);
router.delete('/:paymentId', deletePaymentController);

export default router;
