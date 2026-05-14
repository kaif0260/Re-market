import UpcomingProduct from '../models/UpcomingProduct.model.js';
import { v2 as cloudinary } from 'cloudinary';

// Destroy a Cloudinary asset safely by publicId
const destroyIfPresent = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  } catch (e) {
    console.warn('Cloudinary destroy failed:', e?.message || e);
  }
};

// @desc    Get all upcoming products (admin)
// @route   GET /api/admin/upcoming-products
export const getUpcomingProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const products = await UpcomingProduct.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await UpcomingProduct.countDocuments();

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create upcoming product (admin)
// @route   POST /api/admin/upcoming-products
export const createUpcomingProduct = async (req, res) => {
  try {
    const product = await UpcomingProduct.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update upcoming product (admin)
// @route   PUT /api/admin/upcoming-products/:id
export const updateUpcomingProduct = async (req, res) => {
  try {
    const existing = await UpcomingProduct.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If publicIds are being updated, delete old assets
    if (
      req.body.mediaPublicId &&
      req.body.mediaPublicId !== existing.mediaPublicId
    ) {
      await destroyIfPresent(existing.mediaPublicId);
    }

    if (
      req.body.thumbnailPublicId &&
      req.body.thumbnailPublicId !== existing.thumbnailPublicId
    ) {
      await destroyIfPresent(existing.thumbnailPublicId);
    }

    const product = await UpcomingProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete upcoming product (admin)
// @route   DELETE /api/admin/upcoming-products/:id
export const deleteUpcomingProduct = async (req, res) => {
  try {
    const existing = await UpcomingProduct.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await destroyIfPresent(existing.mediaPublicId);
    await destroyIfPresent(existing.thumbnailPublicId);

    await UpcomingProduct.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle upcoming product active status (admin)
// @route   PATCH /api/admin/upcoming-products/:id/toggle
export const toggleUpcomingProduct = async (req, res) => {
  try {
    const product = await UpcomingProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Replace all upcoming products (admin)
// @route   POST /api/admin/upcoming-products/replace
export const replaceUpcomingProducts = async (req, res) => {
  try {
    const { products } = req.body;

    await UpcomingProduct.deleteMany({});

    let inserted = [];
    if (Array.isArray(products) && products.length > 0) {
      inserted = await UpcomingProduct.insertMany(
        products.map((p) => ({
          title: p.title,
          description: p.description,
          mediaType: p.mediaType || 'image',
          mediaUrl: p.mediaUrl || p.imageUrl || '',
          thumbnailUrl: p.thumbnailUrl || '',
          // if caller provided cloudinary publicIds, persist them for cleanup
          mediaPublicId: p.mediaPublicId,
          thumbnailPublicId: p.thumbnailPublicId,
          isActive: typeof p.isActive === 'boolean' ? p.isActive : true,
          launchDate: p.launchDate || null,
          price: p.price || '',
          category: p.category || ''
        }))
      );
    }

    res.status(200).json({
      success: true,
      count: inserted.length,
      products: inserted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Public: Get active upcoming products (videos first)
// @route   GET /api/products/upcoming
export const getPublicUpcomingProducts = async (req, res) => {
  try {
    const products = await UpcomingProduct.find({ isActive: true }).sort({ createdAt: -1 });

    const videos = products.filter((p) => p.mediaType === 'video');
    const images = products.filter((p) => p.mediaType !== 'video');

    const ordered = [...videos, ...images];

    res.status(200).json({
      success: true,
      count: ordered.length,
      products: ordered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

