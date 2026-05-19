import { Link } from 'react-router-dom'

import {
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiDollarSign
} from 'react-icons/fi'

export default function ResalePage() {

  return (

    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-semibold mb-6">

              <FiShield size={15} />

              Trusted Resale Marketplace

            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">

              Buy & Sell with Confidence

            </h1>

            <p className="mt-6 text-lg sm:text-xl text-emerald-50 leading-relaxed max-w-2xl">

              Explore verified resale listings from trusted Re-Market buyers.
              Every listing is authenticated for a secure and premium resale experience.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                to="/seller/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#0f172a] text-white font-bold hover:bg-[#111827] transition-all duration-300 shadow-2xl"
              >

                Sell an Item

                <FiArrowRight size={18} />

              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white hover:text-emerald-700 transition-all duration-300"
              >

                Browse Products

              </Link>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>

                <h3 className="text-3xl font-black text-white">

                  100%

                </h3>

                <p className="text-emerald-100 text-sm sm:text-base">

                  Verified Listings

                </p>

              </div>

              <div>

                <h3 className="text-3xl font-black text-white">

                  Secure

                </h3>

                <p className="text-emerald-100 text-sm sm:text-base">

                  Transactions

                </p>

              </div>

              <div>

                <h3 className="text-3xl font-black text-white">

                  Trusted

                </h3>

                <p className="text-emerald-100 text-sm sm:text-base">

                  Community

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#030712] transition-colors duration-300 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">

            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-5">

              Why Choose Re-Market?

            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">

              Secure, trusted and verified resale platform designed for modern ecommerce users.

            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* CARD 1 */}

            <div className="group rounded-[30px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">

              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6">

                <FiShield
                  className="text-emerald-600 dark:text-emerald-400"
                  size={28}
                />

              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">

                Verified Purchases

              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">

                Every resale item includes verified purchase proof from Re-Market.

              </p>

            </div>

            {/* CARD 2 */}

            <div className="group rounded-[30px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">

              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6">

                <FiTrendingUp
                  className="text-blue-600 dark:text-blue-400"
                  size={28}
                />

              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">

                Safe Resale

              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">

                Buy and sell securely with trusted buyers and protected transactions.

              </p>

            </div>

            {/* CARD 3 */}

            <div className="group rounded-[30px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">

              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6">

                <FiDollarSign
                  className="text-purple-600 dark:text-purple-400"
                  size={28}
                />

              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">

                Better Value

              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">

                Discover premium products at better prices from verified sellers.

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}