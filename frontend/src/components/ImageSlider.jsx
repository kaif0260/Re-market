import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import axios from '../api/axios'

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [upcomingProducts, setUpcomingProducts] = useState([])
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    // Fetch active upcoming products (public)
    let mounted = true
    const fetch = async () => {
      try {
        const res = await axios.get('/products/upcoming')
        if (!mounted) return
        const items = res.data.products || []
        setUpcomingProducts(items)

        // Start from first video if present, else 0
        const firstVideoIndex = items.findIndex(i => i.mediaType === 'video')
        setCurrentIndex(firstVideoIndex >= 0 ? firstVideoIndex : 0)
      } catch (err) {
        // fallback: keep empty
      }
    }
    fetch()
    return () => { mounted = false }
  }, [])

  // Handle auto-advance depending on media type
  useEffect(() => {
    if (!upcomingProducts || upcomingProducts.length === 0) return

    const current = upcomingProducts[currentIndex]

    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (current?.mediaType === 'video') {
      // ensure video plays and advance on ended
      const v = videoRef.current
      if (v) {
        v.currentTime = 0
        v.play().catch(() => {})
      }
      // do not auto-skip; rely on ended event
    } else {
      // auto-advance images after 5s
      timerRef.current = setTimeout(() => {
        setCurrentIndex(prev => (prev === upcomingProducts.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, upcomingProducts])

  const goToPrevious = () => {
    if (!upcomingProducts || upcomingProducts.length === 0) return
    setCurrentIndex(currentIndex === 0 ? upcomingProducts.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    if (!upcomingProducts || upcomingProducts.length === 0) return
    setCurrentIndex(currentIndex === upcomingProducts.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index) => {
    if (!upcomingProducts || upcomingProducts.length === 0) return
    setCurrentIndex(index)
  }

  const current = upcomingProducts[currentIndex] || null

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-transparent" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Upcoming Products
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Explore what's coming next to Re-Market. Be the first to know about our latest arrivals.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {current ? (
                  current.mediaType === 'video' ? (
                    <video
                      ref={videoRef}
                      src={current.mediaUrl}
                      poster={current.thumbnailUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      controls
                      playsInline
                      preload="metadata"
                      onEnded={() => setCurrentIndex(prev => (prev === upcomingProducts.length - 1 ? 0 : prev + 1))}
                    />
                  ) : (
                    <img
                      src={current.mediaUrl}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-center px-6">
                    <div>
                      <p className="text-white text-2xl font-semibold mb-4">No upcoming banner available</p>
                      <p className="text-blue-200">Add a video or image from admin Upcoming Products to show here.</p>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                {current && (
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {current.title}
                      </h3>
                      <p className="text-lg md:text-xl text-blue-200">
                        {current.description}
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <FiChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <FiChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {upcomingProducts.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-blue-200 text-lg mb-6">
            Want to be notified when these products arrive?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            Notify Me When Available
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}