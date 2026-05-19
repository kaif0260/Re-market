import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import axios from '../api/axios'

import ProductCard from '../components/product/ProductCard'

import {
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiRefreshCcw,
  FiTrendingUp
} from 'react-icons/fi'

export default function Resale() {

  const [listings, setListings] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchListings = async () => {

      try {

        const { data } =
          await axios.get('/resale')

        setListings(
          data.listings || []
        )

      } catch (err) {

        setListings([])

      } finally {

        setLoading(false)

      }

    }

    fetchListings()

  }, [])

  return (

    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 overflow-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800">

        {/* BG */}

        <div className="absolute inset-0 overflow-hidden">

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full bg-cyan-400/10 blur-3xl" />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

          <div className="max-w-3xl">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-sm font-semibold mb-6">

              <FiShield size={16} />

              Verified Marketplace

            </div>

            {/* TITLE */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">

              Buy & Sell with Confidence

            </h1>

            {/* DESC */}

            <p className="text-base sm:text-lg lg:text-xl text-emerald-50/90 leading-relaxed max-w-2xl mb-8">

              Explore verified resale listings from trusted Re-Market buyers. Every listing is authenticated for a secure resale experience.

            </p>

            {/* CTA */}

            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                to="/resale/create"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white text-emerald-700 font-bold text-base hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:-translate-y-1"
              >

                Sell an Item

                <FiArrowRight size={20} />

              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-bold text-base hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >

                Browse Products

              </Link>

            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-8 mt-12">

              <div>

                <div className="text-3xl font-black text-white">

                  100%

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Verified Listings

                </div>

              </div>

              <div>

                <div className="text-3xl font-black text-white">

                  Secure

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Transactions

                </div>

              </div>

              <div>

                <div className="text-3xl font-black text-white">

                  Trusted

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Community

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg p-6">

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-5">

              <FiShield
                size={26}
                className="text-emerald-600"
              />

            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">

              Verified Purchases

            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">

              Every resale item includes verified purchase proof from Re-Market.

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg p-6">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-5">

              <FiRefreshCcw
                size={26}
                className="text-blue-600"
              />

            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">

              Safe Resale

            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">

              Buy and sell securely with trusted buyers and protected transactions.

            </p>

          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg p-6">

            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-5">

              <FiTrendingUp
                size={26}
                className="text-purple-600"
              />

            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">

              Better Value

            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">

              Discover premium products at better prices from verified sellers.

            </p>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">

              <FiCheckCircle size={15} />

              Verified Listings

            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">

              Resale Marketplace

            </h2>

          </div>

          <Link
            to="/resale/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:-translate-y-1"
          >

            Sell Your Product

            <FiArrowRight size={18} />

          </Link>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">

            {[...Array(8)].map(
              (_, i) => (

                <div
                  key={i}
                  className="h-[340px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 animate-pulse"
                />

              ))}

          </div>

        ) : listings.length === 0 ? (

          /* EMPTY */

          <div className="rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl text-center py-20 px-6">

            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">

              <FiShield
                size={34}
                className="text-emerald-600"
              />

            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">

              No Resale Listings Yet

            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">

              Be the first seller to list a verified resale product on Re-Market.

            </p>

            <Link
              to="/resale/create"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >

              List Your First Item

            </Link>

          </div>

        ) : (

          /* GRID */

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">

            {listings.map((listing) => (

              <ProductCard
                key={listing._id}
                product={{
                  _id: listing._id,
                  name:
                    listing.originalProduct?.name,
                  brand:
                    listing.originalProduct?.brand,
                  images:
                    listing.images,
                  image:
                    listing.images?.[0],
                  resalePrice:
                    listing.resalePrice,
                  verifiedPurchase:
                    listing.verifiedPurchase
                }}
                isResale
              />

            ))}

          </div>

        )}

      </div>

    </section>

  )

}