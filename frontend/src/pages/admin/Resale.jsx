import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

export default function AdminResale() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get('/admin/resale')
        setListings(data.listings || [])
      } catch (err) {
        setListings([])
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleApprove = async (id) => {
    try {
      await axios.put(`/admin/resale/${id}/approve`)
      setListings((prev) => prev.map((l) => (l._id === id ? { ...l, status: 'approved' } : l)))
      toast.success('Listing approved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`/admin/resale/${id}/reject`, { reason: 'Rejected by admin' })
      setListings((prev) => prev.map((l) => (l._id === id ? { ...l, status: 'rejected' } : l)))
      toast.success('Listing rejected')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resale Listings</h1>
      {loading ? <div className="h-64 bg-gray-100 rounded-xl animate-pulse" /> : (
        <div className="space-y-4">
          {listings.map((l) => (
            <div key={l._id} className="flex items-center gap-4 p-4 border rounded-xl">
              <img src={l.images?.[0]} alt="" className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{l.originalProduct?.name}</p>
                <p className="text-sm text-gray-500">{l.seller?.name} • ₹{l.resalePrice?.toLocaleString()} • {l.status}</p>
              </div>
              {l.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(l._id)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
                  <button onClick={() => handleReject(l._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
                </div>
              )}
            </div>
          ))}
          {listings.length === 0 && <p className="text-center text-gray-500 py-12">No listings.</p>}
        </div>
      )}
    </div>
  )
}
