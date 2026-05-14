import Order from '../models/Order.model.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpay = null;

// Initialize Razorpay only if keys exist
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// ================= CREATE RAZORPAY ORDER =================
export const createRazorpayOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay not configured'
      });
    }

    const { orderId, _id } = req.body;

    // Accept either Mongo _id OR orderId(string) from client
    const order = await Order.findOne({
      user: req.user._id,
      ...( _id ? { _id } : { orderId })
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const options = {
      amount: order.finalAmount * 100,
      currency: 'INR',
      receipt: order.orderId,
      notes: {
        orderId: order.orderId,
        userId: req.user._id.toString()
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order: razorpayOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment order'
    });
  }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, _id, paymentId, signature, paymentMethod } = req.body;

    // Accept either Mongo _id OR orderId(string) from client
    const order = await Order.findOne({
      user: req.user._id,
      ...( _id ? { _id } : { orderId })
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (paymentMethod !== 'cod') {
      if (!process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({
          success: false,
          message: 'Razorpay secret not configured'
        });
      }

      const text = orderId + '|' + paymentId;
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed'
        });
      }
    }

    order.paymentStatus = 'paid';
    if (paymentId) order.paymentId = paymentId;

    // Online payment success → move into fulfilment pipeline
    if (['pending', 'paid', 'packed'].includes(order.orderStatus)) {
      order.orderStatus = 'confirmed';
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

// ================= GENERIC PAYMENT =================
export const createPayment = async (req, res) => {
  try {
    const { orderId, _id, paymentMethod } = req.body;

    // Accept either Mongo _id OR orderId(string) from client
    const order = await Order.findOne({
      user: req.user._id,
      ...( _id ? { _id } : { orderId })
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (paymentMethod === 'cod') {
      order.paymentStatus = 'paid';
      if (['pending', 'paid', 'packed'].includes(order.orderStatus)) {
        order.orderStatus = 'confirmed';
      }
      await order.save();

      return res.status(200).json({
        success: true,
        message: 'Order placed successfully (COD)',
        order
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proceed with payment',
      orderId: order.orderId,
      amount: order.finalAmount
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process payment'
    });
  }
};

/**
 * Razorpay server-to-server webhook (e.g. payment.captured).
 * Configure URL in Razorpay Dashboard → Webhooks. Set RAZORPAY_WEBHOOK_SECRET to the signing secret shown there.
 * Falls back to RAZORPAY_KEY_SECRET only if webhook secret is unset (not recommended for production).
 */
export const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    if (!webhookSecret) {
      return res.status(500).send('Webhook secret not configured');
    }

    const signature = req.headers['x-razorpay-signature'];
    if (!signature || typeof signature !== 'string') {
      return res.status(400).send('Missing signature');
    }

    const raw = req.body;
    const payloadString = Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw || '');

    const expectedSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(payloadString)
      .digest('hex');

    if (expectedSig !== signature) {
      console.warn('Razorpay webhook: signature mismatch');
      return res.status(400).send('Invalid signature');
    }

    let event;
    try {
      event = JSON.parse(payloadString);
    } catch {
      return res.status(400).send('Invalid JSON');
    }

    const evt = event.event;
    if (evt !== 'payment.captured') {
      return res.status(200).json({ received: true, ignored: evt });
    }

    const pay = event.payload?.payment?.entity;
    const rpOrderId = pay?.order_id;
    if (!rpOrderId) {
      return res.status(200).json({ received: true, ignored: 'no payment.order_id' });
    }

    if (!razorpay) {
      return res.status(503).send('Razorpay not configured');
    }

    let rpOrder;
    try {
      rpOrder = await razorpay.orders.fetch(rpOrderId);
    } catch (e) {
      console.error('Razorpay webhook: orders.fetch failed', e?.message || e);
      return res.status(200).json({ received: true, error: 'fetch_failed' });
    }

    const ourOrderId = rpOrder?.notes?.orderId || rpOrder?.receipt;
    if (!ourOrderId) {
      return res.status(200).json({ received: true, ignored: 'no_receipt_or_note' });
    }

    const order = await Order.findOne({ orderId: String(ourOrderId) });
    if (!order) {
      return res.status(200).json({ received: true, ignored: 'order_not_found' });
    }

    if (order.paymentStatus === 'paid' && order.orderStatus === 'confirmed') {
      return res.status(200).json({ received: true, idempotent: true });
    }

    order.paymentStatus = 'paid';
    if (pay?.id) order.paymentId = pay.id;
    if (['pending', 'paid', 'packed'].includes(order.orderStatus)) {
      order.orderStatus = 'confirmed';
    }

    await order.save();
    return res.status(200).json({ received: true, orderId: order.orderId });
  } catch (err) {
    console.error('Razorpay webhook:', err);
    return res.status(500).send('Webhook handler error');
  }
};
