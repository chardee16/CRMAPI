import {
    getHousingComputationAll
} from '../models/reportModel.js';



// READ ALL
export const getHousingComputationAllController = async (req, res) => {
  try {
      const data = await getHousingComputationAll();
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('request error: ', err.message);
  }
};
