import { useState, useEffect, useRef } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import {
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'

import axios from '../api/axios'

export default function ImageSlider() {

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [upcomingProducts, setUpcomingProducts] =
    useState([])

  const videoRef = useRef(null)

  const timerRef = useRef(null)

  useEffect(() => {

    let mounted = true

    const fetch = async () => {

      try {

        const res = await axios.get(
          '/products/upcoming'
        )

        if (!mounted) return

        const items =
          res.data.products || []

        setUpcomingProducts(items)

        const firstVideoIndex =
          items.findIndex(
            i =>
              i.mediaType === 'video'
          )

        setCurrentIndex(

          firstVideoIndex >= 0
            ? firstVideoIndex
            : 0

        )

      } catch (err) {

        console.log(err)

      }

    }

    fetch()

    return () => {

      mounted = false

    }

  }, [])

  useEffect(() => {

    if (
      !upcomingProducts ||
      upcomingProducts.length === 0
    ) return

    const current =
      upcomingProducts[currentIndex]

    if (timerRef.current) {

      clearTimeout(timerRef.current)

      timerRef.current = null

    }

    if (
      current?.mediaType === 'video'
    ) {

      const v = videoRef.current

      if (v) {

        v.currentTime = 0

        v.play().catch(() => {})

      }

    } else {

      timerRef.current = setTimeout(() => {

        setCurrentIndex(prev =>

          prev ===
          upcomingProducts.length - 1
            ? 0
            : prev + 1

        )

      }, 5000)

    }

    return () => {

      if (timerRef.current) {

        clearTimeout(timerRef.current)

      }

    }

  }, [currentIndex, upcomingProducts])

  const goToPrevious = () => {

    if (
      !upcomingProducts ||
      upcomingProducts.length === 0
    ) return

    setCurrentIndex(

      currentIndex === 0
        ? upcomingProducts.length - 1
        : currentIndex - 1

    )

  }

  const goToNext = () => {

    if (
      !upcomingProducts ||
      upcomingProducts.length === 0
    ) return

    setCurrentIndex(

      currentIndex ===
      upcomingProducts.length - 1
        ? 0
        : currentIndex + 1

    )

  }

  const goToSlide = (index) => {

    if (
      !upcomingProducts ||
      upcomingProducts.length === 0
    ) return

    setCurrentIndex(index)

  }

  const current =
    upcomingProducts[currentIndex] || null

  return (

    <section className="relative py-14 sm:py-18 lg:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '70px 70px'
          }}
        />

        <div className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-purple-500/10 rounded-full blur-3xl" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.7
          }}
          viewport={{
            once: true
          }}
          className="text-center mb-12 lg:mb-14"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold mb-5">

            Upcoming Launches

          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">

            Upcoming Products

          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">

            Explore upcoming launches, trending collections, and exclusive products arriving soon on Re-Market.

          </p>

        </motion.div>

        {/* SLIDER */}

        <div className="relative">

          {/* MAIN CARD */}

          <div className="relative h-[260px] sm:h-[420px] lg:h-[620px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] bg-slate-900">

            <AnimatePresence mode="wait">

              <motion.div
                key={currentIndex}
                initial={{
                  opacity: 0,
                  scale: 1.04
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97
                }}
                transition={{
                  duration: 0.55
                }}
                className="absolute inset-0"
              >

                {current ? (

                  current.mediaType === 'video' ? (

                    <video
                      ref={videoRef}
                      src={current.mediaUrl}
                      poster={
                        current.thumbnailUrl
                      }
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      controls
                      playsInline
                      preload="metadata"
                      onEnded={() =>

                        setCurrentIndex(prev =>

                          prev ===
                          upcomingProducts.length - 1
                            ? 0
                            : prev + 1

                        )

                      }
                    />

                  ) : (

                    <img
                      src={current.mediaUrl}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />

                  )

                ) : (

                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-center px-6">

                    <div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">

                        No Upcoming Products

                      </h3>

                      <p className="text-slate-400">

                        Add upcoming products from admin dashboard.

                      </p>

                    </div>

                  </div>

                )}

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                {/* CONTENT */}

                {current && (

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">

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
                        duration: 0.5
                      }}
                    >

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-sm font-semibold mb-5">

                        New Arrival

                      </div>

                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight max-w-3xl">

                        {current.title}

                      </h3>

                      <p className="text-slate-200 text-sm sm:text-lg leading-relaxed max-w-2xl">

                        {current.description}

                      </p>

                    </motion.div>

                  </div>

                )}

              </motion.div>

            </AnimatePresence>

          </div>

          {/* LEFT BTN */}

          <motion.button
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.92
            }}
            onClick={goToPrevious}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-black/50 transition-all duration-300"
          >

            <FiChevronLeft size={24} />

          </motion.button>

          {/* RIGHT BTN */}

          <motion.button
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.92
            }}
            onClick={goToNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-black/50 transition-all duration-300"
          >

            <FiChevronRight size={24} />

          </motion.button>

          {/* DOTS */}

          {upcomingProducts.length > 1 && (

            <div className="flex justify-center gap-3 mt-8">

              {upcomingProducts.map(
                (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    goToSlide(index)
                  }
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-10 h-3 bg-white'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                  }`}
                />

              ))}

            </div>

          )}

        </div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.7,
            delay: 0.2
          }}
          viewport={{
            once: true
          }}
          className="text-center mt-12"
        >

          <p className="text-slate-300 text-base sm:text-lg mb-6">

            Get notified when these products launch.

          </p>

          <button
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
          >

            Notify Me

          </button>

        </motion.div>

      </div>

    </section>

  )

}