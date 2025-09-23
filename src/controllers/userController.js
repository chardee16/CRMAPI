import {
    createUser,
    getAllUsers
  } from '../models/userModel.js';


// CREATE
export const createUserController = async (req, res) => {
  try {
    const userId = await createUser(req.body);
    res.status(201).json({ message: 'User created', UserID: userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// READ ALL
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error: ', err.message);
  }
};
