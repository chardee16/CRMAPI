import express from 'express';
import {
  getQuestionByIdController
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/:id', getQuestionByIdController);

export default router;