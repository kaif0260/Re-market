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

      setPendingSellers(
        (sRes.data.sellers || []).filter(
          (s) => !s.sellerInfo?.isApproved
        )
      )
    } catch (err) {
      console.error('Failed to fetch pending items', err)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchPending()
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

  const approveProduct = (id) =>
    doAction(
      () => axios.put(`/admin/products/${id}/approve`),
      'Product approved'
    )

  const rejectProduct = (id) =>
    doAction(
      () => axios.put(`/admin/products/${id}/reject`),
      'Product rejected'
    )

  const approveSeller = (id) =>
    doAction(
      () => axios.put(`/admin/sellers/${id}/approve`),
      'Seller approved'
    )

  const rejectSeller = (id) =>
    doAction(
      () => axios.put(`/admin/sellers/${id}/reject`),
      'Seller rejected'
    )

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Loading dashboard...
          </p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <div className="text-red-600 text-center font-medium">
          {error}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={fetchStats}
            className="px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
          >
            Retry
          </button>

          <Link
            to="/"
            className="px-5 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </div>
      </div>
    )

  const cards = [
    {
      label: 'Pending Products',
      value: stats?.pendingProducts ?? 0,
      to: '/admin/products',
      Icon: Icons.FiPackage,
      bgColor: 'bg-orange-500'
    },
    {
      label: 'Orders',
      value: stats?.recentOrders?.length ?? 0,
      to: '/admin/orders',
      Icon: Icons.FiShoppingCart,
      bgColor: 'bg-indigo-500'
    },
    {
      label: 'Coupons',
      value: stats?.couponCount ?? 0,
      to: '/admin/coupons',
      Icon: Icons.FiTicket,
      bgColor: 'bg-pink-500'
    },
    {
      label: 'Pending Resale',
      value: stats?.pendingResaleListings ?? 0,
      to: '/admin/resale',
      Icon: Icons.FiRotateCcw,
      bgColor: 'bg-blue-500'
    },
    {
      label: 'Open Complaints',
      value: stats?.openComplaints ?? 0,
      to: '/admin/complaints',
      Icon: Icons.FiAlertTriangle,
      bgColor: 'bg-purple-500'
    },
    {
      label: 'Upcoming',
      value: stats?.upcomingCount ?? 0,
      to: '/admin/upcoming-products',
      Icon: Icons.FiClock,
      bgColor: 'bg-yellow-500'
    }
  ]

  return (
    <section className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Manage products, sellers, orders and analytics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/coupons"
              className="px-5 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow"
            >
              Coupons
            </Link>

            <Link
              to="/admin/analytics"
              className="px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition"
            >
              Analytics
            </Link>

            <Link
              to="/admin/upcoming-products"
              className="px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition"
            >
              Upcoming
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Recent Orders
              </h2>

              <Link
                to="/admin/orders"
                className="text-emerald-600 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            {Array.isArray(stats?.recentOrders) &&
            stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((o) => (
                  <div
                    key={o._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-100 rounded-2xl p-4 hover:shadow-md transition"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 break-all">
                        #{o._id}
                      </div>

                      <div className="text-sm text-gray-500">
                        {o.user?.name} — {o.orderStatus}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                No recent orders
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Pending Actions
            </h2>

            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 mb-3">
                Pending Products
              </h3>

              {pendingProducts.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No pending products
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingProducts.slice(0, 5).map((p) => (
                    <div
                      key={p._id}
                      className="border border-gray-100 rounded-2xl p-3"
                    >
                      <div className="text-sm font-medium text-slate-900 mb-3">
                        {p.name}
                      </div>

                      <div className="flex gap-2">
                        <button
                          disabled={actionLoading}
                          onClick={() => approveProduct(p._id)}
                          className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition"
                        >
                          Approve
                        </button>

                        <button
                          disabled={actionLoading}
                          onClick={() => rejectProduct(p._id)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">
                Pending Sellers
              </h3>

              {pendingSellers.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No pending sellers
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingSellers.slice(0, 5).map((s) => (
                    <div
                      key={s._id}
                      className="border border-gray-100 rounded-2xl p-3"
                    >
                      <div className="text-sm font-medium text-slate-900">
                        {s.name}
                      </div>

                      <div className="text-xs text-gray-500 mb-3 break-all">
                        {s.email}
                      </div>

                      <div className="flex gap-2">
                        <button
                          disabled={actionLoading}
                          onClick={() => approveSeller(s._id)}
                          className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition"
                        >
                          Approve
                        </button>

                        <button
                          disabled={actionLoading}
                          onClick={() => rejectSeller(s._id)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}