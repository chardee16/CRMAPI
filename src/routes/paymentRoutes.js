import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createPaymentController,
  getPaymentByIdController,
  getPaymentReportController
} from '../controllers/paymentController.js';

const router = express.Router();
router.post('/', verifyToken, createPaymentController);
// router.get('/', getAllClientsController);
router.get('/:clientId', verifyToken, getPaymentByIdController);

router.get('/', verifyToken, getPaymentReportController);
// router.put('/:id', updateClientController);
// router.delete('/:id', deleteClientController);

export default router;
