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

        /* LEFT CORNER BLAST */

        confetti({
          particleCount: 8,
          angle: randomInRange(55, 125),
          spread: randomInRange(60, 90),
          startVelocity: 65,
          gravity: 0.9,
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.5, 0.5),
          origin: {
            x: 0,
            y: 1
          },
          colors
        })

        /* RIGHT CORNER BLAST */

        confetti({
          particleCount: 8,
          angle: randomInRange(55, 125),
          spread: randomInRange(60, 90),
          startVelocity: 65,
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

            {/* TOP BLUE GLOW */}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl"></div>

            {/* SUCCESS TICK */}

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
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#2563eb]"
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
                className="h-12 w-12 text-white"
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
                className="text-gray-500 text-[24px] font-semibold mb-4"
              >

                `{couponCode}` applied

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
                className="text-[52px] leading-tight font-black text-black mb-5"
              >

                You saved ₹{discount}

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
                className="text-gray-500 text-[22px] leading-relaxed mb-10"
              >

                You're also getting scratch card on this order

              </motion.p>

              {/* BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={onClose}
                className="text-pink-500 text-[32px] font-bold"
              >

                Woohoo! Thanks

              </motion.button>

            </div>

            {/* BOTTOM GLOW */}

            <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-pink-500/10 blur-3xl"></div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}