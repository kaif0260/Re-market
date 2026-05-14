import express from 'express';
import { fileURLToPath } from 'url';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllSellers,
  approveSeller,
  rejectSeller,
  getAllProducts,
  approveProduct,
  rejectProduct,
  getAllOrders,
  updateOrderStatus,
  getAllResaleListings,
  approveResaleListing,
  rejectResaleListing,
  getAllComplaints,
  updateComplaint,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAnalytics,
  getDashboardStats
} from '../controllers/admin.controller.js';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary, upload, isCloudinaryConfigured } from '../utils/cloudinary.js';
import {
  getUpcomingProducts as getUpcomingProductsCtrl,
  createUpcomingProduct,
  updateUpcomingProduct,
  deleteUpcomingProduct,
  toggleUpcomingProduct,
  replaceUpcomingProducts
} from '../controllers/upcomingProduct.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';
import { isVideoMime } from '../utils/videoConverter.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(protect);
router.use(isAdmin);

// Admin media — Cloudinary only (centralised URLs for all devices)
// Returns: { success: true, url, publicId }
router.post('/uploads', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const { mimetype } = req.file;

  try {
    const resourceType = isVideoMime(mimetype) ? 'video' : 'auto';
    const uploadRes = await uploadToCloudinary(filePath, 'remarket/upcoming', { resourceType });
    return res.json({
      success: true,
      url: uploadRes.secureUrl,
      publicId: uploadRes.publicId
    });
  } catch (error) {
    console.error('Admin media upload failed:', error);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch {
        /* ignore */
      }
    }
    return res.status(500).json({ success: false, message: error.message || 'Media upload failed' });
  }
});


// User Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Seller Management
router.get('/sellers', getAllSellers);
router.put('/sellers/:id/approve', approveSeller);
router.put('/sellers/:id/reject', rejectSeller);

// Product Management
router.get('/products', getAllProducts);
router.put('/products/:id/approve', approveProduct);
router.put('/products/:id/reject', rejectProduct);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Resale Management
router.get('/resale', getAllResaleListings);
router.put('/resale/:id/approve', approveResaleListing);
router.put('/resale/:id/reject', rejectResaleListing);

// Complaint Management
router.get('/complaints', getAllComplaints);
router.put('/complaints/:id', updateComplaint);

// Coupon Management
router.get('/coupons', getAllCoupons);
router.post('/coupons', createCoupon);
router.put('/coupons/:id', updateCoupon);
router.delete('/coupons/:id', deleteCoupon);

// Analytics
router.get('/analytics', getAnalytics);
router.get('/dashboard', getDashboardStats);

// Upcoming Products Management
router.get('/upcoming-products', getUpcomingProductsCtrl);
router.post('/upcoming-products', createUpcomingProduct);
router.put('/upcoming-products/:id', updateUpcomingProduct);
router.delete('/upcoming-products/:id', deleteUpcomingProduct);
router.patch('/upcoming-products/:id/toggle', toggleUpcomingProduct);
router.post('/upcoming-products/replace', replaceUpcomingProducts);

export default router;
