import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createPaymentController,
  getPaymentByIdController,
  getPaymentReportController,
  fetchPaymentController ,
  deletePaymentController,
  updateMultiplePaymentsController
} from '../controllers/paymentController.js';

const router = express.Router();
router.post('/', verifyToken, createPaymentController);
// router.get('/', getAllClientsController);
router.get('/fetchpayment', verifyToken,  fetchPaymentController );
router.get('/', verifyToken, getPaymentReportController);
router.get('/:clientId', verifyToken, getPaymentByIdController);
// router.put('/:id', updateClientController);
router.delete('/:paymentId', deletePaymentController);

router.put('/update-multiple', verifyToken, updateMultiplePaymentsController);

export default router;
