import express from 'express';
import { getAllMedicines, searchMedicines } from '../controllers/medicines.controller.js';

const router = express.Router();

router.route('/get-all-medicines').get(getAllMedicines);
router.route('/search').get(searchMedicines);

export default router;