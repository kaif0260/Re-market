import Order from '../models/Order.model.js';
import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
import Coupon from '../models/Coupon.model.js';
import restoreOrderStock from '../utils/restoreOrderStock.js';

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, couponCode } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate stock and calculate totals
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = (product.discountPrice || product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        seller: product.seller,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: item.quantity,
        image: product.images[0]
      });
    }

    // Apply coupon if provided
    let discount = 0;
    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
      });

      if (coupon) {
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          return res.status(400).json({
            success: false,
            message: 'Coupon usage limit exceeded'
          });
        }

        if (coupon.usersUsed.includes(req.user._id)) {
          return res.status(400).json({
            success: false,
            message: 'Coupon already used by you'
          });
        }

        if (totalAmount >= coupon.minPurchase) {
          if (coupon.discountType === 'percentage') {
            discount = (totalAmount * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
              discount = Math.min(discount, coupon.maxDiscount);
            }
          } else {
            discount = coupon.discountValue;
          }
        }
      }
    }

    const shippingCharges = totalAmount > 500 ? 0 : 50; // Free shipping above 500
    const finalAmount = totalAmount - discount + shippingCharges;

    // Create order
    // NOTE: Order model requires `orderId`. Pre-save hooks may not run reliably for Order.create,
    // so generate it explicitly here to avoid: "orderId: Path `orderId` is required."
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const generatedOrderId = `ORD${timestamp}${random}`;

    const order = await Order.create({
      orderId: generatedOrderId,
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      discount,
      shippingCharges,
      finalAmount,
      coupon: coupon?._id
    });

    // Update stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity, sales: item.quantity }
      });
    }

    // Update coupon usage
    if (coupon) {
      coupon.usedCount += 1;
      coupon.usersUsed.push(req.user._id);
      await coupon.save();
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders'
    });
  }
};

// @desc    Get order history
// @route   GET /api/orders/history
// @access  Private
export const getOrderHistory = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };

    if (status) {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order history'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'items.product',
        select: 'name images seller brand category',
        populate: { path: 'seller', select: 'name email phone' }
      })
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const uid = req.user._id.toString();
    const buyerId = order.user?._id ? order.user._id.toString() : order.user.toString();
    const isBuyer = buyerId === uid;
    const isAdmin = req.user.role === 'admin';

    let isInvolvedSeller = false;
    if (req.user.role === 'seller') {
      const myProductIds = await Product.find({ seller: req.user._id }).distinct('_id');
      const mySet = new Set(myProductIds.map(String));
      isInvolvedSeller = order.items.some((it) => {
        const pid = it.product?._id?.toString() || it.product?.toString();
        return pid && mySet.has(pid);
      });
    }

    if (!isBuyer && !isAdmin && !isInvolvedSeller) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    const allProductIds = order.items.map((i) => i.product?._id || i.product).filter(Boolean);
    const allProducts = await Product.find({ _id: { $in: allProductIds } }).select('seller');
    const uniqueSellerIds = [...new Set(allProducts.map((p) => p.seller.toString()))];
    const canUpdateStatus =
      req.user.role === 'seller' &&
      uniqueSellerIds.length === 1 &&
      uniqueSellerIds[0] === uid;

    const base = order.toObject();
    base.canUpdateStatus = canUpdateStatus;
    base.multiSellerOrder = uniqueSellerIds.length > 1;

    if (isInvolvedSeller && !isBuyer && !isAdmin) {
      const myProductIds = await Product.find({ seller: req.user._id }).distinct('_id');
      const mySet = new Set(myProductIds.map(String));
      base.items = base.items.filter((it) => {
        const pid = it.product?._id?.toString() || it.product?.toString();
        return pid && mySet.has(pid);
      });
      base.sellerItemsSubtotal = base.items.reduce(
        (sum, it) => sum + (it.quantity || 0) * (it.price || 0),
        0
      );
    }

    res.status(200).json({
      success: true,
      order: base
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    if (!['pending', 'confirmed', 'paid'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    await restoreOrderStock(order);

    order.orderStatus = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelledBy = 'user';
    order.cancellationReason = reason;
    order.paymentStatus = order.paymentStatus === 'paid' ? 'refunded' : 'pending';

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel order'
    });
  }
};

// @desc    Request return
// @route   POST /api/orders/:id/return
// @access  Private
export const requestReturn = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (order.orderStatus !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Only delivered orders can be returned'
      });
    }

    if (order.returnRequest.requested) {
      return res.status(400).json({
        success: false,
        message: 'Return already requested'
      });
    }

    order.returnRequest = {
      requested: true,
      reason,
      status: 'pending',
      requestedAt: new Date()
    };

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Return request submitted',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to request return'
    });
  }
};
