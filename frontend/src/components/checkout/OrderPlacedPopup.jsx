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

      const duration = 3500
      const animationEnd = Date.now() + duration

      const colors = [
        '#ff4d6d',
        '#ffd60a',
        '#4cc9f0',
        '#80ed99',
        '#c77dff',
        '#ff9f1c',
        '#ff66c4'
      ]

      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min
      }

      const frame = () => {

        /* LEFT BLAST */

        confetti({
          particleCount: 10,
          angle: randomInRange(55, 125),
          spread: randomInRange(70, 100),
          startVelocity: 70,
          gravity: 0.9,
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.5, 0.5),
          origin: {
            x: 0,
            y: 1
          },
          colors
        })

        /* RIGHT BLAST */

        confetti({
          particleCount: 10,
          angle: randomInRange(55, 125),
          spread: randomInRange(70, 100),
          startVelocity: 70,
          gravity: 0.9,
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.5, 0.5),
          origin: {
            x: 1,
            y: 1
          },
          colors
        })

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame)
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
          className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
        >

          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
              y: 60
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.8,
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 16
            }}
            className="relative w-full max-w-md rounded-[36px] bg-white px-8 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.15)] overflow-hidden"
          >

            {/* TOP GREEN GLOW */}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-52 w-52 rounded-full bg-green-500/10 blur-3xl"></div>

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
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-500 shadow-xl"
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
                className="h-14 w-14 text-white"
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

            <div className="text-center">

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
                  delay: 0.3
                }}
                className="text-[48px] leading-tight font-black text-black mb-4"
              >

                🎉 Congratulations!

              </motion.h1>

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
                  delay: 0.4
                }}
                className="text-gray-500 text-[24px] font-medium leading-relaxed mb-8"
              >

                Your order has been placed successfully

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
                  delay: 0.5
                }}
                className="rounded-[28px] bg-gray-50 border border-gray-100 p-6 mb-8"
              >

                <div className="flex items-center justify-between mb-4">

                  <span className="text-gray-500 text-lg">
                    Order ID
                  </span>

                  <span className="font-bold text-black text-lg">
                    #{orderId}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 text-lg">
                    You Saved
                  </span>

                  <span className="font-black text-green-600 text-2xl">
                    ₹{savedAmount}
                  </span>

                </div>

              </motion.div>

              {/* BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={onClose}
                className="rounded-full bg-green-500 px-10 py-4 text-white text-2xl font-bold shadow-lg transition-all duration-300 hover:bg-green-600"
              >

                Track Order

              </motion.button>

            </div>

            {/* BOTTOM GLOW */}

            <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl"></div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}