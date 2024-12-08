import express from 'express';
import { addMedicine, convertExcelToJson } from '../controllers/utils.controller.js';
import { upload } from '../middlewares/multer.middleware.js';


const router = express.Router();

router.route('/').post(upload, convertExcelToJson);
router.route('/upload-medicine').post(addMedicine);

export default router;