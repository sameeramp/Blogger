import express from 'express';
const router = express.Router();
import { saveContactDetails } from '../controllers/contact/saveContactDetails.js';

router.post('/contactus', saveContactDetails);

export default router; 