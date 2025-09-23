import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import {
  getProcessingPercentageController,
  getSLTypeController,
  getRealtyController,
  getAgentListController,
  insertHousingApplicationController,
  getApplicationStatusController,
  geHousingApplicationController,
  updateHousingApplicationController,
  geHousingApplicationCountController,
  postHousingApplicationController,
  reverseHousingApplicationController
} from '../controllers/housingController.js';

const router = express.Router();

router.post('/inserthousing', verifyToken, insertHousingApplicationController);
router.post('/posthousing', verifyToken, postHousingApplicationController);
router.post('/reversehousingapplication', verifyToken, reverseHousingApplicationController);
router.get('/processingpercentage', verifyToken, getProcessingPercentageController);
router.get('/sltype', verifyToken, getSLTypeController);
router.get('/realty', verifyToken, getRealtyController);
router.get('/agentlist', verifyToken, getAgentListController);
router.get('/applicationstatus', verifyToken, getApplicationStatusController);
router.get('/housingapplication', verifyToken, geHousingApplicationController);
router.put('/updatehousingapplication/:Id', verifyToken, updateHousingApplicationController);
router.get('/housingapplicationcount', verifyToken, geHousingApplicationCountController);




export default router;
