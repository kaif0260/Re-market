import mongoose from 'mongoose';

const upcomingProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
    required: true
  },
  mediaUrl: {
    type: String,
    required: [true, 'Media URL is required']
  },
  thumbnailUrl: {
    type: String
  },

  // Cloudinary-only cleanup support
  mediaPublicId: {
    type: String
  },
  thumbnailPublicId: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  },
  launchDate: {
    type: Date
  },
  price: {
    type: String // "₹299" or "Coming Soon"
  },
  category: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes
upcomingProductSchema.index({ isActive: 1 });
upcomingProductSchema.index({ category: 1 });
upcomingProductSchema.index({ createdAt: -1 });

export default mongoose.model('UpcomingProduct', upcomingProductSchema);

