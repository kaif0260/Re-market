import mongoose from 'mongoose';
import User from '../models/User.model.js';
import Product from '../models/Product.model.js';
import ResaleListing from '../models/ResaleListing.model.js';
import UpcomingProduct from '../models/UpcomingProduct.model.js';
import Order from '../models/Order.model.js';
import SellerWallet from '../models/SellerWallet.model.js';

// Connect to DB and seed
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/remarket');
    console.log('✅ Connected to DB for seeding');

    // Clear existing data (optional)
    await Promise.all([
      Product.deleteMany({}),
      ResaleListing.deleteMany({}),
      UpcomingProduct.deleteMany({}),
      SellerWallet.deleteMany({})
    ]);
    console.log('🗑️ Cleared existing data');

    // Create test seller if needed
    let seller = await User.findOne({ email: 'seller@test.com' });
    if (!seller) {
      seller = await User.create({
        name: 'Test Seller',
        email: 'seller@test.com',
        password: '123456', // Will be hashed
        phone: '+919876543210',
        isSeller: true,
        role: 'seller',
        sellerInfo: { shopName: 'Test Shop', isApproved: true }
      });
      await SellerWallet.create({ seller: seller._id, balance: 5000 });
    }

    // Sample Products
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip',
        price: 99999,
        category: 'Electronics',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1693390132431-95ec35c40299?w=500'],
        stock: 10,
        seller: seller._id,
        status: 'approved'
      },
      {
        name: 'MacBook Pro M3',
        description: 'High performance laptop',
        price: 199999,
        category: 'Electronics',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
        stock: 5,
        seller: seller._id,
        status: 'pending'
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Flagship Android phone',
        price: 79999,
        category: 'Electronics',
        brand: 'Samsung',
        images: ['https://images.unsplash.com/photo-1701363687555-c983714ab3f0?w=500'],
        stock: 15,
        seller: seller._id,
        status: 'approved'
      }
    ]);

    // Sample Resale Listings
    await ResaleListing.insertMany([
      {
        seller: seller._id,
        orderId: 'ORDER001',
        originalProduct: products[0]._id,
        condition: 'like_new',
        resalePrice: 85000,
        images: ['https://images.unsplash.com/photo-1693390132431-95ec35c40299?w=400'],
        description: 'iPhone 15 Pro in excellent condition, used for 2 months',
        status: 'pending'
      }
    ]);

    // Sample Upcoming Products
    await UpcomingProduct.insertMany([
      {
        title: 'iPhone 16 Pro Max',
        description: 'Next generation flagship with revolutionary camera system',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1632661676805-3b013666b4d8?w=800',
        category: 'Electronics',
        price: '₹1,29,900',
        launchDate: '2024-09-20'
      },
      {
        title: 'Samsung Fold 6 Launch',
        description: 'Latest foldable innovation from Samsung',
        mediaType: 'video',
        mediaUrl: 'https://images.unsplash.com/photo-1682695796496-b7b5b58964eb?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1682695796496-b7b5b58964eb?w=400',
        category: 'Electronics',
        price: 'Coming Soon'
      }
    ]);

    console.log('✅ Seeding complete! Added 3 products, 1 resale, 2 upcoming');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();

