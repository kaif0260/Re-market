import mongoose from 'mongoose';

const resaleListingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  },
  orderId: {
    type: String,
    required: false
  },
  originalProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
  /** Free-form listing (no catalog / order link) */
  listingTitle: {
    type: String,
    trim: true,
    default: ''
  },
  listingBrand: {
    type: String,
    trim: true,
    default: ''
  },
  listingCategory: {
    type: String,
    trim: true,
    default: ''
  },
  condition: {
    type: String,
    enum: ['new', 'like_new', 'used'],
    required: true
  },
  resalePrice: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold', 'cancelled'],
    default: 'pending'
  },
  rejectionReason: String,
  commission: {
    type: Number,
    default: 0
  },
  commissionPercentage: {
    type: Number,
    default: 5
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderPlaced: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'escrow', 'released', 'refunded'],
    default: 'pending'
  },
  escrowAmount: Number,
  sellerRating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  views: {
    type: Number,
    default: 0
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
resaleListingSchema.index({ seller: 1 });
resaleListingSchema.index({ orderId: 1 });
resaleListingSchema.index({ status: 1 });
resaleListingSchema.index({ originalProduct: 1 });
resaleListingSchema.index({ createdAt: -1 });
resaleListingSchema.index({ resalePrice: 1 });

export default mongoose.model('ResaleListing', resaleListingSchema);
