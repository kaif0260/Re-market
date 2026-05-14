# Re-Market – Multi-Vendor E-Commerce Marketplace

A full-stack MERN e-commerce platform with **verified resale**: customers can resell only items they purchased on Re-Market. Built with React, Node.js, Express, and MongoDB.

## Features

- **Customer**: Register (OTP), login, browse products, search/filter/sort, cart, wishlist, checkout (COD/UPI/Card/Net Banking), order tracking, returns, profile, addresses
- **Seller**: Register as seller, add/edit products (admin approval), manage orders, wallet, withdraw earnings
- **Admin**: Users & sellers management, approve/reject products and resale listings, complaints, coupons, analytics
- **Verified Resale**: List items only from delivered orders; order ID verification, escrow, commission, verified badge

## Tech Stack

- **Frontend**: React 18, Vite, Redux Toolkit, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Storage**: Cloudinary (images)
- **Payment**: Razorpay-ready

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- (Optional) Cloudinary and Razorpay accounts for images and payments

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (use the variables from `backend/.env.example` if available, or set):

- `PORT=5000`
- `MONGODB_URI=your_mongodb_connection_string`
- `JWT_SECRET=your_jwt_secret`
- `FRONTEND_URL=http://localhost:3000`
- (Optional) Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- (Optional) Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- (Optional) Email (OTP): `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

Then:

```bash
npm run dev
```

Backend runs at **http://localhost:5000**.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000** and proxies `/api` to the backend.

### 3. Use the site

- Open **http://localhost:3000**
- **Register** → verify with OTP (if email is configured) or use the token from the API response for testing
- **Products** → browse; use search and filters
- **Resale** → view verified resale listings; “Sell an item” to create a listing (requires a delivered order)
- **Cart** → add items, go to checkout, place order
- **Seller**: Register as seller (Profile/Dashboard), then use Seller Dashboard to add products and manage orders
- **Admin**: Create an admin user in the database (`role: 'admin'`) to access the Admin Dashboard

## Project structure

```
Re-market/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Deployment

- **Frontend**: Build with `npm run build` in `frontend/`, then deploy the `dist/` folder to Vercel or Netlify. Set `VITE_API_URL` to your backend API URL.
- **Backend**: Deploy to Render, Railway, or AWS. Set `FRONTEND_URL` and `MONGODB_URI` (and other env vars) in the host’s environment.
- **Database**: Use MongoDB Atlas and set `MONGODB_URI` in the backend.

---

**Re-Market** – Buy. Sell. Verified.
