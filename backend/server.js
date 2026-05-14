import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Define ESM __dirname early
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import reviewRoutes from './routes/review.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import adminRoutes from './routes/admin.routes.js';
import resaleRoutes from './routes/resale.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import { razorpayWebhook } from './controllers/payment.controller.js';

// Load environment variables (env.local overrides .env)
dotenv.config({ path: path.join(__dirname, 'env.local') });

if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'remarket_dev_secret_change_in_production';
if (!process.env.MONGODB_URI) process.env.MONGODB_URI = 'mongodb://localhost:27017/remarket';

const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Security Middleware — allow Cloudinary + local /uploads in CSP (default helmet blocks external images/videos)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://res.cloudinary.com',
          'http://localhost:5000',
          'http://127.0.0.1:5000',
          'https://images.unsplash.com'
        ],
        'media-src': [
          "'self'",
          'blob:',
          'https://res.cloudinary.com',
          'http://localhost:5000',
          'http://127.0.0.1:5000'
        ],
        'connect-src': ["'self'", 'http://localhost:5000', 'http://127.0.0.1:5000', 'https:']
      }
    }
  })
);
app.use(cors({
  origin: true,  // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Razorpay webhooks require raw body + must run before express.json() and before /api rate limiter
app.post(
  '/api/payment/webhook',
  express.raw({ type: 'application/json' }),
  razorpayWebhook
);

// Rate Limiting
// Rate Limiting
// Apply with stricter scope: throttle auth endpoints separately to avoid blocking normal user flows.
// NOTE: Admin login should not be blocked by heavy traffic from other endpoints.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
});
// Throttle ONLY auth routes to prevent accidental global 429 from other API traffic.
app.use('/api/auth', authLimiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling for malformed JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON' });
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await createTestAdmin();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.warn('⚠️  Server will start without database connection. Some features may not work.');
  });



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/resale', resaleRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupons', couponRoutes);

// Auto-create/repair test admin user
// Fixes cases where admin exists but role/isVerified/password are inconsistent.
const createTestAdmin = async () => {
  try {
    const { default: User } = await import('./models/User.model.js');

    const adminEmail = 'admin@remarket.com';
    const adminPassword = 'admin123';

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        phone: '+919000900001',
        password: adminPassword,
        role: 'admin',
        isSeller: false,
        isVerified: true
      });
      console.log('✅ Test admin created: admin@remarket.com / admin123');
      return;
    }

    // Force required fields
    let needsSave = false;

    if (admin.role !== 'admin') {
      admin.role = 'admin';
      needsSave = true;
    }

    if (!admin.isVerified) {
      admin.isVerified = true;
      needsSave = true;
    }

    if (!admin.phone) {
      admin.phone = '+919000900001';
      needsSave = true;
    }

    // IMPORTANT: reset password to known value to recover from stale hashes
    admin.password = adminPassword;
    needsSave = true;

    if (needsSave) await admin.save();
    console.log('✅ Test admin repaired: admin@remarket.com / admin123');
  } catch (err) {
    console.error('Test admin check failed:', err.message);
  }
};

// Health Check with DB status
app.get('/api/health', async (req, res) => {
  try {
    // Dynamic import to avoid model loading issues
    const { default: User } = await import('./models/User.model.js').catch(() => ({ default: { countDocuments: () => 0 } }));
    const userCount = await User.countDocuments().catch(() => 0);
    res.json({ 
      status: 'OK', 
      message: 'Server running', 
      dbConnected: mongoose.connection.readyState === 1,
      userCount,
      testLogin: 'admin@remarket.com / admin123'
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', message: err.message });
  }
});

// Debug endpoint (remove in production)
app.get('/api/debug/auth-status', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    res.json({
      dbConnected: mongoose.connection.readyState === 1,
      hasToken: !!token,
      testAdmin: 'admin@remarket.com / admin123',
      env: {
        hasEmail: !!process.env.EMAIL_USER,
        jwtSecret: !!process.env.JWT_SECRET,
        mongoUri: !!process.env.MONGODB_URI
      }
 
 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dev helper: reset or create test admin (DEV ONLY)
app.post('/api/debug/reset-admin', async (req, res) => {
  try {
    const { password = 'admin123', email = 'admin@remarket.com' } = req.body || {};
    const { default: User } = await import('./models/User.model.js');

    let admin = await User.findOne({ email });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email,
        password,
        phone: '+911111111111',
        role: 'admin',
        isSeller: false,
        isVerified: true
      });
      return res.json({ success: true, message: 'Admin created', email: admin.email });
    }

    admin.password = password;
    admin.phone = admin.phone || '+911111111111';
    admin.isVerified = true;
    await admin.save();

    res.json({ success: true, message: 'Admin password reset' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Dev helper: reset or create test customer user (DEV ONLY)
app.post('/api/debug/reset-test-user', async (req, res) => {
  try {
    const { password = '123456', email = 'test@example.com' } = req.body || {};
    const { default: User } = await import('./models/User.model.js');

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: 'Test User',
        email,
        password,
        phone: '+919999888777',
        role: 'customer',
        isSeller: false,
        isVerified: true
      });

      return res.json({ success: true, message: 'Test user created', email: user.email });
    }

    user.password = password;
    user.phone = user.phone || '+919999888777';
    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: 'Test user password reset' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Global error handlers to prevent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Multer / upload errors (e.g. file too large)
app.use((err, req, res, next) => {
  if (!err) return next();
  if (err.name === 'MulterError') {
    return res.status(400).json({ success: false, message: err.message || 'File upload error' });
  }
  if (typeof err.message === 'string' && err.message.includes('Only image') && err.message.includes('video')) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
});

// 🚀 Start Server on PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test login: POST /api/auth/login {"email":"test@example.com","password":"123456"}`);
});
