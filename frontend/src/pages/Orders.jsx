import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import {
  USER_STATUS_FILTERS,
  STATUS_BADGE_CLASS,
  labelOrderStatus
} from '../utils/orderStatus'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/orders')
        setOrders(data.orders || [])
      } catch (err) {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter((o) => o.orderStatus === filter)
  }, [orders, filter])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No orders yet</h1>
        <p className="text-gray-500 mt-2">Your order history will appear here.</p>
        <Link
          to="/products"
          className="inline-block mt-6 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
      <p className="text-sm text-gray-600 mb-4">
        Track status: Pending → Confirmed → Shipped → Out for delivery → Delivered. You can cancel while Pending or
        Confirmed.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {USER_STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
              filter === f.value
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
            }`}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="ml-1 text-xs opacity-80">
                ({orders.filter((o) => o.orderStatus === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block p-4 bg-white border rounded-xl hover:shadow-md transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-mono text-sm text-gray-500">{order.orderId}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  STATUS_BADGE_CLASS[order.orderStatus] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {labelOrderStatus(order.orderStatus)}
              </span>
            </div>
            <div className="flex gap-4">
              {order.items?.slice(0, 2).map((item, i) => (
                <img
                  key={i}
                  src={item.image || 'https://via.placeholder.com/60'}
                  alt=""
                  className="w-14 h-14 object-cover rounded"
                />
              ))}
            </div>
            <p className="mt-2 text-gray-600">
              ₹{order.finalAmount?.toLocaleString()} • {order.items?.length} item(s)
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8">No orders in this status.</p>
      )}
    </div>
  )
}
