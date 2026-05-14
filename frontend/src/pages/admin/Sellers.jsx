import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

export default function AdminSellers() {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get('/admin/sellers')
        setSellers(data.sellers || [])
      } catch {
        setSellers([])
      } finally {
        setLoading(false)
      }
    }
    fetchSellers()
  }, [])

  const pendingSellers = sellers.filter((s) => !s.sellerInfo?.isApproved)

  const handleApprove = async (id) => {
    try {
      await axios.put(`/admin/sellers/${id}/approve`)
      setSellers((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, sellerInfo: { ...(s.sellerInfo || {}), isApproved: true } } : s
        )
      )
      toast.success('Seller approved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to approve seller')
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`/admin/sellers/${id}/reject`)
      setSellers((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, sellerInfo: { ...(s.sellerInfo || {}), isApproved: false } } : s
        )
      )
      toast.success('Seller rejected (still pending approval)')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reject seller')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Sellers</h1>

      {loading ? (
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      ) : (
        <div className="space-y-4">
          {pendingSellers.map((s) => (
            <div key={s._id} className="flex items-center gap-4 p-4 border rounded-xl">
              <div className="flex-1">
                <p className="font-medium">{s.sellerInfo?.shopName || 'Shop'}</p>
                <p className="text-sm text-gray-500">
                  {s.name} • {s.email}
                </p>
                {s.sellerInfo?.gstin && (
                  <p className="text-sm text-gray-500">GSTIN: {s.sellerInfo.gstin}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(s._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(s._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {pendingSellers.length === 0 && (
            <p className="text-center text-gray-500 py-12">No pending sellers.</p>
          )}
        </div>
      )}
    </div>
  )
}

