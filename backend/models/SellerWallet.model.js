import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  resaleListing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResaleListing'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const walletSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalWithdrawn: {
    type: Number,
    default: 0
  },
  transactions: [transactionSchema]
}, {
  timestamps: true
});

walletSchema.index({ seller: 1 });

export default mongoose.model('SellerWallet', walletSchema);
