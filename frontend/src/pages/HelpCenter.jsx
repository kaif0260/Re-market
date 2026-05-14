import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiSearch, FiShoppingBag, FiCreditCard, FiTruck, FiRefreshCw, FiShield, FiUser, FiSettings } from 'react-icons/fi'

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: FiShoppingBag,
      title: 'Shopping',
      description: 'Find answers about browsing, searching, and purchasing products',
      topics: ['How to search for products', 'Adding items to cart', 'Wishlist management', 'Product reviews']
    },
    {
      icon: FiCreditCard,
      title: 'Payments & Billing',
      description: 'Learn about payment methods, billing, and refunds',
      topics: ['Payment methods', 'Order cancellation', 'Refunds & returns', 'Billing issues']
    },
    {
      icon: FiTruck,
      title: 'Shipping & Delivery',
      description: 'Track orders and understand delivery options',
      topics: ['Delivery timeframes', 'Tracking orders', 'Shipping costs', 'Delivery updates']
    },
    {
      icon: FiRefreshCw,
      title: 'Returns & Exchanges',
      description: 'Information about returns, exchanges, and warranties',
      topics: ['Return policy', 'Exchange process', 'Warranty claims', 'Damaged items']
    },
    {
      icon: FiShield,
      title: 'Account Security',
      description: 'Keep your account safe and manage privacy settings',
      topics: ['Password reset', 'Two-factor authentication', 'Privacy settings', 'Account recovery']
    },
    {
      icon: FiUser,
      title: 'Seller Support',
      description: 'Resources for sellers on our platform',
      topics: ['Getting started', 'Listing products', 'Managing orders', 'Seller dashboard']
    },
    {
      icon: FiSettings,
      title: 'Account Settings',
      description: 'Manage your profile and account preferences',
      topics: ['Profile updates', 'Notification settings', 'Address management', 'Communication preferences']
    }
  ]

  const popularArticles = [
    {
      title: 'How to track your order',
      category: 'Shipping & Delivery',
      readTime: '2 min read'
    },
    {
      title: 'Payment methods and security',
      category: 'Payments & Billing',
      readTime: '3 min read'
    },
    {
      title: 'Return and refund policy',
      category: 'Returns & Exchanges',
      readTime: '4 min read'
    },
    {
      title: 'Creating a seller account',
      category: 'Seller Support',
      readTime: '5 min read'
    },
    {
      title: 'How to reset your password',
      category: 'Account Security',
      readTime: '2 min read'
    },
    {
      title: 'Managing your wishlist',
      category: 'Shopping',
      readTime: '3 min read'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Help Center | Re-Market</title>
        <meta name="description" content="Find answers to your questions about shopping, selling, and using Re-Market platform." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Help <span className="text-emerald-600">Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to your questions and get the help you need to make the most of Re-Market.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">
              Choose a category to find the help you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-3xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors duration-300">
                  <category.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-1">
                  {category.topics.slice(0, 2).map((topic, idx) => (
                    <p key={idx} className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                      • {topic}
                    </p>
                  ))}
                  {category.topics.length > 2 && (
                    <p className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                      • +{category.topics.length - 2} more topics
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Articles</h2>
            <p className="text-gray-600">
              Most frequently viewed help articles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Read article</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Live Chat
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}