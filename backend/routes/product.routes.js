import express from 'express';
import {
  getProducts,
  getProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByBrand,
  getDealsProducts
} from '../controllers/product.controller.js';

import { getPublicUpcomingProducts } from '../controllers/upcomingProduct.controller.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);

router.get('/search', searchProducts);

router.get('/category/:category', getProductsByCategory);

router.get('/brand/:brand', getProductsByBrand);

// Deals route
router.get('/deals', getDealsProducts);

// Upcoming products
router.get('/upcoming', getPublicUpcomingProducts);

// Single product
router.get('/:id', getProduct);

export default router;