import { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet-async'

import { Link } from 'react-router-dom'

import axios from '../api/axios'

import ProductCard from '../components/product/ProductCard'

import HeroSection from '../components/HeroSection'

import ImageSlider from '../components/ImageSlider'

import {
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiStar
} from 'react-icons/fi'

export default function Home() {

  const [products, setProducts] =
    useState([])

  const [resaleListings, setResaleListings] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [
          productsRes,
          resaleRes
        ] = await Promise.all([

          axios.get(
            '/products?limit=8&sort=popular'
          ),

          axios
            .get('/resale?limit=4')
            .catch(() => ({
              data: {
                listings: []
              }
            }))

        ])

        setProducts(
          productsRes.data.products || []
        )

        setResaleListings(
          resaleRes.data.listings || []
        )

      } catch (err) {

        setProducts([])

        setResaleListings([])

      } finally {

        setLoading(false)

      }

    }

    fetchData()

  }, [])

  return (

    <>

      <Helmet>

        <title>

          Re-Market | Verified Multi-Vendor Marketplace

        </title>

        <meta
          name="description"
          content="Buy from verified sellers or resell your purchases with confidence on Re-Market."
        />

      </Helmet>

      {/* HERO */}

      <HeroSection />

      {/* SLIDER */}

      <section className="relative bg-[#f7fff7] dark:bg-black transition-colors duration-500 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_60%)]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          <ImageSlider />

        </div>

      </section>

      {/* TRENDING PRODUCTS */}

      <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-[#f0fdf4] to-white dark:from-black dark:to-[#111827] transition-colors duration-500 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-emerald-500/5 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-400/5 rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5">

                <FiTrendingUp size={15} />

                Most Popular

              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white tracking-tight leading-tight mb-4">

                Trending Products

              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">

                Explore top-rated products loved by thousands of buyers across Re-Market.

              </p>

            </div>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300"
            >

              View All Products

              <FiArrowRight size={18} />

            </Link>

          </div>

          {loading ? (

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">

              {[...Array(8)].map(
                (_, i) => (

                <div
                  key={i}
                  className="h-[340px] rounded-3xl bg-[#f0fdf4] dark:bg-[#1f2937] border border-green-100 dark:border-gray-700 animate-pulse"
                />

              ))}

            </div>

          ) : products.length > 0 ? (

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">

              {products.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            <div className="rounded-[32px] bg-[#f0fdf4] dark:bg-[#1f2937] border border-green-100 dark:border-gray-700 shadow-2xl text-center py-20 px-6">

              <div className="w-20 h-20 rounded-full bg-white dark:bg-[#111827] flex items-center justify-center mx-auto mb-6">

                <FiTrendingUp
                  size={34}
                  className="text-slate-400"
                />

              </div>

              <h3 className="text-3xl font-black text-black dark:text-white mb-4">

                Products Coming Soon

              </h3>

              <p className="text-gray-700 dark:text-gray-300">

                We are preparing amazing products for you.

              </p>

            </div>

          )}

        </div>

      </section>

      {/* VERIFIED RESALE */}

      <section className="relative py-14 sm:py-16 lg:py-24 bg-[#f7fff7] dark:bg-black transition-colors duration-500 overflow-hidden border-y border-green-100 dark:border-gray-800 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5">

              <FiShield size={15} />

              Trusted Resale Marketplace

            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white tracking-tight mb-5">

              Verified Resale

            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">

              Buy and sell confidently with verified proof of purchase and trusted sellers.

            </p>

          </div>

          {resaleListings.length > 0 ? (

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7 mb-14">

              {resaleListings.map((listing) => (

                <ProductCard
                  key={listing._id}
                  product={{
                    ...listing.originalProduct,
                    ...listing,
                    image:
                      listing.images?.[0]
                  }}
                  isResale
                />

              ))}

            </div>

          ) : (

            <div className="rounded-[32px] bg-[#f0fdf4] dark:bg-[#1f2937] border border-green-100 dark:border-gray-700 text-center py-20 px-6 mb-14 shadow-2xl">

              <div className="w-20 h-20 rounded-full bg-white dark:bg-[#111827] shadow-lg flex items-center justify-center mx-auto mb-6">

                <FiCheckCircle
                  size={34}
                  className="text-emerald-500"
                />

              </div>

              <h3 className="text-3xl font-black text-black dark:text-white mb-4">

                No Resale Listings Yet

              </h3>

              <p className="text-gray-700 dark:text-gray-300">

                Start selling your verified products today.

              </p>

            </div>

          )}

          <div className="text-center">

            <Link
              to="/resale"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300"
            >

              Explore Resale Marketplace

              <FiArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-[#dff7e8] to-[#eefcf2] dark:from-black dark:to-[#111827] transition-colors duration-500 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#111827] border border-green-100 dark:border-gray-700 shadow-sm text-slate-700 dark:text-slate-300 text-sm font-semibold mb-5">

              <FiStar size={14} />

              Premium Experience

            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white tracking-tight mb-5">

              Why Choose Re-Market?

            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">

              Experience a trusted, secure, and community-driven marketplace designed for modern ecommerce.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            <div className="group relative rounded-[32px] bg-[#1f2937] dark:bg-[#1f2937] border border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 text-center overflow-hidden">

              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-7 shadow-xl">

                <FiShield
                  size={34}
                  className="text-white"
                />

              </div>

              <div className="relative">

                <h3 className="text-2xl font-black text-white mb-4">

                  Verified Sellers

                </h3>

                <p className="text-gray-300 leading-relaxed">

                  Every seller goes through verification and trust checks for safer shopping.

                </p>

              </div>

            </div>

            <div className="group relative rounded-[32px] bg-[#1f2937] dark:bg-[#1f2937] border border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 text-center overflow-hidden">

              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-7 shadow-xl">

                <FiCheckCircle
                  size={34}
                  className="text-white"
                />

              </div>

              <div className="relative">

                <h3 className="text-2xl font-black text-white mb-4">

                  Secure Payments

                </h3>

                <p className="text-gray-300 leading-relaxed">

                  Protected transactions with advanced payment security and buyer protection.

                </p>

              </div>

            </div>

            <div className="group relative rounded-[32px] bg-[#1f2937] dark:bg-[#1f2937] border border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 text-center overflow-hidden">

              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-7 shadow-xl">

                <FiUsers
                  size={34}
                  className="text-white"
                />

              </div>

              <div className="relative">

                <h3 className="text-2xl font-black text-white mb-4">

                  Trusted Community

                </h3>

                <p className="text-gray-300 leading-relaxed">

                  Join thousands of buyers and sellers building a smarter ecommerce experience.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>

  )

}