import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
    getAccountPayableAgentController,
    getHousingComputationPerAgentController,
    postAgentDisbursementTransactionController,
    getTransactionListController
} from '../controllers/agentController.js';

const router = express.Router();

router.get('/accountpayable', verifyToken, getAccountPayableAgentController);
router.get('/housingcomputationperagent', verifyToken, getHousingComputationPerAgentController);
router.post('/posttransaction', verifyToken, postAgentDisbursementTransactionController);
router.get('/transactionlist', verifyToken, getTransactionListController);

export default router;