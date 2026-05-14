import express from 'express';
import {
  createPayment,
  verifyPayment,
  createRazorpayOrder
} from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/create', createPayment);
router.post('/verify', verifyPayment);
router.post('/razorpay/order', createRazorpayOrder);

export default router;
