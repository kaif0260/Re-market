import Order from '../models/Order.model.js';
import ResaleListing from '../models/ResaleListing.model.js';
import Product from '../models/Product.model.js';
import SellerWallet from '../models/SellerWallet.model.js';
import { uploadMultipleToCloudinary } from '../utils/cloudinary.js';

// @desc    Verify order for resale
// @route   POST /api/resale/verify-order
// @access  Private
export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find order in database
    const order = await Order.findOne({
      orderId,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or does not belong to you'
      });
    }

    // Verify order conditions
    if (order.orderStatus !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order must be delivered before resale'
      });
    }

    if (order.orderStatus === 'cancelled' || order.orderStatus === 'returned') {
      return res.status(400).json({
        success: false,
        message: 'Cancelled or returned orders cannot be resold'
      });
    }

    // Filter items that can be resold (not already resold)
    const resalableItems = order.items.filter(item => !item.resaleUsed);

    if (resalableItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'All items from this order have already been resold'
      });
    }

    // Check if any items are already listed for resale
    const existingListings = await ResaleListing.find({
      order: order._id,
      status: { $in: ['pending', 'approved'] }
    });

    const listedProductIds = existingListings
      .map((l) => (l.originalProduct ? l.originalProduct.toString() : null))
      .filter(Boolean);
    const availableItems = resalableItems.filter(
      item => !listedProductIds.includes(item.product._id.toString())
    );

    res.status(200).json({
      success: true,
      message: 'Order verified successfully',
      order: {
        orderId: order.orderId,
        items: availableItems.map(item => ({
          productId: item.product._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify order'
    });
  }
};

// @desc    Create resale listing (any item — no order ID required; admin approves before public)
// @route   POST /api/resale/create
// @access  Private
export const createResaleListing = async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      condition,
      resalePrice,
      description
    } = req.body;

    const titleTrim = (title || '').trim();
    if (!titleTrim) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!description || !String(description).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Description is required'
      });
    }

    const price = Number(resalePrice);
    if (!Number.isFinite(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid resale price is required'
      });
    }

    const allowedCond = ['new', 'like_new', 'used'];
    const cond = allowedCond.includes(condition) ? condition : 'like_new';

    let images = [];
    if (req.files && req.files.length > 0) {
      const uploaded = await uploadMultipleToCloudinary(req.files, 'remarket/resale');
      images = uploaded.map((u) => u.secureUrl);
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    const commissionPercentage = Number(process.env.RESALE_COMMISSION) || 5;
    const commission = (price * commissionPercentage) / 100;

    const listing = await ResaleListing.create({
      seller: req.user._id,
      listingTitle: titleTrim,
      listingBrand: (brand || '').trim(),
      listingCategory: (category || '').trim(),
      condition: cond,
      resalePrice: price,
      images,
      description: String(description).trim(),
      commission,
      commissionPercentage,
      status: 'pending',
      verifiedPurchase: false
    });

    res.status(201).json({
      success: true,
      message: 'Listing submitted. It will appear on the site after admin approval.',
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create resale listing'
    });
  }
};

// @desc    Get all resale listings
// @route   GET /api/resale
// @access  Public
export const getResaleListings = async (req, res) => {
  try {
    const { condition, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const query = { status: 'approved' };

    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.resalePrice = {};
      if (minPrice) query.resalePrice.$gte = Number(minPrice);
      if (maxPrice) query.resalePrice.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const listings = await ResaleListing.find(query)
      .populate('seller', 'name email')
      .populate('originalProduct', 'name brand category')
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

// @desc    Get single resale listing
// @route   GET /api/resale/:id
// @access  Public
export const getResaleListing = async (req, res) => {
  try {
    const listing = await ResaleListing.findById(req.params.id)
      .populate('seller', 'name email sellerRating')
      .populate('originalProduct', 'name brand category specifications')
      .populate('order', 'orderId');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Resale listing not found'
      });
    }

    if (listing.status !== 'approved') {
      return res.status(404).json({
        success: false,
        message: 'Listing not available'
      });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.status(200).json({
      success: true,
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch resale listing'
    });
  }
};

// @desc    Get my resale listings
// @route   GET /api/resale/my/listings
// @access  Private
export const getMyResaleListings = async (req, res) => {
  try {
    const listings = await ResaleListing.find({ seller: req.user._id })
      .populate('originalProduct', 'name brand')
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch listings'
    });
  }
};

// @desc    Purchase resale item
// @route   POST /api/resale/:id/purchase
// @access  Private
export const purchaseResaleItem = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const listing = await ResaleListing.findById(req.params.id)
      .populate('seller')
      .populate('originalProduct');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Resale listing not found'
      });
    }

    if (listing.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Listing is not available for purchase'
      });
    }

    if (listing.seller._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot purchase your own listing'
      });
    }

    const lineName =
      listing.originalProduct?.name || listing.listingTitle || 'Resale item';
    const lineProductId = listing.originalProduct?._id || listing.originalProduct;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: [{
        product: lineProductId || undefined,
        name: lineName,
        price: listing.resalePrice,
        quantity: 1,
        image: listing.images[0]
      }],
      shippingAddress,
      paymentMethod,
      totalAmount: listing.resalePrice,
      discount: 0,
      shippingCharges: 0,
      finalAmount: listing.resalePrice
    });

    // Update listing
    listing.buyer = req.user._id;
    listing.orderPlaced = order._id;
    listing.status = 'sold';
    listing.paymentStatus = 'escrow';
    listing.escrowAmount = listing.resalePrice;

    if (listing.order) {
      const originalOrder = await Order.findById(listing.order);
      if (originalOrder && listing.originalProduct) {
        const oid = listing.originalProduct._id
          ? listing.originalProduct._id.toString()
          : listing.originalProduct.toString();
        const orderItem = originalOrder.items.find(
          (item) => item.product && item.product.toString() === oid
        );
        if (orderItem) {
          orderItem.resaleUsed = true;
          await originalOrder.save();
        }
      }
    }

    await listing.save();

    res.status(201).json({
      success: true,
      message: 'Purchase initiated. Payment will be held in escrow.',
      order,
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process purchase'
    });
  }
};
