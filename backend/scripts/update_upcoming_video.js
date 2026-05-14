import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UpcomingProduct from '../models/UpcomingProduct.model.js';

dotenv.config({ path: './env.local' });
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/remarket';

async function main() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await UpcomingProduct.updateMany({ isActive: true }, {
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop'
  });
  console.log('Updated active upcoming video items', result.modifiedCount);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
