import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createClientController,
  getAllClientsController,
  getClientByIdController,
  updateClientController,
  deleteClientController
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', verifyToken, createClientController);
router.get('/', verifyToken, getAllClientsController);
router.get('/:clientId', verifyToken, getClientByIdController);
router.put('/:clientId', verifyToken, updateClientController);
router.delete('/:id', verifyToken, deleteClientController);

export default router;
