import express from 'express';
import {
  registerAsSeller,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  updateOrderStatus,
  getSellerWallet,
  withdrawEarnings,
  getSellerStats
} from '../controllers/seller.controller.js';
import { protect, isSeller, isSellerApproved } from '../middleware/auth.middleware.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

router.use(protect);

// Register as seller – any logged-in user (not yet seller)
router.post('/register', registerAsSeller);

// All routes below require seller role
router.use(isSeller);

// Only approved sellers can create/update/delete products
router.post('/products', isSellerApproved, upload.array('images', 5), createProduct);
router.get('/products', getMyProducts);
router.put('/products/:id', isSellerApproved, upload.array('images', 5), updateProduct);
router.delete('/products/:id', isSellerApproved, deleteProduct);
router.get('/orders', getSellerOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/wallet', getSellerWallet);
router.post('/wallet/withdraw', withdrawEarnings);
router.get('/stats', getSellerStats);

export default router;
