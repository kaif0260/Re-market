import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

import { useState } from 'react'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  fetchCart
} from '../../store/slices/cartSlice'

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

  const dispatch =
    useDispatch()

  const { isAuthenticated } =
    useSelector(
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

  const discount =
    originalPrice
      ? Math.round(
          (
            (originalPrice - price) /
            originalPrice
          ) * 100
        )
      : 0

  const handleAddToCart =
    async (e) => {

      e.preventDefault()

      e.stopPropagation()

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
            productId:
              product._id,
            quantity: 1
          }
        )

        dispatch(fetchCart())

        toast.success(
          'Added to cart'
        )

      } catch (err) {

        toast.error(

          err.response?.data?.message ||
          'Failed to add'

        )

      }

      setAdding(false)

    }

  const handleWishlist =
    async (e) => {

      e.preventDefault()

      e.stopPropagation()

      if (!isAuthenticated) {

        toast.info(
          'Please login first'
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
              productId:
                product._id
            }
          )

          setWishlisted(true)

          toast.success(
            'Added to wishlist'
          )

        }

      } catch (err) {

        toast.error('Failed')

      }

    }

  const url = isResale
    ? `/resale/${product._id}`
    : `/products/${product._id}`

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      whileHover={{
        y: -5
      }}
      className="group h-full"
    >

      <Link
        to={url}
        className="block h-full"
      >

        <div className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">

          {/* IMAGE */}

          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-[#374151]">

            {!imageLoaded && (

              <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />

            )}

            <img
              src={
                product.images?.[0] ||
                product.image ||
                'https://via.placeholder.com/500'
              }
              alt={product.name}
              onLoad={() =>
                setImageLoaded(true)
              }
              className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
                imageLoaded
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            />

            {/* BADGES */}

            <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">

              {discount > 0 &&
                !isResale && (

                <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">

                  {discount}% OFF

                </span>

              )}

              {isResale &&
                product.verifiedPurchase && (

                <span className="bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">

                  <FiShield size={11} />

                  Verified

                </span>

              )}

            </div>

            {/* WISHLIST */}

            <button
              onClick={handleWishlist}
              className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-[#111827] text-black dark:text-white hover:bg-emerald-600 hover:text-white'
              }`}
            >

              <FiHeart
                size={17}
                className={
                  wishlisted
                    ? 'fill-current'
                    : ''
                }
              />

            </button>

          </div>

          {/* CONTENT */}

          <div className="flex flex-col flex-grow p-3 sm:p-4">

            {/* BRAND */}

            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1 truncate">

              {product.brand ||
                product.category ||
                'General'}

            </p>

            {/* NAME */}

            <h3 className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug line-clamp-2 min-h-[42px] sm:min-h-[48px]">

              {product.name}

            </h3>

            {/* RATING */}

            {!isResale &&
              product.rating?.average > 0 && (

              <div className="flex items-center gap-1 mt-2">

                <div className="flex">

                  {[...Array(5)].map(
                    (_, i) => (

                    <FiStar
                      key={i}
                      size={13}
                      className={`${
                        i <
                        Math.floor(
                          product.rating.average
                        )
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />

                  ))}

                </div>

                <span className="text-xs text-gray-500">

                  {product.rating.average}

                </span>

              </div>

            )}

            {/* PRICE */}

            <div className="flex items-center gap-2 mt-3 flex-wrap">

              <span className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400">

                ₹{price?.toLocaleString()}

              </span>

              {originalPrice && (

                <span className="text-xs sm:text-sm text-gray-500 line-through">

                  ₹{originalPrice?.toLocaleString()}

                </span>

              )}

            </div>

            {/* BUTTON */}

            <button
              onClick={handleAddToCart}
              disabled={
                adding ||
                (
                  product.stock !== undefined &&
                  product.stock < 1
                )
              }
              className={`mt-4 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                product.stock !== undefined &&
                product.stock < 1
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-not-allowed'
                  : adding
                  ? 'bg-emerald-400 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
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

            </button>

          </div>

        </div>

      </Link>

    </motion.div>

  )

}