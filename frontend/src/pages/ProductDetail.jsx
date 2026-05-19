import { useEffect, useState } from 'react'

import {
  useParams,
  Link
} from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import axios from '../api/axios'

import {
  fetchCart
} from '../store/slices/cartSlice'

import {
  toast
} from 'react-toastify'

import {
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiCheckCircle
} from 'react-icons/fi'

export default function ProductDetail() {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { isAuthenticated } =
    useSelector(
      (state) => state.auth
    )

  const [product, setProduct] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [adding, setAdding] =
    useState(false)

  const [quantity, setQuantity] =
    useState(1)

  const [mainImage, setMainImage] =
    useState('')

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const { data } =
          await axios.get(
            `/products/${id}`
          )

        setProduct(data.product)

        setMainImage(
          data.product.images?.[0]
        )

      } catch (err) {

        toast.error(

          err.response?.data?.message ||

          'Failed to load product'

        )

      }

      setLoading(false)

    }

    fetchProduct()

  }, [id])

  const handleAddToCart =
    async () => {

      if (!isAuthenticated) {

        toast.info(
          'Please login first'
        )

        return

      }

      setAdding(true)

      try {

        await axios.post(
          '/cart',
          {
            productId: product._id,
            quantity
          }
        )

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

      setAdding(false)

    }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">

        <div className="w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />

      </div>

    )

  }

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">

        <div className="text-center">

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-6">

            Product not found

          </h1>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-300"
          >

            Back to Products

          </Link>

        </div>

      </div>

    )

  }

  const price =
    product.discountPrice > 0
      ? product.discountPrice
      : product.price

  const originalPrice =
    product.discountPrice > 0
      ? product.price
      : null

  const discount =
    originalPrice
      ? Math.round(
        (
          (
            originalPrice - price
          ) /
          originalPrice
        ) * 100
      )
      : 0

  return (

    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 py-8 sm:py-10 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">

          <Link
            to="/"
            className="hover:text-emerald-600"
          >

            Home

          </Link>

          <span>/</span>

          <Link
            to="/products"
            className="hover:text-emerald-600"
          >

            Products

          </Link>

          <span>/</span>

          <span className="truncate max-w-[180px]">

            {product.name}

          </span>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT */}

          <div className="lg:sticky lg:top-24">

            {/* MAIN IMAGE */}

            <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">

              {discount > 0 && (

                <div className="absolute top-5 left-5 z-10 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg">

                  {discount}% OFF

                </div>

              )}

              <img
                src={
                  mainImage ||
                  'https://via.placeholder.com/700'
                }
                alt={product.name}
                className="w-full h-[320px] sm:h-[480px] lg:h-[620px] object-cover"
              />

            </div>

            {/* THUMBNAILS */}

            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">

              {product.images?.map(
                (img, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setMainImage(img)
                    }
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${mainImage === img
                        ? 'border-emerald-500 scale-105'
                        : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                  >

                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                  </button>

                ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-5 sm:p-8 lg:p-10">

            {/* BRAND */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5">

              <FiCheckCircle size={15} />

              {product.brand ||
                product.category}

            </div>

            {/* TITLE */}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">

              {product.name}

            </h1>

            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div className="flex items-center gap-1">

                {[...Array(5)].map(
                  (_, i) => (

                    <FiStar
                      key={i}
                      size={18}
                      className={`${i <
                          Math.floor(
                            product.rating?.average || 0
                          )
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300 dark:text-slate-700'
                        }`}
                    />

                  ))}

              </div>

              <span className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">

                {product.rating?.average || 0} rating

              </span>

            </div>

            {/* PRICE */}

            <div className="flex flex-wrap items-center gap-4 mt-8">

              <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">

                ₹{price?.toLocaleString()}

              </span>

              {originalPrice && (

                <span className="text-xl sm:text-2xl text-slate-400 line-through">

                  ₹{originalPrice?.toLocaleString()}

                </span>

              )}

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8">

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">

                Description

              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">

                {product.description}

              </p>

            </div>

            {/* QUANTITY */}

            <div className="mt-8">

              <p className="font-bold text-slate-900 dark:text-white mb-4">

                Quantity

              </p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xl font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-300"
                >

                  −

                </button>

                <span className="text-2xl font-black text-slate-900 dark:text-white min-w-[40px] text-center">

                  {quantity}

                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xl font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-300"
                >

                  +

                </button>

              </div>

            </div>

            {/* CTA */}

            <button
              onClick={handleAddToCart}
              disabled={
                adding ||
                product.stock < 1
              }
              className={`mt-10 w-full h-14 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 ${product.stock < 1
                  ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                  : adding
                    ? 'bg-emerald-400 text-white cursor-wait'
                    : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-[0_18px_40px_rgba(34,197,94,0.25)] hover:-translate-y-1'
                }`}
            >

              {adding ? (

                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                  Adding...

                </>

              ) : (

                <>
                  <FiShoppingCart size={20} />

                  Add to Cart

                </>

              )}

            </button>

            {/* FEATURES */}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5">

                <FiTruck
                  size={22}
                  className="text-emerald-600"
                />

                <div>

                  <p className="font-semibold text-slate-900 dark:text-white text-sm">

                    Fast Delivery

                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">

                    Free above ₹999

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5">

                <FiShield
                  size={22}
                  className="text-emerald-600"
                />

                <div>

                  <p className="font-semibold text-slate-900 dark:text-white text-sm">

                    Secure Payments

                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">

                    100% protected

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5">

                <FiRefreshCcw
                  size={22}
                  className="text-emerald-600"
                />

                <div>

                  <p className="font-semibold text-slate-900 dark:text-white text-sm">

                    Easy Returns

                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">

                    Hassle-free process

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5">

                <FiCheckCircle
                  size={22}
                  className="text-emerald-600"
                />

                <div>

                  <p className="font-semibold text-slate-900 dark:text-white text-sm">

                    Verified Product

                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">

                    Trusted seller

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}