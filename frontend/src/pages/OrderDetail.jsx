import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../api/axios'
import {
  STATUS_BADGE_CLASS,
  labelOrderStatus,
  paymentMethodLabel
} from '../utils/orderStatus'

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/orders/${id}`)
        setOrder(data.order)
      } catch (err) {
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const canCancel =
    order && ['pending', 'confirmed', 'paid'].includes(order.orderStatus)

  const handleCancel = async () => {
    if (!order || !canCancel) return
    const reason = window.prompt('Cancel reason (optional):') ?? ''
    setCancelling(true)
    try {
      const { data } = await axios.put(`/orders/${order._id}/cancel`, { reason })
      setOrder(data.order)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not cancel order'
      alert(msg)
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/orders" className="text-emerald-600 mt-2 inline-block">
          Back to orders
        </Link>
      </div>
    )
  }

  const st = order.orderStatus
  const isCancelled = st === 'cancelled'

  const stepMeta = [
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out_for_delivery', label: 'Out for delivery' },
    { key: 'delivered', label: 'Delivered' }
  ]

  const statusRank = (s) => {
    const m = {
      pending: 0,
      paid: 1,
      confirmed: 1,
      packed: 2,
      shipped: 2,
      out_for_delivery: 3,
      delivered: 4
    }
    return m[s] ?? 0
  }
  const sr = statusRank(st)

  const currentKey = (() => {
    if (st === 'pending') return 'pending'
    if (st === 'paid' || st === 'confirmed') return 'confirmed'
    if (st === 'packed' || st === 'shipped') return 'shipped'
    if (st === 'out_for_delivery') return 'out_for_delivery'
    if (st === 'delivered') return 'delivered'
    return null
  })()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/orders" className="text-emerald-600 text-sm mb-4 inline-block">
        ← Back to orders
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order {order.orderId}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              STATUS_BADGE_CLASS[st] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {labelOrderStatus(st)}
          </span>
          {canCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelling}
              className="px-3 py-1.5 text-sm rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              {cancelling ? 'Cancelling…' : 'Cancel order'}
            </button>
          )}
        </div>
      </div>

      {!isCancelled && (
        <div className="mb-6 p-4 bg-white border rounded-xl">
          <p className="text-sm font-medium text-gray-900 mb-3">Order progress</p>
          <ol className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-2 sm:items-center">
            {stepMeta.map((step, i) => {
              const done = sr > i
              const current = currentKey === step.key
              return (
                <li key={step.key} className="flex items-center gap-2 text-sm">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      current ? 'bg-emerald-600 text-white' : done ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={done ? 'text-gray-900 font-medium' : 'text-gray-400'}>{step.label}</span>
                  {i < stepMeta.length - 1 && <span className="text-gray-300 hidden sm:inline ml-1">→</span>}
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {isCancelled && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-900">
          This order was cancelled
          {order.cancelledBy ? ` (${order.cancelledBy})` : ''}.
          {order.cancellationReason ? ` Reason: ${order.cancellationReason}` : ''}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Payment</p>
          <p className="font-medium">{paymentMethodLabel(order.paymentMethod)}</p>
          <p className="text-sm text-gray-600 mt-1">
            Payment status: <span className="font-medium">{order.paymentStatus || '—'}</span>
          </p>
        </div>
        <div className="p-4 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Delivery address</p>
          <p className="font-medium">
            {order.shippingAddress?.name}, {order.shippingAddress?.phone}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} —{' '}
            {order.shippingAddress?.pincode}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <ul className="divide-y">
          {order.items?.map((item) => (
            <li key={item._id} className="flex gap-4 p-4">
              <img
                src={item.image || 'https://via.placeholder.com/80'}
                alt=""
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold">₹{(item.quantity * item.price)?.toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t bg-gray-50 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.totalAmount?.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-₹{order.discount?.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{order.shippingCharges?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2">
            <span>Total</span>
            <span>₹{order.finalAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
