import express from 'express';
import {
  getProducts,
  getProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByBrand
} from '../controllers/product.controller.js';
import { getPublicUpcomingProducts } from '../controllers/upcomingProduct.controller.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/brand/:brand', getProductsByBrand);

// Public upcoming products (used by homepage slider)
router.get('/upcoming', getPublicUpcomingProducts);
router.get('/:id', getProduct);

export default router;
