import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { findUserByUsername, createUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const existingUser = await findUserByUsername(email);
    if (existingUser) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashedPassword);

    res.status(201).json({ msg: 'User registered', userId });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  
  //console.log("Request Login: ", req.body);cl
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  

  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
      
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      console.error('Password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      message: "Login successful",
      token,
      user: {
        UserID: user.UserID,
        username: user.Username,
        isAdmin: user.IsAdmin,
        MinimumBill: user.MinimumBill,
        MinimumConsumption: user.MinimumConsumption,
        FirstExcess: user.FirstExcess,
        SecondExcess: user.SecondExcess,
        ThirdExcess: user.ThirdExcess,
        LastExcess: user.LastExcess,
        IsTeller : user.IsTeller,
        AccountCodeCASH : user.AccountCodeCASH,
        AccountCodeCOCI : user.AccountCodeCOCI
      }
     });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};