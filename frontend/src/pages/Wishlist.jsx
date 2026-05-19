import {
  useEffect,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import axios from '../api/axios'

import ProductCard from '../components/product/ProductCard'

import {
  FiHeart,
  FiArrowRight,
  FiShoppingBag,
  FiTrash2
} from 'react-icons/fi'

export default function Wishlist() {

  const [wishlist, setWishlist] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchWishlist =
      async () => {

        try {

          const { data } =
            await axios.get(
              '/wishlist'
            )

          setWishlist(
            data.wishlist?.products || []
          )

        } catch (err) {

          setWishlist([])

        } finally {

          setLoading(false)

        }

      }

    fetchWishlist()

  }, [])

  /* LOADING */

  if (loading) {

    return (

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="animate-pulse grid grid-cols-2 lg:grid-cols-4 gap-6">

            {[...Array(8)].map(
              (_, i) => (

              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10"
              />

            ))}

          </div>

        </div>

      </section>

    )

  }

  /* EMPTY */

  if (wishlist.length === 0) {

    return (

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">

        <div className="max-w-xl w-full text-center rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-10 sm:p-14">

          <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-500/10 flex items-center justify-center mx-auto mb-8">

            <FiHeart
              size={42}
              className="text-pink-500"
            />

          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">

            Your Wishlist is Empty

          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">

            Save products you love and easily find them later.

          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-xl hover:shadow-pink-500/25 hover:-translate-y-1 transition-all duration-300"
          >

            Explore Products

            <FiArrowRight size={18} />

          </Link>

        </div>

      </section>

    )

  }

  return (

    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 py-10 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-5">

              <FiHeart size={15} />

              Saved Favorites

            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">

              My Wishlist

            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl leading-relaxed">

              Your saved products are waiting for you. Shop your favorite picks anytime.

            </p>

          </div>

          {/* STATS */}

          <div className="flex items-center gap-4">

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl px-8 py-6">

              <div className="text-4xl font-black text-pink-500 mb-2">

                {wishlist.length}

              </div>

              <div className="text-slate-500 dark:text-slate-400 font-medium">

                Saved Items

              </div>

            </div>

          </div>

        </div>

        {/* TOP ACTION BAR */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-6">

          <div className="flex flex-wrap items-center gap-4">

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold">

              <FiShoppingBag size={18} />

              Wishlist Collection

            </div>

            <div className="text-slate-500 dark:text-slate-400">

              Premium saved products curated by you

            </div>

          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-xl hover:shadow-pink-500/25 hover:-translate-y-1 transition-all duration-300"
          >

            Continue Shopping

            <FiArrowRight size={18} />

          </Link>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {wishlist.map((product) => (

            <div
              key={product._id}
              className="relative group"
            >

              {/* HEART BADGE */}

              <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-full bg-pink-500 text-white shadow-xl text-xs font-bold flex items-center gap-2">

                <FiHeart size={12} />

                Saved

              </div>

              {/* CARD */}

              <div className="relative">

                <ProductCard
                  product={product}
                />

              </div>

            </div>

          ))}

        </div>

        {/* BOTTOM CTA */}

        <div className="mt-16 rounded-[40px] overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-2xl">

          <div className="relative p-10 sm:p-14">

            <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

              <div className="max-w-3xl">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-semibold mb-6">

                  <FiHeart size={15} />

                  Premium Wishlist Experience

                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">

                  Don’t Miss Your Favorites

                </h2>

                <p className="text-lg text-pink-50 leading-relaxed">

                  Items in your wishlist may sell out soon. Grab them before the deals expire.

                </p>

              </div>

              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-3xl bg-white text-pink-600 font-black text-lg shadow-2xl hover:-translate-y-1 transition-all duration-300 w-fit"
              >

                <FiShoppingBag size={22} />

                View Cart

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}