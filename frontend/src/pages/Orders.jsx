import {
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import axios from '../api/axios'

import {
  USER_STATUS_FILTERS,
  STATUS_BADGE_CLASS,
  labelOrderStatus
} from '../utils/orderStatus'

import {
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiTruck
} from 'react-icons/fi'

export default function Orders() {

  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [filter, setFilter] =
    useState('all')

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const { data } =
            await axios.get(
              '/orders'
            )

          setOrders(
            data.orders || []
          )

        } catch (err) {

          setOrders([])

        } finally {

          setLoading(false)

        }

      }

    fetchOrders()

  }, [])

  const filtered =
    useMemo(() => {

      if (filter === 'all') {

        return orders

      }

      return orders.filter(
        (o) =>

          o.orderStatus === filter
      )

    }, [
      orders,
      filter
    ])

  /* LOADING */

  if (loading) {

    return (

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="animate-pulse space-y-6">

            {[1, 2, 3].map((i) => (

              <div
                key={i}
                className="h-44 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10"
              />

            ))}

          </div>

        </div>

      </section>

    )

  }

  /* EMPTY */

  if (orders.length === 0) {

    return (

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">

        <div className="max-w-xl w-full text-center rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-10 sm:p-14">

          <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">

            <FiShoppingBag
              size={42}
              className="text-emerald-600"
            />

          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">

            No Orders Yet

          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">

            Your order history will appear here after your first purchase.

          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-300"
          >

            Start Shopping

            <FiArrowRight size={18} />

          </Link>

        </div>

      </section>

    )

  }

  return (

    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 py-10 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5">

            <FiPackage size={15} />

            Order Tracking

          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">

            My Orders

          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl leading-relaxed">

            Track and manage all your purchases with real-time delivery updates and secure order history.

          </p>

        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mb-10">

          {USER_STATUS_FILTERS.map(
            (f) => (

            <button
              key={f.value}
              type="button"
              onClick={() =>
                setFilter(
                  f.value
                )
              }
              className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                filter === f.value

                  ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white border-transparent shadow-lg shadow-emerald-500/20'

                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:-translate-y-1'
              }`}
            >

              {f.label}

              {f.value !== 'all' && (

                <span className="ml-2 text-sm opacity-80">

                  (
                  {
                    orders.filter(
                      (o) =>

                        o.orderStatus ===
                        f.value
                    ).length
                  }
                  )

                </span>

              )}

            </button>

          ))}

        </div>

        {/* ORDER LIST */}

        <div className="space-y-7">

          {filtered.map((order) => (

            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="group block rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >

              <div className="p-6 sm:p-8">

                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">

                  <div>

                    <div className="flex flex-wrap items-center gap-3 mb-3">

                      <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm">

                        Order ID

                      </span>

                      <span className="font-mono text-slate-500 dark:text-slate-400 text-sm">

                        {order.orderId}

                      </span>

                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">

                      ₹{order.finalAmount?.toLocaleString()}

                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 mt-2">

                      {order.items?.length}
                      {' '}
                      item(s) purchased

                    </p>

                  </div>

                  {/* STATUS */}

                  <div
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold w-fit ${
                      STATUS_BADGE_CLASS[
                        order.orderStatus
                      ] ||
                      'bg-gray-100 text-gray-800'
                    }`}
                  >

                    {order.orderStatus ===
                      'pending' && (
                      <FiClock size={16} />
                    )}

                    {order.orderStatus ===
                      'shipped' && (
                      <FiTruck size={16} />
                    )}

                    {order.orderStatus ===
                      'delivered' && (
                      <FiCheckCircle size={16} />
                    )}

                    {labelOrderStatus(
                      order.orderStatus
                    )}

                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="flex flex-wrap gap-4">

                  {order.items
                    ?.slice(0, 4)
                    .map(
                      (item, i) => (

                      <div
                        key={i}
                        className="relative w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10"
                      >

                        <img
                          src={
                            item.image ||
                            'https://via.placeholder.com/100'
                          }
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                      </div>

                    ))}

                </div>

                {/* BOTTOM */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-8 pt-7 border-t border-slate-200 dark:border-white/10">

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">

                    <span className="inline-flex items-center gap-2">

                      <FiPackage size={15} />

                      Secure Order Tracking

                    </span>

                    <span className="inline-flex items-center gap-2">

                      <FiTruck size={15} />

                      Fast Delivery Updates

                    </span>

                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">

                    View Order Details

                    <FiArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* EMPTY FILTER */}

        {filtered.length === 0 && (

          <div className="rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl text-center py-20 px-6 mt-8">

            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">

              <FiPackage
                size={34}
                className="text-slate-400"
              />

            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">

              No Orders Found

            </h3>

            <p className="text-slate-500 dark:text-slate-400">

              There are no orders in this category yet.

            </p>

          </div>

        )}

      </div>

    </section>

  )

}