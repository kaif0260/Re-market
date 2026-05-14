import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  updateCartItem,
  removeFromCart
} from '../store/slices/cartSlice'
import { toast } from 'react-toastify'

export default function Cart() {

  const dispatch = useDispatch()

  const { cart, loading } = useSelector(
    (state) => state.cart
  )

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (isAuthenticated) {

      dispatch(fetchCart())

    }

  }, [dispatch, isAuthenticated])

  const handleUpdateQty = async (
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

  const handleRemove = async (itemId) => {

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

  const items = cart?.items || []

  const subtotal = items.reduce(

    (sum, item) => {

      const p = item.product

      const price =
        p?.discountPrice > 0
          ? p.discountPrice
          : p?.price || 0

      return (
        sum + price * item.quantity
      )

    },

    0
  )

  if (loading) {

    return (

      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="animate-pulse space-y-4">

          {[1, 2, 3].map((i) => (

            <div
              key={i}
              className="h-24 bg-gray-100 rounded-xl"
            />

          ))}

        </div>

      </div>

    )

  }

  if (items.length === 0) {

    return (

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add items from the shop to get started.
        </p>

        <Link
          to="/products"
          className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium rounded-xl hover:scale-[1.02] transition"
        >
          Shop now
        </Link>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-black text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="space-y-5">

          {items.map((item) => {

            const p = item.product

            const price =
              p?.discountPrice > 0
                ? p.discountPrice
                : p?.price || 0

            const total =
              price * item.quantity

            return (

              <div
                key={item._id}
                className="flex flex-col md:flex-row gap-5 p-5 bg-white rounded-3xl shadow-lg border border-gray-100"
              >

                <img
                  src={
                    p?.images?.[0] ||
                    'https://via.placeholder.com/100'
                  }
                  alt={p?.name}
                  className="w-28 h-28 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <Link
                    to={`/products/${p?._id}`}
                    className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition"
                  >
                    {p?.name}
                  </Link>

                  <p className="text-emerald-600 text-lg font-semibold mt-2">
                    ₹{price?.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      onClick={() =>
                        handleUpdateQty(
                          item._id,
                          item.quantity - 1
                        )
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-emerald-50"
                    >
                      −
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQty(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-emerald-50"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="flex flex-col justify-between items-end">

                  <p className="text-xl font-bold text-gray-900">
                    ₹{total?.toLocaleString()}
                  </p>

                  <button
                    onClick={() =>
                      handleRemove(item._id)
                    }
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>

                </div>

              </div>

            )

          })}

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

          <div className="flex justify-between text-2xl font-bold text-gray-900">

            <span>Total</span>

            <span>
              ₹{subtotal?.toLocaleString()}
            </span>

          </div>

          <p className="text-gray-500 mt-2">
            Shipping and taxes calculated at checkout.
          </p>

          <Link
            to="/checkout"
            className="mt-6 block w-full py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white text-center font-semibold rounded-2xl hover:scale-[1.01] transition"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  )
}