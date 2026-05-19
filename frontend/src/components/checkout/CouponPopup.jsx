import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function CouponPopup({
  open,
  onClose,
  couponCode,
  discount
}) {

  useEffect(() => {

    if (open) {

      const duration = 3000

      const animationEnd =
        Date.now() + duration

      const colors = [
        '#ff4d6d',
        '#ffd60a',
        '#4cc9f0',
        '#80ed99',
        '#c77dff',
        '#ff9f1c',
        '#ff66c4'
      ]

      const randomInRange = (
        min,
        max
      ) => {

        return (
          Math.random() *
            (max - min) +
          min
        )

      }

      const frame = () => {

        /* LEFT */

        confetti({

          particleCount: 8,

          angle: randomInRange(
            55,
            125
          ),

          spread: randomInRange(
            60,
            90
          ),

          startVelocity: 65,

          gravity: 0.9,

          scalar: randomInRange(
            0.8,
            1.2
          ),

          drift: randomInRange(
            -0.5,
            0.5
          ),

          origin: {
            x: 0,
            y: 1
          },

          colors

        })

        /* RIGHT */

        confetti({

          particleCount: 8,

          angle: randomInRange(
            55,
            125
          ),

          spread: randomInRange(
            60,
            90
          ),

          startVelocity: 65,

          gravity: 0.9,

          scalar: randomInRange(
            0.8,
            1.2
          ),

          drift: randomInRange(
            -0.5,
            0.5
          ),

          origin: {
            x: 1,
            y: 1
          },

          colors

        })

        if (
          Date.now() <
          animationEnd
        ) {

          requestAnimationFrame(
            frame
          )

        }

      }

      frame()

    }

  }, [open])

  return (

    <AnimatePresence>

      {open && (

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center p-4"
        >

          <motion.div
            initial={{
              scale: 0.75,
              opacity: 0,
              y: 50
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.85,
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 16
            }}
            className="relative w-full max-w-[420px] rounded-[28px] sm:rounded-[36px] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/[0.06] px-6 sm:px-8 py-7 sm:py-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden"
          >

            {/* TOP GLOW */}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

            {/* BOTTOM GLOW */}

            <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-pink-500/10 blur-3xl" />

            {/* SUCCESS ICON */}

            <motion.div
              initial={{
                scale: 0,
                rotate: -180
              }}
              animate={{
                scale: 1,
                rotate: 0
              }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 250
              }}
              className="relative mx-auto mb-7 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl"
            >

              <motion.svg
                initial={{
                  pathLength: 0
                }}
                animate={{
                  pathLength: 1
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.5
                }}
                className="h-10 w-10 sm:h-12 sm:w-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >

                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />

              </motion.svg>

            </motion.div>

            {/* CONTENT */}

            <div className="relative text-center">

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.3
                }}
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold mb-4"
              >

                Coupon Applied

              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.35
                }}
                className="inline-flex items-center justify-center px-5 py-2 rounded-2xl bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/[0.06] text-emerald-600 dark:text-emerald-400 font-black text-lg mb-6"
              >

                {couponCode}

              </motion.div>

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
                  delay: 0.4
                }}
                className="text-3xl sm:text-5xl leading-tight font-black text-slate-900 dark:text-white mb-5"
              >

                You Saved ₹{discount}

              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  delay: 0.5
                }}
                className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-7"
              >

                Your discount has been successfully applied to this order.

              </motion.p>

              {/* BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.04
                }}
                whileTap={{
                  scale: 0.96
                }}
                onClick={onClose}
                className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl sm:text-2xl font-bold shadow-xl hover:shadow-pink-500/25 transition-all duration-300"
              >

                Woohoo! Thanks

              </motion.button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}