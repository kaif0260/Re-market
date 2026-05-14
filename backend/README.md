# Re-Market Backend

Multi-Vendor E-Commerce Marketplace Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
   - MongoDB Atlas connection string
   - JWT secret
   - Cloudinary credentials
   - Razorpay keys
   - Email configuration

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/search?q=query` - Search products

### Cart & Wishlist
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:itemId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id/cancel` - Cancel order

### Seller
- `POST /api/seller/register` - Register as seller
- `POST /api/seller/products` - Create product
- `GET /api/seller/orders` - Get seller orders

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/products/:id/approve` - Approve product
- `GET /api/admin/analytics` - Get analytics

### Resale
- `POST /api/resale/verify-order` - Verify order for resale
- `POST /api/resale/create` - Create resale listing
- `GET /api/resale` - Get all resale listings

## Features

- ✅ JWT Authentication
- ✅ OTP Verification
- ✅ Role-based Access Control
- ✅ Product Management
- ✅ Order Management
- ✅ Payment Integration (Razorpay)
- ✅ Verified Resale System
- ✅ Seller Dashboard
- ✅ Admin Panel
- ✅ Cloudinary Image Upload
