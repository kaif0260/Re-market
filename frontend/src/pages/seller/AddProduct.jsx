import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

export default function AddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    brand: '',
    stock: '',
    specifications: '',
    tags: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate specifications JSON (optional)
    if (form.specifications.trim()) {
      try {
        JSON.parse(form.specifications)
      } catch {
        toast.error('Specifications must be valid JSON')
        return
      }
    }

    if (images.length === 0) {
      toast.error('Please add at least one image')
      return
    }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('description', form.description)
      fd.append('price', form.price)
      if (form.discountPrice.toString().trim() !== '') fd.append('discountPrice', form.discountPrice)
      fd.append('category', form.category)
      fd.append('brand', form.brand)
      fd.append('stock', form.stock)
      fd.append('tags', form.tags)

      if (form.specifications.trim()) fd.append('specifications', form.specifications)
      images.forEach((file) => fd.append('images', file))

      await axios.post('/seller/products', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success('Product submitted for approval')
      navigate('/seller/products')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
        <Link to="/seller/products" className="text-emerald-600">← Back</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={4}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount price (optional)</label>
            <input
              type="number"
              min="0"
              value={form.discountPrice}
              onChange={(e) => setForm((f) => ({ ...f, discountPrice: e.target.value }))}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specifications JSON (optional)
          </label>
          <textarea
            value={form.specifications}
            onChange={(e) => setForm((f) => ({ ...f, specifications: e.target.value }))}
            rows={3}
            placeholder='e.g. {"RAM":"8GB","Storage":"256GB"}'
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="e.g. mobile, android"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="w-full"
          />
          {images.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt=""
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Product'}
        </button>
      </form>
    </div>
  )
}

