import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
    getHousingComputationAllController
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/clientgetall', verifyToken, getHousingComputationAllController);



export default router;