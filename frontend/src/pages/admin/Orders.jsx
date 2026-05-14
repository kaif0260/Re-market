import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import {
  STATUS_BADGE_CLASS,
  labelOrderStatus,
  paymentMethodLabel,
  ADMIN_STATUS_OPTIONS
} from '../../utils/orderStatus'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/admin/orders')
        setOrders(data.orders || [])
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const ordersWithDefaultSelection = useMemo(() => {
    return orders.map((o) => ({
      ...o,
      _defaultStatus: o.orderStatus || 'pending'
    }))
  }, [orders])

  const updateStatus = async (orderId) => {
    const status = selectedStatus[orderId] || orders.find((x) => x._id === orderId)?.orderStatus || 'pending'
    setActionLoading(true)
    try {
      const res = await axios.put(`/admin/orders/${orderId}/status`, { status })
      if (res?.data?.order) {
        setOrders((prev) => prev.map((x) => (x._id === orderId ? res.data.order : x)))
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to update order status'
      alert(msg)
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">
        ← Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All orders</h1>
      <p className="text-sm text-gray-600 mb-6">
        Full control: view buyer and per–line-item seller, then set any order status (including legacy values).
      </p>

      {loading ? (
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      ) : (
        <div className="space-y-4">
          {ordersWithDefaultSelection.map((o) => {
            const pillClass = STATUS_BADGE_CLASS[o.orderStatus] || 'bg-gray-100 text-gray-800'
            const itemsTotalQty = (o.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0)

            return (
              <div key={o._id} className="p-4 border rounded-xl bg-white">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-gray-500">{o.orderId}</p>
                    <p className="mt-1 font-semibold">Buyer: {o.user?.name || '—'}</p>
                    <p className="text-sm text-gray-500">
                      {o.user?.email || ''}
                      {o.user?.phone ? ` • ${o.user.phone}` : ''}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${pillClass}`}>
                    {labelOrderStatus(o.orderStatus)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-medium">{paymentMethodLabel(o.paymentMethod)}</p>
                    <p className="text-sm text-gray-500">Status: {o.paymentStatus || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shipping address</p>
                    <p className="font-medium">
                      {o.shippingAddress?.name ? `${o.shippingAddress.name}, ` : ''}
                      {o.shippingAddress?.phone || ''}
                    </p>
                    <p className="font-medium text-sm text-gray-700 mt-0.5">
                      {o.shippingAddress?.address || '—'}, {o.shippingAddress?.city || ''}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(o.shippingAddress?.state ? `${o.shippingAddress.state} ` : '')}
                      {o.shippingAddress?.pincode || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Totals</p>
                    <p className="font-semibold">₹{Number(o.finalAmount || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Units: {itemsTotalQty}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Line items & sellers</p>
                  <div className="space-y-2">
                    {(o.items || []).map((it, idx) => {
                      const seller = it.product?.seller
                      return (
                        <div key={it._id || idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.image || 'https://via.placeholder.com/48'}
                              alt=""
                              className="w-10 h-10 object-cover rounded shrink-0"
                            />
                            <div>
                              <p className="font-medium text-sm">{it.name || 'Item'}</p>
                              <p className="text-xs text-gray-500">Qty: {it.quantity}</p>
                              {seller && (
                                <p className="text-xs text-indigo-700 mt-1">
                                  Seller: {seller.name || '—'}
                                  {seller.email ? ` • ${seller.email}` : ''}
                                  {seller.phone ? ` • ${seller.phone}` : ''}
                                </p>
                              )}
                              {!seller && <p className="text-xs text-gray-400 mt-1">Seller: —</p>}
                            </div>
                          </div>
                          <div className="text-right sm:pl-4">
                            <p className="text-sm font-semibold">
                              ₹{Number((it.quantity || 0) * (it.price || 0)).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">₹{Number(it.price || 0).toLocaleString()} each</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-sm text-gray-500">Set status</label>
                    <select
                      className="border rounded-lg px-3 py-2 text-sm min-w-[220px]"
                      value={selectedStatus[o._id] ?? o._defaultStatus}
                      onChange={(e) => setSelectedStatus((prev) => ({ ...prev, [o._id]: e.target.value }))}
                      disabled={actionLoading}
                    >
                      {ADMIN_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {labelOrderStatus(s)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
                    onClick={() => updateStatus(o._id)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Saving…' : 'Save status'}
                  </button>
                </div>
              </div>
            )
          })}

          {ordersWithDefaultSelection.length === 0 && (
            <p className="text-center text-gray-500 py-12">No orders.</p>
          )}
        </div>
      )}
    </div>
  )
}
