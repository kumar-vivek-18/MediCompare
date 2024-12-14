import express from 'express';
import { get1mgRes, getApolloPharmacy, getDawaiBala, getNetmedsResult, getPharmeasyResult } from '../controllers/puppetter.js';


const router = express.Router();

router.route('/get-netmeds').get(getNetmedsResult);
router.route('/get-pharmeasy').get(getPharmeasyResult);
router.route('/get-get1mg').get(get1mgRes);
router.route('/get-apollo-pharmacy').get(getApolloPharmacy);
router.route('/get-dawaibala').get(getDawaiBala);




export default router;