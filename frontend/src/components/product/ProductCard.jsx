import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../../store/slices/cartSlice'
import { toast } from 'react-toastify'
import axios from '../../api/axios'
import { FiHeart, FiShoppingCart, FiStar, FiShield } from 'react-icons/fi'

export default function ProductCard({ product, isResale = false }) {

  const [wishlisted, setWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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

      toast.success('Added to cart')

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
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      whileHover={{
        y: -12,
        scale: 1.02
      }}
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 300
      }}
      className="group"
    >

      <Link to={url} className="block">

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-gray-100/50">

          <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">

            {!imageLoaded && (

              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 animate-pulse" />

            )}

            <img
              src={
                product.images?.[0] ||
                product.image ||
                'https://via.placeholder.com/400x400?text=No+Image'
              }
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              onLoad={() =>
                setImageLoaded(true)
              }
            />

            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-3 left-3 flex flex-col gap-2">

              {discount > 0 &&
                !isResale && (

                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                >
                  {discount}% OFF
                </motion.span>

              )}

              {isResale &&
                product.verifiedPurchase && (

                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                >
                  <FiShield size={12} />
                  Verified
                </motion.span>

              )}

            </div>

            <motion.button
              whileHover={{
                scale: 1.2,
                rotate: 10
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:text-emerald-600 backdrop-blur-sm'
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

          <div className="p-6">

            <p className="text-emerald-600 text-sm font-medium mb-2 truncate">
              {product.brand ||
                product.category ||
                'General'}
            </p>

            <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
              {product.name}
            </h3>

            {!isResale &&
              product.rating?.average > 0 && (

              <div className="flex items-center gap-1 mb-3">

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
                          : 'text-gray-300'
                      }`}
                    />

                  ))}

                </div>

                <span className="text-sm text-gray-600 ml-1">
                  {product.rating.average}
                </span>

              </div>

            )}

            <div className="flex items-center gap-2 mb-4">

              <span className="text-2xl font-bold text-emerald-600">
                ₹{price?.toLocaleString()}
              </span>

              {originalPrice && (

                <span className="text-sm text-gray-400 line-through">
                  ₹{originalPrice?.toLocaleString()}
                </span>

              )}

            </div>

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleAddToCart}
              disabled={
                adding ||
                (
                  product.stock !== undefined &&
                  product.stock < 1
                )
              }
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                product.stock !== undefined &&
                product.stock < 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : adding
                  ? 'bg-emerald-400 text-white cursor-wait'
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
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