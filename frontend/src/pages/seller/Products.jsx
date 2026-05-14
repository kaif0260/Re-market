import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

export default function SellerProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/seller/products')
        setProducts(data.products || [])
      } catch (err) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this product?')
    if (!ok) return
    try {
      await axios.delete(`/seller/products/${id}`)
      const { data } = await axios.get('/seller/products')
      setProducts(data.products || [])
      toast.success('Product deleted')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product')
    }
  }

  const statusBadge = (s) => {
    const colors = { pending: 'bg-yellow-100 text-yellow-800', approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800' }
    return <span className={`text-xs px-2 py-1 rounded ${colors[s] || 'bg-gray-100'}`}>{s}</span>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/seller/products/new"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            + Add Product
          </Link>
          <Link to="/seller/dashboard" className="text-emerald-600">← Dashboard</Link>
        </div>
      </div>
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-12 h-12 object-cover rounded" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4">₹{p.price?.toLocaleString()}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">{statusBadge(p.status)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/seller/products/${p._id}/edit`}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center text-gray-500 py-12">No products. Add products from dashboard.</p>
          )}
        </div>
      )}
    </div>
  )
}
