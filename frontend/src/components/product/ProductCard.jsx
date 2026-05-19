import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCart } from '../../store/slices/cartSlice'

import { toast } from 'react-toastify'

import axios from '../../api/axios'

import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiShield
} from 'react-icons/fi'

export default function ProductCard({
  product,
  isResale = false
}) {

  const [wishlisted, setWishlisted] =
    useState(false)

  const [adding, setAdding] =
    useState(false)

  const [imageLoaded, setImageLoaded] =
    useState(false)

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  )

  const price =
    product.resalePrice ??
    (
      product.discountPrice > 0
        ? product.discountPrice
        : product.price
    )

  const originalPrice =
    !product.resalePrice &&
    product.discountPrice > 0
      ? product.price
      : null

  const discount = originalPrice
    ? Math.round(
        (
          (originalPrice - price) /
          originalPrice
        ) * 100
      )
    : 0

  const handleAddToCart = async (e) => {

    e.preventDefault()

    e.stopPropagation()

    if (!isAuthenticated) {

      toast.info(
        'Please login to add to cart'
      )

      return

    }

    setAdding(true)

    try {

      await axios.post('/cart', {

        productId: product._id,

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

    setAdding(false)

  }

  const handleWishlist = async (e) => {

    e.preventDefault()

    if (!isAuthenticated) {

      toast.info(
        'Please login to add to wishlist'
      )

      return

    }

    try {

      if (wishlisted) {

        await axios.delete(
          `/wishlist/${product._id}`
        )

        setWishlisted(false)

        toast.info(
          'Removed from wishlist'
        )

      } else {

        await axios.post(
          '/wishlist',
          {
            productId: product._id
          }
        )

        setWishlisted(true)

        toast.success(
          'Added to wishlist'
        )

      }

    } catch (err) {

      toast.error(

        err.response?.data?.message ||
        'Failed'

      )

    }

  }

  const url = isResale
    ? `/resale/${product._id}`
    : `/products/${product._id}`

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 18
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      whileHover={{
        y: -8
      }}
      transition={{
        duration: 0.3
      }}
      className="group h-full"
    >

      <Link
        to={url}
        className="block h-full"
      >

        <div className="relative h-full flex flex-col bg-[#f0fdf4] dark:bg-[#1f2937] rounded-3xl overflow-hidden border border-green-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 transition-all duration-500">

          {/* PREMIUM GLOW */}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_60%)]" />

          {/* IMAGE */}

          <div className="relative aspect-[1/1] overflow-hidden bg-green-50 dark:bg-[#374151]">

            {!imageLoaded && (

              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-[#111827] dark:via-[#1e293b] dark:to-[#111827]" />

            )}

            <img
              src={
                product.images?.[0] ||
                product.image ||
                'https://via.placeholder.com/500x500?text=No+Image'
              }
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                imageLoaded
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              onLoad={() =>
                setImageLoaded(true)
              }
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* BADGES */}

            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">

              {discount > 0 &&
                !isResale && (

                <span className="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">

                  {discount}% OFF

                </span>

              )}

              {isResale &&
                product.verifiedPurchase && (

                <span className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">

                  <FiShield size={12} />

                  Verified

                </span>

              )}

            </div>

            {/* WISHLIST */}

            <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleWishlist}
              className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 dark:bg-[#0f172a]/90 text-slate-700 dark:text-white hover:text-emerald-600'
              }`}
            >

              <FiHeart
                className={
                  wishlisted
                    ? 'fill-current'
                    : ''
                }
                size={18}
              />

            </motion.button>

          </div>

          {/* CONTENT */}

          <div className="flex flex-col flex-grow p-4 sm:p-5">

            <p className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-2 truncate">

              {product.brand ||
                product.category ||
                'General'}

            </p>

            <h3 className="font-bold text-black dark:text-white text-[15px] sm:text-lg leading-snug mb-3 line-clamp-2 min-h-[44px] sm:min-h-[56px]">

              {product.name}

            </h3>

            {!isResale &&
              product.rating?.average > 0 && (

              <div className="flex items-center gap-1.5 mb-4">

                <div className="flex items-center gap-0.5">

                  {[...Array(5)].map(
                    (_, i) => (

                    <FiStar
                      key={i}
                      size={14}
                      className={`${
                        i <
                        Math.floor(
                          product.rating.average
                        )
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />

                  ))}

                </div>

                <span className="text-sm text-gray-700 dark:text-gray-300">

                  {product.rating.average}

                </span>

              </div>

            )}

            <div className="flex items-center gap-2 flex-wrap mb-5">

              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">

                ₹{price?.toLocaleString()}

              </span>

              {originalPrice && (

                <span className="text-sm text-gray-500 line-through">

                  ₹{originalPrice?.toLocaleString()}

                </span>

              )}

            </div>

            <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.97
              }}
              onClick={handleAddToCart}
              disabled={
                adding ||
                (
                  product.stock !== undefined &&
                  product.stock < 1
                )
              }
              className={`mt-auto w-full h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                product.stock !== undefined &&
                product.stock < 1
                  ? 'bg-green-100 dark:bg-gray-700 text-black dark:text-white cursor-not-allowed'
                  : adding
                  ? 'bg-emerald-400 text-white cursor-wait'
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-xl hover:shadow-emerald-500/20'
              }`}
            >

              {adding ? (

                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  Adding...

                </>

              ) : (

                <>
                  <FiShoppingCart size={16} />

                  Add to Cart

                </>

              )}

            </motion.button>

          </div>

        </div>

      </Link>

    </motion.div>

  )

}