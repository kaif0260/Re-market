import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/admin/products')
        setProducts(data.products || [])
      } catch (err) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleApprove = async (id) => {
    try {
      await axios.put(`/admin/products/${id}/approve`)
      setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, status: 'approved' } : p)))
      toast.success('Product approved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`/admin/products/${id}/reject`)
      setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, status: 'rejected' } : p)))
      toast.success('Product rejected')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      {loading ? <div className="h-64 bg-gray-100 rounded-xl animate-pulse" /> : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p._id} className="flex items-center gap-4 p-4 border rounded-xl">
              <img src={p.images?.[0]} alt="" className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">{p.seller?.name} • {p.status}</p>
              </div>
              {p.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(p._id)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
                  <button onClick={() => handleReject(p._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
                </div>
              )}
            </div>
          ))}
          {products.length === 0 && <p className="text-center text-gray-500 py-12">No products.</p>}
        </div>
      )}
    </div>
  )
}
