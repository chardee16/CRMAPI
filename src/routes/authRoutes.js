import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  register
);

router.post(
  '/login',
  body('username').notEmpty().withMessage('Username is required'),
  body('password').exists().withMessage('Password is required'),
  login
);

export default router;