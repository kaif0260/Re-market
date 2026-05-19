import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUser } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Public Routes
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import About from "./pages/About";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Returns from "./pages/Returns";
import Cookies from "./pages/Cookies";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";
import Deals from "./pages/Deals";
import GiftCards from "./pages/GiftCards";
import SellerHandbook from "./pages/SellerHandbook";
import SellerStories from "./pages/SellerStories";

// Protected Routes
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";

import Resale from "./pages/Resale";
import ResaleDetail from "./pages/ResaleDetail";
import CreateResale from "./pages/CreateResale";

// Seller Routes
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import SellerAnalytics from "./pages/seller/Analytics";
import SellerOrders from "./pages/seller/Orders";
import SellerWallet from "./pages/seller/Wallet";
import SellerRegister from "./pages/seller/Register";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminSellers from "./pages/admin/Sellers";
import AdminOrders from "./pages/admin/Orders";
import AdminResale from "./pages/admin/Resale";
import AdminComplaints from "./pages/admin/Complaints";
import AdminCoupons from "./pages/admin/Coupons";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminUpcomingProducts from "./pages/admin/UpcomingProducts";
import AdminContentManagement from "./pages/admin/ContentManagement";
import AdminSettings from "./pages/admin/Settings";

// Protected Route Component
import ProtectedRoute from "./components/routing/ProtectedRoute";

// Chatbot
import ChatBot from "./components/chatbot/ChatBot";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const initializeApp = async () => {

      const token = localStorage.getItem("token");

      if (token) {

        try {

          await dispatch(loadUser()).unwrap();

          await dispatch(fetchCart());

        } catch (error) {

          console.error(
            "Auth initialization failed:",
            error
          );

          localStorage.removeItem("token");
          localStorage.removeItem("user");

        }

      }

    };

    initializeApp();

  }, [dispatch]);

  return (

    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      <Suspense
        fallback={
          <div className="bg-gray-50 dark:bg-slate-950 min-h-screen flex items-center justify-center">

            <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />

          </div>
        }
      >

        {/* MAIN */}
        <main className="flex-grow pt-[72px] overflow-x-hidden">

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* PRODUCTS */}
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetail />}
            />

            {/* AUTH */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/verify-otp"
              element={<VerifyOTP />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* RESALE */}
            <Route
              path="/resale"
              element={<Resale />}
            />

            <Route
              path="/resale/:id"
              element={<ResaleDetail />}
            />

            <Route
              path="/resale/create"
              element={
                <ProtectedRoute>
                  <CreateResale />
                </ProtectedRoute>
              }
            />

            {/* EXTRA PAGES */}
            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/help"
              element={<HelpCenter />}
            />

            <Route
              path="/terms"
              element={<Terms />}
            />

            <Route
              path="/privacy"
              element={<Privacy />}
            />

            <Route
              path="/returns"
              element={<Returns />}
            />

            <Route
              path="/cookies"
              element={<Cookies />}
            />

            <Route
              path="/careers"
              element={<Careers />}
            />

            <Route
              path="/press"
              element={<Press />}
            />

            <Route
              path="/blog"
              element={<Blog />}
            />

            <Route
              path="/deals"
              element={<Deals />}
            />

            <Route
              path="/gift-cards"
              element={<GiftCards />}
            />

            <Route
              path="/seller/handbook"
              element={<SellerHandbook />}
            />

            <Route
              path="/seller/stories"
              element={<SellerStories />}
            />

            {/* USER */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* SELLER */}
            <Route
              path="/seller/register"
              element={
                <ProtectedRoute>
                  <SellerRegister />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute requiredRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/products"
              element={
                <ProtectedRoute requiredRole="seller">
                  <SellerProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/products/new"
              element={
                <ProtectedRoute requiredRole="seller">
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/products/:id/edit"
              element={
                <ProtectedRoute requiredRole="seller">
                  <EditProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/orders"
              element={
                <ProtectedRoute requiredRole="seller">
                  <SellerOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/wallet"
              element={
                <ProtectedRoute requiredRole="seller">
                  <SellerWallet />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/sellers"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSellers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/resale"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminResale />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/complaints"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminComplaints />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/coupons"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCoupons />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/upcoming-products"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUpcomingProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/content"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminContentManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">

                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-500 dark:text-slate-400">

                    Page Not Found

                  </h1>

                </div>
              }
            />

          </Routes>

        </main>

      </Suspense>

      {/* CHATBOT */}
      <ChatBot />

      {/* FOOTER */}
      <Footer />

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </div>

  );

}

export default App;