import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import StatCard from '../../components/dashboard/StatCard'
import Icons from '../../components/icons/Icons'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pendingProducts, setPendingProducts] = useState([])
  const [pendingSellers, setPendingSellers] = useState([])
  const [actionLoading, setActionLoading] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get('/admin/dashboard')
      setStats(data.stats || {})
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard')
      setStats(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchPending = async () => {
    try {
      const [pRes, sRes] = await Promise.all([
        axios.get('/admin/products?status=pending'),
        axios.get('/admin/sellers')
      ])
      setPendingProducts(pRes.data.products || [])
      // sellers endpoint returns all sellers; filter unapproved
      setPendingSellers((sRes.data.sellers || []).filter(s => !s.sellerInfo?.isApproved))
    } catch (err) {
      console.error('Failed to fetch pending items', err)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchPending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doAction = async (fn, successMsg) => {
    setActionLoading(true)
    try {
      await fn()
      toast.success(successMsg)
      await fetchStats()
      await fetchPending()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed')
    } finally {
      setActionLoading(false)
    }
  }

  const approveProduct = (id) => doAction(() => axios.put(`/admin/products/${id}/approve`), 'Product approved')
  const rejectProduct = (id) => doAction(() => axios.put(`/admin/products/${id}/reject`), 'Product rejected')
  const approveSeller = (id) => doAction(() => axios.put(`/admin/sellers/${id}/approve`), 'Seller approved')
  const rejectSeller = (id) => doAction(() => axios.put(`/admin/sellers/${id}/reject`), 'Seller rejected')

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>
  )

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-red-600">{error}</div>
      <div className="flex gap-2">
        <button onClick={fetchStats} className="px-4 py-2 bg-emerald-600 text-white rounded">Retry</button>
        <Link to="/" className="px-4 py-2 border rounded">Home</Link>
      </div>
    </div>
  )

  const cards = [
    { label: 'Pending Products', value: stats?.pendingProducts ?? 0, to: '/admin/products', Icon: Icons.FiPackage, bgColor: 'bg-orange-500' },
    { label: 'Orders', value: stats?.recentOrders?.length ?? 0, to: '/admin/orders', Icon: Icons.FiShoppingCart, bgColor: 'bg-indigo-500' },
    { label: 'Coupons', value: stats?.couponCount ?? 0, to: '/admin/coupons', Icon: Icons.FiTicket, bgColor: 'bg-pink-500' },
    { label: 'Pending Resale', value: stats?.pendingResaleListings ?? 0, to: '/admin/resale', Icon: Icons.FiRotateCcw, bgColor: 'bg-blue-500' },
    { label: 'Open Complaints', value: stats?.openComplaints ?? 0, to: '/admin/complaints', Icon: Icons.FiAlertTriangle, bgColor: 'bg-purple-500' },
    { label: 'Upcoming', value: stats?.upcomingCount ?? 0, to: '/admin/upcoming-products', Icon: Icons.FiClock, bgColor: 'bg-yellow-500' }
  ]

  return (
    <section className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/admin/coupons" className="px-3 py-2 bg-indigo-600 text-white rounded">Coupons</Link>
            <Link to="/admin/analytics" className="px-3 py-2 border rounded">Analytics</Link>
            <Link to="/admin/upcoming-products" className="px-3 py-2 border rounded">Upcoming</Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map(c => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-4">Recent Orders</h2>
            {Array.isArray(stats?.recentOrders) && stats.recentOrders.length > 0 ? (
              <ul className="space-y-2">
                {stats.recentOrders.map(o => (
                  <li key={o._id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <div className="font-medium">#{o._id}</div>
                      <div className="text-sm text-gray-500">{o.user?.name} — {o.orderStatus}</div>
                    </div>
                    <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No recent orders</div>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Pending Actions</h2>

            <div className="mb-4">
              <h3 className="font-medium">Pending Products</h3>
              {pendingProducts.length === 0 ? <div className="text-sm text-gray-500">No pending products</div> : (
                <ul className="space-y-2 mt-2">
                  {pendingProducts.slice(0,5).map(p => (
                    <li key={p._id} className="flex items-center justify-between">
                      <div className="text-sm">{p.name}</div>
                      <div className="flex gap-2">
                        <button disabled={actionLoading} onClick={() => approveProduct(p._id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-sm">Approve</button>
                        <button disabled={actionLoading} onClick={() => rejectProduct(p._id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="font-medium">Pending Sellers</h3>
              {pendingSellers.length === 0 ? <div className="text-sm text-gray-500">No pending sellers</div> : (
                <ul className="space-y-2 mt-2">
                  {pendingSellers.slice(0,5).map(s => (
                    <li key={s._id} className="flex items-center justify-between">
                      <div className="text-sm">{s.name} — {s.email}</div>
                      <div className="flex gap-2">
                        <button disabled={actionLoading} onClick={() => approveSeller(s._id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-sm">Approve</button>
                        <button disabled={actionLoading} onClick={() => rejectSeller(s._id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

