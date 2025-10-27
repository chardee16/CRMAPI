import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  getAllDataController
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/getdata', verifyToken, getAllDataController);

export default router;