import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  requestReturn,
  getOrderHistory
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/history', getOrderHistory);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);
router.post('/:id/return', requestReturn);

export default router;
