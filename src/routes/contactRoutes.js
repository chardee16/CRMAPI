import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  getAllContacts,
  addNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', verifyToken, addNewContact);
router.put('/:contactId', verifyToken, updateContact);
router.delete('/:contactId', verifyToken, deleteContact);

export default router;