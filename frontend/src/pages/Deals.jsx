import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios'
import { fetchCart } from '../store/slices/cartSlice'
import { toast } from 'react-toastify'
import { FiShoppingCart, FiClock } from 'react-icons/fi'

export default function Deals() {

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  )

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchDeals = async () => {

      try {

        const { data } =
          await axios.get(
            '/products/deals'
          )

        setProducts(
          data.products || []
        )

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          'Failed to load deals'
        )

      }

      setLoading(false)

    }

    fetchDeals()

  }, [])

  const handleAddToCart = async (
    productId
  ) => {

    if (!isAuthenticated) {

      toast.info(
        'Please login to add to cart'
      )

      return
    }

    try {

      await axios.post('/cart', {

        productId,

        quantity: 1

      })

      dispatch(fetchCart())

      toast.success(
        'Added to cart'
      )

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        'Failed to add to cart'
      )

    }

  }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-4xl font-black text-gray-900">
              Hot Deals
            </h1>

            <p className="text-gray-500 mt-2">
              Best discounted products available today
            </p>

          </div>

          <div className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-2xl font-semibold">

            <FiClock />

            Limited Time Offers

          </div>

        </div>

        {/* COUPONS */}

        <div className="mt-14">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Exclusive Coupons
              </h2>
              <p className="text-gray-500 mt-2">
                Apply at checkout for instant savings
              </p>
            </div>
            <div className="text-xs md:text-sm bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-2xl font-semibold">
              Limited time offers
            </div>
          </div>

          {/* Coupons grid will be rendered by dynamic fetch in a follow-up edit */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <p className="text-gray-500">
              Loading coupons...
            </p>
          </div>
        </div>


        {/* PRODUCTS */}

        {products.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">

            <h2 className="text-2xl font-bold text-gray-900">
              No deals available right now
            </h2>

            <p className="text-gray-500 mt-2">
              Please check again later.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {products.map((product) => {

              const price =
                product.discountPrice > 0
                  ? product.discountPrice
                  : product.price

              const discount =
                product.discountPrice > 0
                  ? Math.round(
                      (
                        (
                          product.price -
                          product.discountPrice
                        ) /
                        product.price
                      ) * 100
                    )
                  : 0

              return (

                <div
                  key={product._id}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300"
                >

                  <Link
                    to={`/products/${product._id}`}
                  >

                    <div className="relative">

                      <img
                        src={
                          product.images?.[0] ||
                          'https://via.placeholder.com/400'
                        }
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />

                      {discount > 0 && (

                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">

                          {discount}% OFF

                        </div>

                      )}

                    </div>

                  </Link>

                  <div className="p-6">

                    <p className="text-emerald-600 text-sm font-medium">
                      {product.brand ||
                        product.category}
                    </p>

                    <Link
                      to={`/products/${product._id}`}
                    >

                      <h2 className="text-xl font-bold text-gray-900 mt-2 hover:text-emerald-600 transition line-clamp-2">

                        {product.name}

                      </h2>

                    </Link>

                    <div className="flex items-center gap-3 mt-4">

                      <span className="text-2xl font-black text-emerald-600">

                        ₹{price?.toLocaleString()}

                      </span>

                      {product.discountPrice > 0 && (

                        <span className="text-gray-400 line-through">

                          ₹{product.price?.toLocaleString()}

                        </span>

                      )}

                    </div>

                    <button
                      onClick={() =>
                        handleAddToCart(
                          product._id
                        )
                      }
                      className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >

                      <FiShoppingCart />

                      Add to Cart

                    </button>

                  </div>

                </div>

              )

            })}

          </div>

        )}

      </div>

    </div>
  )
}