import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  fetchCart,
  updateCartItem,
  removeFromCart
} from '../store/slices/cartSlice'

import { toast } from 'react-toastify'

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiTruck
} from 'react-icons/fi'

export default function Cart() {

  const dispatch = useDispatch()

  const {
    cart,
    loading
  } = useSelector(
    (state) => state.cart
  )

  const {
    isAuthenticated
  } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (isAuthenticated) {

      dispatch(fetchCart())

    }

  }, [
    dispatch,
    isAuthenticated
  ])

  const handleUpdateQty =
    async (
      itemId,
      quantity
    ) => {

      if (quantity < 1) return

      try {

        await dispatch(
          updateCartItem({
            itemId,
            quantity
          })
        ).unwrap()

      } catch (err) {

        toast.error(
          err || 'Failed to update'
        )

      }

    }

  const handleRemove =
    async (itemId) => {

      try {

        await dispatch(
          removeFromCart(itemId)
        ).unwrap()

        toast.success(
          'Removed from cart'
        )

      } catch (err) {

        toast.error(
          err || 'Failed to remove'
        )

      }

    }

  const items =
    cart?.items || []

  const subtotal =
    items.reduce(

      (sum, item) => {

        const p = item.product

        const price =
          p?.discountPrice > 0
            ? p.discountPrice
            : p?.price || 0

        return (
          sum +
          price * item.quantity
        )

      },

      0
    )

  const shipping =
    subtotal > 999
      ? 0
      : 99

  const total =
    subtotal + shipping

  /* LOADING */

  if (loading) {

    return (

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="animate-pulse space-y-6">

            {[1, 2, 3].map((i) => (

              <div
                key={i}
                className="h-36 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10"
              />

            ))}

          </div>

        </div>

      </section>

    )

  }

  /* EMPTY */

  if (items.length === 0) {

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

            Your Cart is Empty

          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">

            Looks like you haven’t added anything yet. Explore products and start shopping now.

          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-300"
          >

            Continue Shopping

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

            <FiShoppingBag size={15} />

            Secure Checkout

          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">

            Shopping Cart

          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg">

            Review your items before checkout.

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">

          {/* CART ITEMS */}

          <div className="space-y-6">

            {items.map((item) => {

              const p =
                item.product

              const price =
                p?.discountPrice > 0
                  ? p.discountPrice
                  : p?.price || 0

              const totalPrice =
                price *
                item.quantity

              return (

                <div
                  key={item._id}
                  className="group rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >

                  <div className="flex flex-col sm:flex-row gap-6 p-6">

                    {/* IMAGE */}

                    <Link
                      to={`/products/${p?._id}`}
                      className="relative w-full sm:w-[170px] h-[170px] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                    >

                      <img
                        src={
                          p?.images?.[0] ||
                          'https://via.placeholder.com/300'
                        }
                        alt={p?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                    </Link>

                    {/* CONTENT */}

                    <div className="flex-1 flex flex-col justify-between">

                      <div>

                        <Link
                          to={`/products/${p?._id}`}
                          className="text-2xl font-black text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 line-clamp-2"
                        >

                          {p?.name}

                        </Link>

                        <p className="text-slate-500 dark:text-slate-400 mt-2">

                          Premium quality verified product.

                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-5">

                          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">

                            ₹{price?.toLocaleString()}

                          </span>

                        </div>

                      </div>

                      {/* CONTROLS */}

                      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-8">

                        {/* QTY */}

                        <div>

                          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">

                            Quantity

                          </p>

                          <div className="flex items-center gap-3">

                            <button
                              onClick={() =>

                                handleUpdateQty(
                                  item._id,
                                  item.quantity - 1
                                )

                              }
                              className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-slate-900 dark:text-white flex items-center justify-center transition-all duration-300"
                            >

                              <FiMinus size={16} />

                            </button>

                            <div className="min-w-[60px] h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white text-lg">

                              {item.quantity}

                            </div>

                            <button
                              onClick={() =>

                                handleUpdateQty(
                                  item._id,
                                  item.quantity + 1
                                )

                              }
                              className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-slate-900 dark:text-white flex items-center justify-center transition-all duration-300"
                            >

                              <FiPlus size={16} />

                            </button>

                          </div>

                        </div>

                        {/* TOTAL */}

                        <div className="flex items-end justify-between lg:flex-col lg:items-end gap-5">

                          <div>

                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">

                              Total

                            </p>

                            <p className="text-3xl font-black text-slate-900 dark:text-white">

                              ₹{totalPrice?.toLocaleString()}

                            </p>

                          </div>

                          <button
                            onClick={() =>

                              handleRemove(
                                item._id
                              )

                            }
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 font-semibold transition-all duration-300"
                          >

                            <FiTrash2 size={17} />

                            Remove

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )

            })}

          </div>

          {/* SUMMARY */}

          <div className="xl:sticky xl:top-28 h-fit">

            <div className="rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white">

                <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10 blur-3xl" />

                <div className="relative">

                  <h2 className="text-3xl font-black tracking-tight">

                    Order Summary

                  </h2>

                  <p className="text-emerald-50 mt-2">

                    Secure checkout protected by Re-Market

                  </p>

                </div>

              </div>

              <div className="p-8">

                <div className="space-y-5">

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">

                    <span>

                      Subtotal

                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">

                      ₹{subtotal?.toLocaleString()}

                    </span>

                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">

                    <span>

                      Shipping

                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">

                      {shipping === 0
                        ? 'Free'
                        : `₹${shipping}`}

                    </span>

                  </div>

                  <div className="border-t border-slate-200 dark:border-white/10 pt-5 flex items-center justify-between">

                    <span className="text-xl font-bold text-slate-900 dark:text-white">

                      Total

                    </span>

                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">

                      ₹{total?.toLocaleString()}

                    </span>

                  </div>

                </div>

                <div className="space-y-4 mt-8">

                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

                    <FiShield
                      size={18}
                      className="text-emerald-500"
                    />

                    Secure encrypted payment

                  </div>

                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

                    <FiTruck
                      size={18}
                      className="text-emerald-500"
                    />

                    Fast delivery support

                  </div>

                </div>

                <Link
                  to="/checkout"
                  className="mt-8 inline-flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-lg shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-300"
                >

                  Proceed to Checkout

                  <FiArrowRight size={20} />

                </Link>

                <Link
                  to="/products"
                  className="mt-4 inline-flex items-center justify-center w-full h-12 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                >

                  Continue Shopping

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}