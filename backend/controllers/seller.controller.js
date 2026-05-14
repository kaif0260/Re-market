import User from '../models/User.model.js';
import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';
import SellerWallet from '../models/SellerWallet.model.js';
import { uploadMultipleToCloudinary } from '../utils/cloudinary.js';
import restoreOrderStock from '../utils/restoreOrderStock.js';

// @desc    Register as seller
// @route   POST /api/seller/register
// @access  Private (Seller)
export const registerAsSeller = async (req, res) => {
  try {
    const { shopName, gstin, pan, bankAccount, ifsc } = req.body;

    const user = await User.findById(req.user._id);

    if (user.isSeller) {
      return res.status(400).json({
        success: false,
        message: 'Already registered as seller'
      });
    }

    user.isSeller = true;
    user.role = 'seller';
    user.sellerInfo = {
      shopName,
      gstin,
      pan,
      bankAccount,
      ifsc,
      isApproved: false // Requires admin approval
    };

    await user.save();

    // Create wallet
    await SellerWallet.create({ seller: user._id });

    res.status(200).json({
      success: true,
      message: 'Seller registration submitted. Waiting for admin approval.',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to register as seller'
    });
  }
};

// @desc    Create product
// @route   POST /api/seller/products
// @access  Private (Seller)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      specifications,
      tags
    } = req.body;

    // Upload images → store Cloudinary HTTPS URLs only (works on all devices)
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploaded = await uploadMultipleToCloudinary(req.files, 'remarket/products');
      images = uploaded.map((u) => u.secureUrl);
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice: discountPrice || 0,
      category,
      brand,
      stock,
      images,
      seller: req.user._id,
      status: 'pending', // Requires admin approval
      specifications: specifications ? JSON.parse(specifications) : {},
      tags: tags ? tags.split(',') : []
    });

    res.status(201).json({
      success: true,
      message: 'Product created. Waiting for admin approval.',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create product'
    });
  }
};

// @desc    Get seller products
// @route   GET /api/seller/products
// @access  Private (Seller)
export const getMyProducts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    // Deleted products are marked `isActive=false`, so only active products should be returned.
    const query = { seller: req.user._id, isActive: true };

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
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

// @desc    Update product
// @route   PUT /api/seller/products/:id
// @access  Private (Seller)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      specifications,
      tags
    } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (stock !== undefined) product.stock = stock;
    if (specifications) product.specifications = JSON.parse(specifications);
    if (tags) product.tags = tags.split(',');

    // Update images if new ones uploaded
    if (req.files && req.files.length > 0) {
      const uploaded = await uploadMultipleToCloudinary(req.files, 'remarket/products');
      const newUrls = uploaded.map((u) => u.secureUrl);
      product.images = [...product.images, ...newUrls];
    }

    // If product was approved and seller makes changes, set back to pending
    if (product.status === 'approved') {
      product.status = 'pending';
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated. Waiting for admin re-approval.',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/seller/products/:id
// @access  Private (Seller)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete product'
    });
  }
};

// @desc    Get seller orders
// @route   GET /api/seller/orders
// @access  Private (Seller)
export const getSellerOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Get seller's product IDs
    const sellerProducts = await Product.find({ seller: req.user._id }).select('_id');
    const productIds = sellerProducts.map(p => p._id);

    // Find orders containing seller's products
    const query = {
      'items.product': { $in: productIds }
    };

    if (status) {
      query.orderStatus = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const filteredOrders = await Promise.all(
      orders.map(async (order) => {
        const obj = order.toObject();
        const allIds = order.items.map((i) => i.product?._id || i.product).filter(Boolean);
        const allProducts = await Product.find({ _id: { $in: allIds } }).select('seller');
        const uniqueSellerIds = [...new Set(allProducts.map((p) => p.seller.toString()))];
        const canUpdateStatus =
          uniqueSellerIds.length === 1 && uniqueSellerIds[0] === req.user._id.toString();

        obj.items = order.items.filter((item) =>
          productIds.some((id) => id.toString() === (item.product?._id || item.product).toString())
        );
        obj.canUpdateStatus = canUpdateStatus;
        obj.multiSellerOrder = uniqueSellerIds.length > 1;
        obj.sellerItemsSubtotal = obj.items.reduce(
          (sum, it) => sum + (it.quantity || 0) * (it.price || 0),
          0
        );
        return obj;
      })
    );

    // Count should reflect filtered items too (same criteria as filteredOrders)
    const total = await Order.countDocuments({
      'items.product': { $in: productIds }
    });

    res.status(200).json({
      success: true,
      count: filteredOrders.length,
      total,
      orders: filteredOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/seller/orders/:id/status
// @access  Private (Seller)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify seller owns products in order
    const sellerProducts = await Product.find({ seller: req.user._id }).select('_id');
    const productIds = sellerProducts.map(p => p._id.toString());
    const hasSellerProducts = order.items.some(item => productIds.includes(item.product.toString()));

    if (!hasSellerProducts) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    const allIds = order.items.map((i) => i.product).filter(Boolean);
    const allProducts = await Product.find({ _id: { $in: allIds } }).select('seller');
    const uniqueSellerIds = [...new Set(allProducts.map((p) => p.seller.toString()))];
    if (uniqueSellerIds.length > 1) {
      return res.status(403).json({
        success: false,
        message: 'This order includes products from multiple sellers. Only admin can change status.'
      });
    }
    if (uniqueSellerIds[0] !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    const current = order.orderStatus;

    const pipeline = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

    const normalizePipelineStatus = (s) => {
      if (s === 'paid') return 'pending';
      if (s === 'packed') return 'shipped';
      return s;
    };

    const pipelineIndex = (s) => {
      const n = normalizePipelineStatus(s);
      const i = pipeline.indexOf(n);
      return i >= 0 ? i : 0;
    };

    const allowedSellerStatuses = ['confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!allowedSellerStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status for seller update'
      });
    }

    if (status === 'cancelled') {
      if (!['pending', 'confirmed', 'paid', 'packed', 'shipped', 'out_for_delivery'].includes(current)) {
        return res.status(400).json({
          success: false,
          message: 'Order cannot be cancelled at this stage'
        });
      }

      await restoreOrderStock(order);
      order.orderStatus = 'cancelled';
      order.cancelledAt = new Date();
      order.cancelledBy = 'seller';
      if (req.body.reason) order.cancellationReason = req.body.reason;

      await order.save();

      return res.status(200).json({
        success: true,
        message: 'Order cancelled',
        order
      });
    }

    const curIdx = pipelineIndex(current);
    const targetIdx = pipelineIndex(status);
    if (targetIdx <= curIdx) {
      return res.status(400).json({
        success: false,
        message: `Choose a status ahead of the current stage (current: ${current})`
      });
    }

    order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order status'
    });
  }
};


// @desc    Get seller wallet
// @route   GET /api/seller/wallet
// @access  Private (Seller)
export const getSellerWallet = async (req, res) => {
  try {
    let wallet = await SellerWallet.findOne({ seller: req.user._id });

    if (!wallet) {
      wallet = await SellerWallet.create({ seller: req.user._id });
    }

    res.status(200).json({
      success: true,
      wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch wallet'
    });
  }
};

// @desc    Withdraw earnings
// @route   POST /api/seller/wallet/withdraw
// @access  Private (Seller)
export const withdrawEarnings = async (req, res) => {
  try {
    const { amount } = req.body;

    const wallet = await SellerWallet.findOne({ seller: req.user._id });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    wallet.balance -= amount;
    wallet.totalWithdrawn += amount;

    wallet.transactions.push({
      type: 'debit',
      amount,
      description: 'Withdrawal',
      status: 'pending'
    });

    await wallet.save();

    res.status(200).json({
      success: true,
      message: 'Withdrawal request submitted',
      wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process withdrawal'
    });
  }
};

// @desc    Get seller stats
// @route   GET /api/seller/stats
// @access  Private (Seller)
export const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;
    
    const stats = {
      totalProducts: await Product.countDocuments({ seller: sellerId }),
      approvedProducts: await Product.countDocuments({ seller: sellerId, status: 'approved' }),
      pendingProducts: await Product.countDocuments({ seller: sellerId, status: 'pending' }),
      walletBalance: await SellerWallet.aggregate([{
        $match: { seller: sellerId }
      }, {
        $group: { _id: null, balance: { $sum: '$balance' } }
      }]).then(result => result[0]?.balance || 0)
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

