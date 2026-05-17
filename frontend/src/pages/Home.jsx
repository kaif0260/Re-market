import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from '../api/axios'
import ProductCard from '../components/product/ProductCard'
import HeroSection from '../components/HeroSection'
import ImageSlider from '../components/ImageSlider'
import {
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiCheckCircle
} from 'react-icons/fi'

export default function Home() {
  const [products, setProducts] = useState([])
  const [resaleListings, setResaleListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [productsRes, resaleRes] = await Promise.all([
          axios.get('/products?limit=8&sort=popular'),
          axios
            .get('/resale?limit=4')
            .catch(() => ({ data: { listings: [] } }))
        ])

        setProducts(productsRes.data.products || [])
        setResaleListings(resaleRes.data.listings || [])
      } catch (err) {
        setProducts([])
        setResaleListings([])
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return (
    <>
      <Helmet>
        <title>
          Re-Market | Multi-Vendor E-Commerce & Verified Resale
        </title>

        <meta
          name="description"
          content="Buy from verified sellers or resell your purchases. Re-Market - Your trusted marketplace."
        />
      </Helmet>

      <HeroSection />

      <ImageSlider />

      {/* Trending Products */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Trending Products
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Discover what's popular right now
              </p>
            </div>

            <a
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-green-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All <FiArrowRight size={18} />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-64 sm:h-72 animate-pulse shadow-lg"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp size={32} className="text-gray-400" />
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                No products yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Verified Resale */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FiShield size={16} />
              100% Verified
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Verified Resale
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Buy and sell with confidence. Every resale listing is verified
              with proof of purchase.
            </p>
          </div>

          {resaleListings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {resaleListings.map((listing) => (
                <ProductCard
                  key={listing._id}
                  product={{
                    ...listing.originalProduct,
                    ...listing,
                    image: listing.images?.[0]
                  }}
                  isResale
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 mb-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={32} className="text-gray-400" />
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                No resale listings yet.
              </p>
            </div>
          )}

          <div className="text-center">
            <a
              href="/resale"
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Resale <FiArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Re-Market?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Experience the difference with our premium marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiShield size={32} className="text-white" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                Verified Sellers
              </h3>

              <p className="text-gray-600">
                Every seller is thoroughly verified with identity checks and
                business validation.
              </p>
            </div>

            <div className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle size={32} className="text-white" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                Secure Payments
              </h3>

              <p className="text-gray-600">
                Protected transactions with escrow service and buyer/seller
                protection guarantee.
              </p>
            </div>

            <div className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiUsers size={32} className="text-white" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                Community Driven
              </h3>

              <p className="text-gray-600">
                Join thousands of sellers and buyers in a thriving, trusted
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Selling?
          </h2>

          <p className="text-base sm:text-lg text-green-50 mb-8">
            Join thousands of successful sellers on Re-Market
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/seller/register"
              className="px-5 py-3 sm:px-6 sm:py-3 bg-white text-green-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              Become a Seller
            </a>

            <a
              href="/products"
              className="px-5 py-3 sm:px-6 sm:py-3 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    </>
  )
}