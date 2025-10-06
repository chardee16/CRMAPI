import {
    getQuestionById
  } from '../models/questionModel.js';


// READ ONE
export const getQuestionByIdController = async (req, res) => {
  try {
    const client = await getQuestionById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};