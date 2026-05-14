import Product from '../models/Product.model.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = { status: 'approved', isActive: true };

    // Filters
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) {
      query['rating.average'] = { $gte: Number(minRating) };
    }

    // Sorting
    let sortOption = {};
    switch (sort) {
      case 'price_low':
        sortOption = { price: 1 };
        break;
      case 'price_high':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { 'rating.average': -1 };
        break;
      case 'popular':
        sortOption = { sales: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('seller', 'name email')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email sellerInfo.shopName');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch product'
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const query = {
      $text: { $search: q },
      status: 'approved',
      isActive: true
    };

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('seller', 'name email')
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      query: q,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Search failed'
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.find({
      category: category,
      status: 'approved',
      isActive: true
    })
      .populate('seller', 'name email')
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({
      category: category,
      status: 'approved',
      isActive: true
    });

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      category,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products'
    });
  }
};

// @desc    Get products by brand
// @route   GET /api/products/brand/:brand
// @access  Public
export const getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.find({
      brand: brand,
      status: 'approved',
      isActive: true
    })
      .populate('seller', 'name email')
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({
      brand: brand,
      status: 'approved',
      isActive: true
    });

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      brand,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch products'
    });
  }
};
