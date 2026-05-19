import { motion } from 'framer-motion'

import { Link } from 'react-router-dom'

import {
  FiArrowRight,
  FiShield,
  FiTrendingUp
} from 'react-icons/fi'

export default function HeroSection() {

  return (

    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-teal-900">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        {/* GRID */}

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* GLOW */}

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[360px] h-[360px] bg-cyan-400/20 rounded-full blur-3xl" />

        {/* FLOATING SHAPES */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-24 left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-24 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
        />

      </div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8
            }}
            className="text-center lg:text-left"
          >

            {/* BADGE */}

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
                delay: 0.2,
                duration: 0.6
              }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-semibold mb-7"
            >

              <FiTrendingUp size={16} />

              Trusted Marketplace Platform

            </motion.div>

            {/* TITLE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.35,
                duration: 0.8
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
            >

              Shop Smart with{' '}

              <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-pink-300 bg-clip-text text-transparent">

                Re-Market

              </span>

            </motion.h1>

            {/* DESC */}

            <motion.p
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5,
                duration: 0.8
              }}
              className="text-base sm:text-lg lg:text-xl text-emerald-50/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-9"
            >

              Discover verified products, secure resale listings, trusted sellers, and a premium shopping experience built for modern buyers and resellers.

            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.65,
                duration: 0.8
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white text-emerald-700 font-bold text-base hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:-translate-y-1"
              >

                Shop Now

                <FiArrowRight size={20} />

              </Link>

              <Link
                to="/resale"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-bold text-base hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >

                <FiShield size={20} />

                Verified Resale

              </Link>

            </motion.div>

            {/* STATS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.8,
                duration: 0.8
              }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-10 mt-12"
            >

              <div>

                <div className="text-3xl font-black text-white">

                  10K+

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Products

                </div>

              </div>

              <div>

                <div className="text-3xl font-black text-white">

                  5K+

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Verified Sellers

                </div>

              </div>

              <div>

                <div className="text-3xl font-black text-white">

                  50K+

                </div>

                <div className="text-emerald-100 text-sm mt-1">

                  Happy Customers

                </div>

              </div>

            </motion.div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="relative hidden lg:flex justify-center items-center"
          >

            {/* MAIN CARD */}

            <motion.div
              animate={{
                y: [0, -12, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative w-[420px] h-[420px] rounded-[40px] bg-white/10 border border-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

              <div className="absolute top-8 left-8 right-8 flex justify-between items-center">

                <div>

                  <div className="w-24 h-3 rounded-full bg-white/30 mb-3" />

                  <div className="w-32 h-3 rounded-full bg-white/20" />

                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 shadow-xl" />

              </div>

              <div className="absolute left-8 right-8 top-32 h-40 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 shadow-2xl" />

              <div className="absolute left-8 right-8 bottom-10 space-y-4">

                <div className="h-3 rounded-full bg-white/25 w-full" />

                <div className="h-3 rounded-full bg-white/20 w-4/5" />

                <div className="flex gap-4 pt-4">

                  <div className="flex-1 h-14 rounded-2xl bg-white/15" />

                  <div className="flex-1 h-14 rounded-2xl bg-white/10" />

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>

  )

}