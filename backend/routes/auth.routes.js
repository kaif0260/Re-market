import express from 'express';
import { body, validationResult } from 'express-validator';

import {
  register,
  verifyOTP,
  resendOTP,
  login,
  logout,
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  changePassword,
  forgotPassword,
  resetPassword,
  googleLogin
} from '../controllers/auth.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0]?.msg || 'Validation failed'
    });
  }

  next();
};

// Public routes
router.post('/register', [...registerValidation, runValidation], register);

router.post('/verify-otp', verifyOTP);

router.post('/resend-otp', resendOTP);

router.post('/login', [...loginValidation, runValidation], login);

router.post('/google-login', googleLogin);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout', protect, logout);

router.get('/profile', protect, getProfile);

router.put('/profile', protect, updateProfile);

router.post('/address', protect, addAddress);

router.put('/address/:id', protect, updateAddress);

router.delete('/address/:id', protect, deleteAddress);

router.put('/change-password', protect, changePassword);

export default router;