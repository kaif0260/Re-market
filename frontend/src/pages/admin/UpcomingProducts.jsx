import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from '../../api/axios'
import { FiPlus, FiEdit, FiTrash2, FiPlay, FiImage, FiVideo, FiEye, FiEyeOff, FiRefreshCw, FiX } from 'react-icons/fi'

export default function AdminUpcomingProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: 'image', // 'image' or 'video'
    mediaUrl: '',
    mediaPublicId: '',
    thumbnailUrl: '',
    thumbnailPublicId: '',
    isActive: true,
    launchDate: '',
    price: '',
    category: ''
  })

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/admin/upcoming-products')
      setProducts(data.products || [])
    } catch (err) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await axios.put(`/admin/upcoming-products/${editingProduct._id}`, formData)
      } else {
        await axios.post('/admin/upcoming-products', formData)
      }
      fetchProducts()
      resetForm()
    } catch (err) {
      // Error saving product
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      mediaType: product.mediaType,
      mediaUrl: product.mediaUrl,
      mediaPublicId: product.mediaPublicId || '',
      thumbnailUrl: product.thumbnailUrl || '',
      thumbnailPublicId: product.thumbnailPublicId || '',
      isActive: product.isActive,
      launchDate: product.launchDate ? new Date(product.launchDate).toISOString().split('T')[0] : '',
      price: product.price || '',
      category: product.category || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this upcoming product?')) {
      try {
        await axios.delete(`/admin/upcoming-products/${id}`)
        fetchProducts()
      } catch (err) {
        // Error deleting product
      }
    }
  }

  const toggleActive = async (id, currentStatus) => {
    try {
      await axios.patch(`/admin/upcoming-products/${id}/toggle`, { isActive: !currentStatus })
      fetchProducts()
    } catch (err) {
      // Error toggling status
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      mediaType: 'image',
      mediaUrl: '',
      mediaPublicId: '',
      thumbnailUrl: '',
      thumbnailPublicId: '',
      isActive: true,
      launchDate: '',
      price: '',
      category: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Manage Upcoming Products | Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upcoming Products</h1>
            <p className="text-gray-600 mt-2">Manage products and videos shown on the home page slider</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300 flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add Product
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              if (!window.confirm('This will delete all existing upcoming products and replace with sample items. Continue?')) return;
              try {
                const sample = [
                  {
                    title: 'Sample: iPhone 16 Pro',
                    description: 'Next gen iPhone sample banner',
                    mediaType: 'image',
                    mediaUrl: 'https://images.unsplash.com/photo-1632661676805-3b013666b4d8?w=800',
                    category: 'Electronics',
                    price: '₹129,900',
                    launchDate: '2025-09-20',
                    isActive: true
                  },
                  {
                    title: 'Sample: Foldable X',
                    description: 'Foldable device sample video banner',
                    mediaType: 'video',
                    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    thumbnailUrl: 'https://images.unsplash.com/photo-1682695796496-b7b5b58964eb?w=400',
                    category: 'Electronics',
                    price: 'Coming Soon',
                    isActive: true
                  }
                ];

                await axios.post('/admin/upcoming-products/replace', { products: sample });
                fetchProducts();
              } catch (err) {
                // handle error
              }
            }}
            className="ml-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
            <FiRefreshCw size={18} />
            Reset to Sample
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiImage className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiEye className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.isActive).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiVideo className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.mediaType === 'video').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiImage className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.mediaType === 'image').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="e.g., Electronics, Fashion"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Optional)</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="e.g., $299 or Coming Soon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.mediaType === 'video' ? 'Video URL or Upload' : 'Image URL or Upload'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder={formData.mediaType === 'video' ? 'https://example.com/video.mp4 or /api/uploads/filename.mp4' : 'https://example.com/image.jpg or /api/uploads/filename.jpg'}
                    required
                  />
                  <label className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-pointer flex items-center gap-2">
                    <input type="file" accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'} className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setUploading(true)
                        const fd = new FormData();
                        fd.append('file', file);
                        const res = await axios.post('/admin/uploads', fd);
                        const uploadUrl = res.data.url || '';
                        const pid = res.data.publicId || '';
                        if (!uploadUrl) {
                          toast.error('Upload response mein URL nahi mili')
                        } else {
                          toast.success('Media upload ho gayi')
                          setFormData((prev) => ({
                            ...prev,
                            mediaUrl: uploadUrl,
                            mediaPublicId: pid || prev.mediaPublicId
                          }))
                        }
                      } catch (err) {
                        toast.error(err.response?.data?.message || err.message || 'Upload fail — backend / Cloudinary check karein')
                      } finally {
                        setUploading(false)
                      }
                    }} />
                    <span className="text-sm text-gray-700">Choose</span>
                  </label>
                </div>
                {uploading && <div className="text-sm text-gray-500 mt-2">Uploading...</div>}
              </div>

              {formData.mediaType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="https://example.com/thumbnail.jpg or /api/uploads/thumbnail.jpg"
                    />
                    <label className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-pointer flex items-center gap-2">
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          setUploading(true)
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await axios.post('/admin/uploads', fd);
                          const uploadUrl = res.data.url || '';
                          const pid = res.data.publicId || '';
                          if (!uploadUrl) toast.error('Thumbnail URL nahi mili')
                          else {
                            toast.success('Thumbnail upload ho gayi')
                            setFormData((prev) => ({
                              ...prev,
                              thumbnailUrl: uploadUrl,
                              thumbnailPublicId: pid || prev.thumbnailPublicId
                            }))
                          }
                        } catch (err) {
                          toast.error(err.response?.data?.message || err.message || 'Thumbnail upload fail')
                        } finally {
                          setUploading(false)
                        }
                      }} />
                      <span className="text-sm text-gray-700">Choose</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Launch Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.launchDate}
                    onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Active (Show on homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative">
                {product.mediaType === 'video' ? (
                  <div className="relative h-48 bg-gray-100">
                    {product.thumbnailUrl ? (
                      <img
                        src={product.thumbnailUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : product.mediaUrl ? (
                      <video
                        src={product.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FiVideo size={48} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                      <FiPlay size={32} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={product.mediaUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => toggleActive(product._id, product.isActive)}
                    className={`p-2 rounded-lg transition-colors ${
                      product.isActive
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                    title={product.isActive ? 'Hide from homepage' : 'Show on homepage'}
                  >
                    {product.isActive ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                  </button>
                </div>

                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    product.mediaType === 'video'
                      ? 'bg-purple-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {product.mediaType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                {product.category && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg mb-3">
                    {product.category}
                  </span>
                )}

                {product.price && (
                  <p className="text-emerald-600 font-semibold mb-3">{product.price}</p>
                )}

                {product.launchDate && (
                  <p className="text-sm text-gray-500 mb-3">
                    Launch: {new Date(product.launchDate).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <FiEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-16">
            <FiImage size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming products</h3>
            <p className="text-gray-600">Add your first upcoming product to get started.</p>
          </div>
        )}
      </div>
    </>
  )
}