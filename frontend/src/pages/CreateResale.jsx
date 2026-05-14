import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { toast } from 'react-toastify'

export default function CreateResale() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    brand: '',
    category: '',
    condition: 'like_new',
    resalePrice: '',
    description: '',
  })
  const [images, setImages] = useState([])

  const handleCreateListing = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) return toast.error('Please enter a title.')
    if (!form.resalePrice || Number(form.resalePrice) < 0) return toast.error('Please enter a valid price.')
    if (!form.description.trim()) return toast.error('Please enter a description.')
    if (images.length === 0) return toast.error('Please add at least one image.')

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('brand', form.brand)
      fd.append('category', form.category)
      fd.append('condition', form.condition)
      fd.append('resalePrice', form.resalePrice)
      fd.append('description', form.description)
      images.forEach((file) => fd.append('images', file))

      await axios.post('/resale/create', fd)
      toast.success('Listing submitted. It will appear after admin approval.')
      navigate('/resale')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">List a resale item</h1>
      <p className="text-gray-500 mb-6">Your listing will be reviewed by admin before it appears on the site.</p>

      <form onSubmit={handleCreateListing} className="bg-white border rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="e.g. iPhone 13 (128GB)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand (optional)</label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="e.g. Apple"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category (optional)</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="e.g. Mobiles"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
            <select
              value={form.condition}
              onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="new">New</option>
              <option value="like_new">Like new</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resale price (₹)</label>
          <input
            type="number"
            value={form.resalePrice}
            onChange={(e) => setForm((f) => ({ ...f, resalePrice: e.target.value }))}
            min="0"
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Mention condition details, accessories, warranty, etc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="w-full border rounded-xl p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit for approval'}
        </button>
      </form>
    </div>
  )
}
