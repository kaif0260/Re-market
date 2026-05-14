import express from 'express';
import {
  verifyOrder,
  createResaleListing,
  getResaleListings,
  getResaleListing,
  purchaseResaleItem,
  getMyResaleListings
} from '../controllers/resale.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getResaleListings);
router.get('/:id', getResaleListing);

// Protected routes
router.use(protect);
router.post('/verify-order', verifyOrder);
router.post('/create', upload.array('images', 5), createResaleListing);
router.get('/my/listings', getMyResaleListings);
router.post('/:id/purchase', purchaseResaleItem);

export default router;
