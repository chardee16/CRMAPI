import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  getAccountReceivableFOController,
  getCOCITypeController,
  getBanksController,
  postFrontOfficeTransactionController,
  getAccountReceivableOtherFOController,
  getAccountDetailsController,
  getTransactionListController,
  getSelectedTransactionController,
  reverseFrontOfficeTransactionController,
  getSLTransactionHistoryController
} from '../controllers/frontOfficeController.js';

const router = express.Router();

router.get('/accountreceivable', verifyToken, getAccountReceivableFOController);
router.get('/accountreceivableother', verifyToken, getAccountReceivableOtherFOController);
router.get('/cociType', verifyToken, getCOCITypeController);
router.get('/banks', verifyToken, getBanksController);
router.post('/posttransaction', verifyToken, postFrontOfficeTransactionController);
router.get('/accountdetails', verifyToken, getAccountDetailsController);
router.get('/transactionlist', verifyToken, getTransactionListController);
router.post('/selectedtransaction', verifyToken, getSelectedTransactionController);
router.post('/reversetransaction', verifyToken, reverseFrontOfficeTransactionController);
router.get('/sltransactionhistory', verifyToken, getSLTransactionHistoryController);

export default router;
