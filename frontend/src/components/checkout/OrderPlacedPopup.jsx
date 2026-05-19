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

    if (open) {

      const duration = 3000

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

        confetti({

          particleCount: 8,

          angle: randomInRange(
            55,
            125
          ),

          spread: randomInRange(
            65,
            95
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

        confetti({

          particleCount: 8,

          angle: randomInRange(
            55,
            125
          ),

          spread: randomInRange(
            65,
            95
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
            className="relative w-full max-w-[430px] rounded-[30px] sm:rounded-[36px] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/[0.06] px-6 sm:px-8 py-7 sm:py-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden"
          >

            {/* TOP GLOW */}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />

            {/* BOTTOM GLOW */}

            <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

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
              className="relative mx-auto mb-7 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-2xl"
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

                Order Confirmed

              </motion.p>

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

                🎉 Congratulations!

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
                  delay: 0.55
                }}
                className="rounded-[26px] bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/[0.06] p-5 sm:p-6 mb-7"
              >

                <div className="flex items-center justify-between mb-4 gap-4">

                  <span className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">

                    Order ID

                  </span>

                  <span className="font-black text-slate-900 dark:text-white text-sm sm:text-lg">

                    #{orderId}

                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">

                    You Saved

                  </span>

                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-xl sm:text-2xl">

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
                className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-lg sm:text-xl font-bold shadow-xl hover:shadow-emerald-500/25 transition-all duration-300"
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