import User from '../models/User.model.js';
import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';
import ResaleListing from '../models/ResaleListing.model.js';
import Complaint from '../models/Complaint.model.js';
import Coupon from '../models/Coupon.model.js';
import SellerWallet from '../models/SellerWallet.model.js';
import UpcomingProduct from '../models/UpcomingProduct.model.js';
import restoreOrderStock from '../utils/restoreOrderStock.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role) query.role = role;

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users'
    });
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user'
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { name, email, phone, role, isVerified } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
    if (isVerified !== undefined) user.isVerified = isVerified;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete user'
    });
  }
};

// @desc    Get all sellers
// @route   GET /api/admin/sellers
// @access  Private (Admin)
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      isSeller: true
    }).select('-password');

    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch sellers'
    });
  }
};

// @desc    Approve seller
// @route   PUT /api/admin/sellers/:id/approve
// @access  Private (Admin)
export const approveSeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.isSeller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    user.sellerInfo = user.sellerInfo || {};
    user.sellerInfo.isApproved = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Seller approved successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to approve seller'
    });
  }
};

// @desc    Reject seller
// @route   PUT /api/admin/sellers/:id/reject
// @access  Private (Admin)
export const rejectSeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.isSeller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    user.sellerInfo = user.sellerInfo || {};
    user.sellerInfo.isApproved = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Seller rejected',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reject seller'
    });
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private (Admin)
export const getAllProducts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('seller', 'name email sellerInfo.shopName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products'
    });
  }
};

// @desc    Approve product
// @route   PUT /api/admin/products/:id/approve
// @access  Private (Admin)
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.status = 'approved';
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product approved successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to approve product'
    });
  }
};

// @desc    Reject product
// @route   PUT /api/admin/products/:id/reject
// @access  Private (Admin)
export const rejectProduct = async (req, res) => {
  try {
    const { reason } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.status = 'rejected';
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product rejected',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reject product'
    });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.orderStatus = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate({
        path: 'items.product',
        select: 'name images seller brand category',
        populate: { path: 'seller', select: 'name email phone' }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const previous = order.orderStatus;
    const allowedStatuses = [
      'pending',
      'confirmed',
      'packed',
      'paid',
      'shipped',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'returned',
      'refunded'
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    if (status === 'cancelled' && previous !== 'cancelled' && previous !== 'delivered') {
      await restoreOrderStock(order);
    }

    order.orderStatus = status;

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    if (status === 'cancelled') {
      order.cancelledAt = new Date();
      order.cancelledBy = 'admin';
      if (req.body.reason) order.cancellationReason = req.body.reason;
    }

    await order.save();

    const populated = await Order.findById(order._id)
      .populate('user', 'name email phone')
      .populate({
        path: 'items.product',
        select: 'name images seller brand category',
        populate: { path: 'seller', select: 'name email phone' }
      });

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order: populated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order status'
    });
  }
};


// @desc    Get all resale listings
// @route   GET /api/admin/resale
// @access  Private (Admin)
export const getAllResaleListings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const listings = await ResaleListing.find(query)
      .populate('seller', 'name email')
      .populate('order', 'orderId')
      .populate('originalProduct')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await ResaleListing.countDocuments(query);

    res.status(200).json({
      success: true,
      count: listings.length,
      total,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch resale listings'
    });
  }
};

// @desc    Approve resale listing
// @route   PUT /api/admin/resale/:id/approve
// @access  Private (Admin)
export const approveResaleListing = async (req, res) => {
  try {
    const listing = await ResaleListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Resale listing not found'
      });
    }

    listing.status = 'approved';
    await listing.save();

    res.status(200).json({
      success: true,
      message: 'Resale listing approved',
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to approve listing'
    });
  }
};

// @desc    Reject resale listing
// @route   PUT /api/admin/resale/:id/reject
// @access  Private (Admin)
export const rejectResaleListing = async (req, res) => {
  try {
    const { reason } = req.body;
    const listing = await ResaleListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Resale listing not found'
      });
    }

    listing.status = 'rejected';
    listing.rejectionReason = reason;
    await listing.save();

    res.status(200).json({
      success: true,
      message: 'Resale listing rejected',
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reject listing'
    });
  }
};

// @desc    Get all complaints
// @route   GET /api/admin/complaints
// @access  Private (Admin)
export const getAllComplaints = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find(query)
      .populate('user', 'name email')
      .populate('order')
      .populate('product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Complaint.countDocuments(query);

    res.status(200).json({
      success: true,
      count: complaints.length,
      total,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch complaints'
    });
  }
};

// @desc    Update complaint
// @route   PUT /api/admin/complaints/:id
// @access  Private (Admin)
export const updateComplaint = async (req, res) => {
  try {
    const { status, adminResponse, priority } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    if (status) complaint.status = status;
    if (adminResponse) complaint.adminResponse = adminResponse;
    if (priority) complaint.priority = priority;

    if (status === 'resolved') {
      complaint.resolvedBy = req.user._id;
      complaint.resolvedAt = new Date();
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Complaint updated',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update complaint'
    });
  }
};

// @desc    Create coupon
// @route   POST /api/admin/coupons
// @access  Private (Admin)
export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create coupon'
    });
  }
};

// @desc    Get all coupons
// @route   GET /api/admin/coupons
// @access  Private (Admin)
export const getAllCoupons = async (req, res) => {
  try {
    const { page = 1, limit = 50, active } = req.query;
    const query = {};

    if (active !== undefined) {
      query.isActive = active === 'true';
    }

    const skip = (page - 1) * limit;

    const coupons = await Coupon.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Coupon.countDocuments(query);

    res.status(200).json({
      success: true,
      count: coupons.length,
      total,
      coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch coupons'
    });
  }
};

// @desc    Update coupon
// @route   PUT /api/admin/coupons/:id
// @access  Private (Admin)
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update coupon'
    });
  }
};

// @desc    Delete coupon
// @route   DELETE /api/admin/coupons/:id
// @access  Private (Admin)
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete coupon'
    });
  }
};

// @desc    Get analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin)
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalSellers = await User.countDocuments({ isSeller: true });
    const totalProducts = await Product.countDocuments({ status: 'approved' });
    const totalOrders = await Order.countDocuments();

    // Monthly revenue
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const monthlyOrders = await Order.find({
      createdAt: { $gte: currentMonth },
      paymentStatus: 'paid'
    });

    const monthlyRevenue = monthlyOrders.reduce(
      (sum, order) => sum + order.finalAmount,
      0
    );

    // Resale revenue
    const resaleListings = await ResaleListing.find({
      status: 'sold',
      paymentStatus: 'released'
    });

    const resaleRevenue = resaleListings.reduce(
      (sum, listing) => sum + (listing.commission || 0),
      0
    );

    // Top products
    const topProducts = await Product.find({ status: 'approved' })
      .sort({ sales: -1 })
      .limit(10)
      .select('name sales rating');

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalSellers,
        totalProducts,
        totalOrders,
        monthlyRevenue,
        resaleRevenue,
        topProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch analytics'
    });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const [pendingProducts, approvedProducts, pendingSellers, pendingResaleListings, openComplaints, upcomingProducts, recentOrders] = await Promise.all([
      Product.countDocuments({ status: 'pending' }).catch(() => 0),
      Product.countDocuments({ status: 'approved' }).catch(() => 0),
      User.countDocuments({
        isSeller: true,
        'sellerInfo.isApproved': false
      }).catch(() => 0),
      ResaleListing.countDocuments({ status: 'pending' }).catch(() => 0),
      Complaint.countDocuments({ status: 'open' }).catch(() => 0),
      UpcomingProduct.countDocuments().catch(() => 0),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email')
        .catch(() => [])
    ]);

    const couponCount = await Coupon.countDocuments().catch(() => 0);

    const stats = {
      pendingProducts,
      approvedProducts,
      pendingSellers,
      pendingResaleListings,
      openComplaints,
      upcomingCount: upcomingProducts,
      couponCount,
      recentOrders
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch dashboard stats'
    });
  }
};
