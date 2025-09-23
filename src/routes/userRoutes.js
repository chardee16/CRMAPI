import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createUserController,
  getAllUsersController
} from '../controllers/userController.js';

const router = express.Router();

router.post('/insertuser', verifyToken, createUserController);
router.get('/getallusers',verifyToken, getAllUsersController);


export default router;
