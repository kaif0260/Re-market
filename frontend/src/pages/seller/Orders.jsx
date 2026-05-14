import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import {
  STATUS_BADGE_CLASS,
  labelOrderStatus,
  paymentMethodLabel,
  getSellerSelectableStatuses,
  labelOrderStatusBilingual
} from '../../utils/orderStatus'

export default function SellerOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/seller/orders')
        setOrders(data.orders || [])
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const updateStatus = async (orderId) => {
    const order = orders.find((o) => o._id === orderId)
    const current = order?.orderStatus || 'pending'
    const pick = selectedStatus[orderId] ?? current
    setActionLoading(true)
    try {
      await axios.put(`/seller/orders/${orderId}/status`, { status: pick })
      const { data } = await axios.get('/seller/orders')
      setOrders(data.orders || [])
      setSelectedStatus((prev) => {
        const next = { ...prev }
        delete next[orderId]
        return next
      })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to update order status'
      alert(msg)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Seller orders</h1>
        <Link to="/seller/dashboard" className="text-emerald-600">
          ← Dashboard
        </Link>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        You only see orders that include your products. Status flow: Pending → Confirmed → Shipped → Out for delivery →
        Delivered (or Cancelled). If an order mixes multiple sellers, only admin can change status.
      </p>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const pillClass = STATUS_BADGE_CLASS[order.orderStatus] || 'bg-gray-100 text-gray-800'
            const options = getSellerSelectableStatuses(order.orderStatus)
            const canAct = order.canUpdateStatus && options.length > 0
            const selectValue = selectedStatus[order._id] ?? order.orderStatus

            return (
              <div key={order._id} className="p-4 border rounded-xl bg-white">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-gray-500">{order.orderId}</p>
                    <p className="mt-1 font-semibold text-gray-900">Buyer: {order.user?.name || '—'}</p>
                    <p className="text-sm text-gray-500">
                      {order.user?.email || ''} {order.user?.phone ? `• ${order.user.phone}` : ''}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${pillClass}`}>
                    {labelOrderStatus(order.orderStatus)}
                  </span>
                </div>

                {order.multiSellerOrder && (
                  <p className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    This cart order includes multiple sellers. You can see your line items here; only admin can update
                    order status.
                  </p>
                )}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-medium">{paymentMethodLabel(order.paymentMethod)}</p>
                    <p className="text-sm text-gray-500">Payment status: {order.paymentStatus || '—'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {order.shippingAddress?.name ? `${order.shippingAddress.name}, ` : ''}
                      {order.shippingAddress?.phone || ''}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {order.shippingAddress?.address || '—'}, {order.shippingAddress?.city || ''}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress?.state ? `${order.shippingAddress.state} ` : ''}
                      {order.shippingAddress?.pincode || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Your items total</p>
                    <p className="font-semibold">₹{Number(order.sellerItemsSubtotal || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Order total (full cart): ₹{Number(order.finalAmount || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Your line items: {order.items?.length || 0}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Your products in this order</p>
                  <div className="space-y-2">
                    {(order.items || []).map((it, idx) => (
                      <div key={it._id || idx} className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.image || 'https://via.placeholder.com/48'}
                            alt=""
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-sm">{it.name || 'Item'}</p>
                            <p className="text-xs text-gray-500">Qty: {it.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            ₹{Number((it.quantity || 0) * (it.price || 0)).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">₹{Number(it.price || 0).toLocaleString()} each</p>
                        </div>
                      </div>
                    ))}
                    {(order.items || []).length === 0 && (
                      <p className="text-sm text-gray-500">No items for your shop in this order.</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-sm text-gray-500">Update status</label>
                    <select
                      className="border rounded-lg px-3 py-2 text-sm min-w-[200px]"
                      value={selectValue}
                      onChange={(e) => setSelectedStatus((prev) => ({ ...prev, [order._id]: e.target.value }))}
                      disabled={actionLoading || !canAct}
                    >
                      <option value={order.orderStatus}>{labelOrderStatusBilingual(order.orderStatus)} (वर्तमान)</option>
                      {options.map((s) => (
                        <option key={s} value={s}>
                          {labelOrderStatusBilingual(s)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
                    onClick={() => updateStatus(order._id)}
                    disabled={actionLoading || !canAct || selectValue === order.orderStatus}
                  >
                    {actionLoading ? 'Updating…' : 'Update'}
                  </button>
                </div>
              </div>
            )
          })}
          {orders.length === 0 && <p className="text-center text-gray-500 py-12">No orders yet.</p>}
        </div>
      )}
    </div>
  )
}
