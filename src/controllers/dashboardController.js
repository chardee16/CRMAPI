import {
    getAllData
  } from '../models/dashboardModel.js';



// READ ALL
export const getAllDataController = async (req, res) => {
  try {
    const data = await getAllData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error: ', err.message);
  }
};