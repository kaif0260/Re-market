import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function OrderPlacedPopup({
  open,
  onClose,
  orderId,
  savedAmount
}) {

  useEffect(() => {

    if (!open) return

    const duration = 3500

    const animationEnd =
      Date.now() + duration

    const colors = [
      '#22c55e',
      '#4ade80',
      '#86efac',
      '#10b981',
      '#34d399',
      '#facc15',
      '#38bdf8'
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

      /* LEFT CORNER */

      confetti({

        particleCount:
          window.innerWidth < 640
            ? 5
            : 8,

        angle: randomInRange(
          55,
          125
        ),

        spread: randomInRange(
          70,
          100
        ),

        startVelocity: 70,

        gravity: 0.9,

        scalar: randomInRange(
          0.7,
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

      /* RIGHT CORNER */

      confetti({

        particleCount:
          window.innerWidth < 640
            ? 5
            : 8,

        angle: randomInRange(
          55,
          125
        ),

        spread: randomInRange(
          70,
          100
        ),

        startVelocity: 70,

        gravity: 0.9,

        scalar: randomInRange(
          0.7,
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
          className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
        >

          <motion.div
            initial={{
              scale: 0.75,
              opacity: 0,
              y: 60
            }}
            animate={{
              scale: [0.8, 1.03, 1],
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.9,
              opacity: 0
            }}
            transition={{
              duration: 0.45,
              ease: 'easeOut'
            }}
            className="relative w-full max-w-[92vw] sm:max-w-[430px] overflow-hidden rounded-[30px] sm:rounded-[38px] border border-white/10 bg-white dark:bg-[#0f172a] shadow-[0_25px_100px_rgba(0,0,0,0.22)]"
          >

            {/* TOP GLOW */}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"></div>

            {/* BOTTOM GLOW */}

            <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-green-500/10 blur-3xl"></div>

            <div className="relative z-10 px-5 sm:px-8 py-7 sm:py-9 text-center">

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
                  delay: 0.15,
                  type: 'spring',
                  stiffness: 220
                }}
                className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-2xl"
              >

                <motion.svg
                  initial={{
                    pathLength: 0
                  }}
                  animate={{
                    pathLength: 1
                  }}
                  transition={{
                    delay: 0.35,
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

              {/* TITLE */}

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
                  delay: 0.25
                }}
                className="text-sm sm:text-lg font-semibold text-slate-500 dark:text-slate-400 mb-4"
              >

                Order Confirmed

              </motion.p>

              {/* HEADING */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 15
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.35
                }}
                className="text-[34px] sm:text-[52px] leading-tight font-black text-slate-900 dark:text-white mb-5"
              >

                🎉 Congratulations!

              </motion.h1>

              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  delay: 0.4
                }}
                className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8"
              >

                Your order has been placed successfully and is now being processed.

              </motion.p>

              {/* ORDER CARD */}

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
                  delay: 0.45
                }}
                className="rounded-[26px] bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/[0.06] p-5 sm:p-6 mb-8"
              >

                <div className="flex items-center justify-between gap-4 mb-4">

                  <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    Order ID
                  </span>

                  <span className="text-sm sm:text-lg font-black text-slate-900 dark:text-white break-all text-right">
                    #{orderId}
                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    You Saved
                  </span>

                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{savedAmount}
                  </span>

                </div>

              </motion.div>

              {/* BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.04
                }}
                whileTap={{
                  scale: 0.96
                }}
                onClick={onClose}
                className="inline-flex items-center justify-center h-12 sm:h-14 px-7 sm:px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-lg sm:text-2xl font-bold shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
              >

                Track Order

              </motion.button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}