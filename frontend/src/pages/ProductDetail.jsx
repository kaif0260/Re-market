import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios'
import { fetchCart } from '../store/slices/cartSlice'
import { toast } from 'react-toastify'
import {
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiShield
} from 'react-icons/fi'

export default function ProductDetail() {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
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

  const handleAddToCart = async () => {

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

        quantity

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

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />

      </div>

    )

  }

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Product not found
          </h1>

          <Link
            to="/products"
            className="inline-block mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl"
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

  const discount = originalPrice
    ? Math.round(
        (
          (originalPrice - price) /
          originalPrice
        ) * 100
      )
    : 0

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}

          <div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

              <img
                src={
                  mainImage ||
                  'https://via.placeholder.com/600'
                }
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />

            </div>

            <div className="flex gap-4 mt-5 overflow-x-auto">

              {product.images?.map(
                (img, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setMainImage(img)
                  }
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition ${
                    mainImage === img
                      ? 'border-emerald-500'
                      : 'border-transparent'
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

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            <p className="text-emerald-600 font-medium">
              {product.brand ||
                product.category}
            </p>

            <h1 className="text-4xl font-black text-gray-900 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-4">

              <div className="flex items-center gap-1">

                {[...Array(5)].map(
                  (_, i) => (

                  <FiStar
                    key={i}
                    className={`${
                      i <
                      Math.floor(
                        product.rating
                          ?.average || 0
                      )
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />

                ))}

              </div>

              <span className="text-gray-500">
                (
                {product.rating
                  ?.average || 0}
                )
              </span>

            </div>

            <div className="flex items-center gap-3 mt-6">

              <span className="text-4xl font-black text-emerald-600">
                ₹{price?.toLocaleString()}
              </span>

              {originalPrice && (

                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{originalPrice?.toLocaleString()}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                    {discount}% OFF
                  </span>
                </>

              )}

            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">

              <p className="font-semibold text-gray-900 mb-3">
                Quantity
              </p>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="w-12 h-12 rounded-2xl border border-gray-200 hover:bg-emerald-50"
                >
                  −
                </button>

                <span className="text-xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="w-12 h-12 rounded-2xl border border-gray-200 hover:bg-emerald-50"
                >
                  +
                </button>

              </div>

            </div>

            <button
              onClick={handleAddToCart}
              disabled={
                adding ||
                product.stock < 1
              }
              className={`mt-8 w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                product.stock < 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : adding
                  ? 'bg-emerald-400 text-white cursor-wait'
                  : 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:scale-[1.01] shadow-xl'
              }`}
            >

              {adding ? (

                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>

              ) : (

                <>
                  <FiShoppingCart />
                  Add to Cart
                </>

              )}

            </button>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3 text-gray-700">

                <FiTruck className="text-emerald-600" />

                <span>
                  Free shipping on orders above ₹999
                </span>

              </div>

              <div className="flex items-center gap-3 text-gray-700">

                <FiShield className="text-emerald-600" />

                <span>
                  100% secure payments
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}