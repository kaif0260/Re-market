import express from 'express';
import {
  getCoupons,
  getCoupon,
  validateCoupon
} from '../controllers/coupon.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCoupons);
router.get('/validate/:code', protect, validateCoupon);
router.get('/:id', getCoupon);

export default router;
