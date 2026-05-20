import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiStar
} from 'react-icons/fi'

export default function HeroSection() {

  return (

    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-emerald-50
      via-white
      to-green-50
      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-950
    "
    >

      {/* BACKGROUND */}

      <div
        className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      "
      >

        <div
          className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[320px]
          h-[320px]
          rounded-full
          bg-emerald-400/20
          blur-3xl
        "
        />

        <div
          className="
          absolute
          bottom-[-120px]
          left-[-120px]
          w-[280px]
          h-[280px]
          rounded-full
          bg-green-400/20
          blur-3xl
        "
        />

      </div>

      {/* CONTENT */}

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-14
        sm:py-16
        lg:py-24
      "
      >

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-14
          items-center
        "
        >

          {/* LEFT */}

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
              duration: 0.7
            }}
            className="
            text-center
            lg:text-left
          "
          >

            {/* BADGE */}

            <motion.div
              whileHover={{
                scale: 1.03
              }}
              className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/80
              dark:bg-slate-800/80
              border
              border-emerald-200
              dark:border-slate-700
              shadow-lg
              backdrop-blur-md
              mb-6
            "
            >

              <FiStar
                className="
                text-emerald-500
              "
              />

              <span
                className="
                text-sm
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
              >

                Trusted Marketplace Platform

              </span>

            </motion.div>

            {/* TITLE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.1
              }}
              className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-black
              leading-tight
              tracking-tight
              text-slate-900
              dark:text-white
            "
            >

              Buy & Sell
              <span
                className="
                block
                bg-gradient-to-r
                from-emerald-500
                to-green-600
                bg-clip-text
                text-transparent
              "
              >

                Smarter Online

              </span>

            </motion.h1>

            {/* DESC */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.2
              }}
              className="
              mt-6
              text-base
              sm:text-lg
              lg:text-xl
              leading-relaxed
              text-slate-600
              dark:text-slate-300
              max-w-2xl
              mx-auto
              lg:mx-0
            "
            >

              Discover premium products,
              trusted sellers, and secure
              shopping experiences with a
              modern marketplace built for
              speed, style, and convenience.

            </motion.p>

            {/* BUTTONS */}

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
                duration: 0.8,
                delay: 0.3
              }}
              className="
              mt-8
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              lg:justify-start
              gap-4
            "
            >

              <Link
                to="/products"
                className="
                group
                relative
                overflow-hidden
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                to-green-600
                text-white
                font-bold
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-emerald-500/30
              "
              >

                <span
                  className="
                  relative
                  z-10
                "
                >

                  Shop Now

                </span>

                <FiArrowRight
                  className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                />

                <span
                  className="
                  absolute
                  inset-0
                  bg-white/10
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
                />

              </Link>

              <Link
                to="/resale"
                className="
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-700
                bg-white/80
                dark:bg-slate-900/70
                text-slate-900
                dark:text-white
                font-bold
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-emerald-500
                hover:text-white
                hover:border-emerald-500
                hover:scale-105
                hover:shadow-xl
              "
              >

                Sell Products

                <FiShoppingBag />

              </Link>

            </motion.div>

            {/* FEATURES */}

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
                duration: 0.8,
                delay: 0.4
              }}
              className="
              mt-10
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-4
            "
            >

              {/* FEATURE */}

              <div
                className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-slate-800
                backdrop-blur-md
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
              >

                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
                >

                  <FiTruck size={20} />

                </div>

                <div
                  className="
                  text-left
                "
                >

                  <h4
                    className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                  >

                    Fast Delivery

                  </h4>

                  <p
                    className="
                    text-sm
                    text-slate-600
                    dark:text-slate-400
                  "
                  >

                    Quick shipping

                  </p>

                </div>

              </div>

              {/* FEATURE */}

              <div
                className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-slate-800
                backdrop-blur-md
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
              >

                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
                >

                  <FiShield size={20} />

                </div>

                <div
                  className="
                  text-left
                "
                >

                  <h4
                    className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                  >

                    Secure Payment

                  </h4>

                  <p
                    className="
                    text-sm
                    text-slate-600
                    dark:text-slate-400
                  "
                  >

                    Safe checkout

                  </p>

                </div>

              </div>

              {/* FEATURE */}

              <div
                className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-slate-800
                backdrop-blur-md
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
              >

                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
                >

                  <FiStar size={20} />

                </div>

                <div
                  className="
                  text-left
                "
                >

                  <h4
                    className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                  >

                    Top Quality

                  </h4>

                  <p
                    className="
                    text-sm
                    text-slate-600
                    dark:text-slate-400
                  "
                  >

                    Trusted products

                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8
            }}
            className="
            relative
            flex
            justify-center
            lg:justify-end
          "
          >

            {/* MAIN CARD */}

            <div
              className="
              relative
              w-full
              max-w-[560px]
            "
            >

              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="
                relative
                rounded-[32px]
                overflow-hidden
                border
                border-white/20
                shadow-[0_25px_80px_rgba(16,185,129,0.18)]
                bg-white/60
                dark:bg-slate-900/70
                backdrop-blur-xl
              "
              >

                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
                  alt="Hero Product"
                  className="
                  w-full
                  h-[300px]
                  sm:h-[420px]
                  lg:h-[520px]
                  object-cover
                "
                />

                {/* OVERLAY */}

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-black/10
                  to-transparent
                "
                />

                {/* FLOATING CARD */}

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
                    duration: 0.8,
                    delay: 0.4
                  }}
                  className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  rounded-2xl
                  bg-white/90
                  dark:bg-slate-900/85
                  backdrop-blur-xl
                  p-5
                  shadow-xl
                "
                >

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                  >

                    <div>

                      <h3
                        className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                      >

                        Premium Collection

                      </h3>

                      <p
                        className="
                        mt-1
                        text-sm
                        text-slate-600
                        dark:text-slate-400
                      "
                      >

                        Trending products with
                        premium quality

                      </p>

                    </div>

                    <div
                      className="
                      shrink-0
                      px-4
                      py-2
                      rounded-xl
                      bg-emerald-500
                      text-white
                      text-sm
                      font-bold
                      shadow-lg
                    "
                    >

                      New

                    </div>

                  </div>

                </motion.div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  )

}