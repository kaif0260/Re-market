import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiBook, FiUpload, FiTrendingUp, FiUsers, FiShield, FiDollarSign, FiMessageSquare, FiStar } from 'react-icons/fi'

export default function SellerHandbook() {
  const handbookSections = [
    {
      icon: FiUpload,
      title: 'Getting Started',
      description: 'Learn how to set up your seller account and list your first product',
      topics: [
        'Account registration and verification',
        'Store profile setup',
        'Product listing basics',
        'Pricing strategies'
      ]
    },
    {
      icon: FiTrendingUp,
      title: 'Growing Your Sales',
      description: 'Strategies to increase visibility and boost your sales performance',
      topics: [
        'SEO optimization for listings',
        'Photography best practices',
        'Pricing psychology',
        'Cross-selling techniques'
      ]
    },
    {
      icon: FiUsers,
      title: 'Customer Service',
      description: 'How to provide excellent service and handle customer inquiries',
      topics: [
        'Response time best practices',
        'Order fulfillment',
        'Returns and refunds',
        'Building customer loyalty'
      ]
    },
    {
      icon: FiShield,
      title: 'Trust & Safety',
      description: 'Maintaining trust through verified products and secure transactions',
      topics: [
        'Product verification process',
        'Fraud prevention',
        'Dispute resolution',
        'Account security'
      ]
    },
    {
      icon: FiDollarSign,
      title: 'Payments & Finances',
      description: 'Understanding fees, payouts, and financial management',
      topics: [
        'Commission structure',
        'Payment schedules',
        'Tax obligations',
        'Financial reporting'
      ]
    },
    {
      icon: FiTrendingUp,
      title: 'Analytics & Insights',
      description: 'Using data to optimize your selling performance',
      topics: [
        'Performance metrics',
        'Sales analytics',
        'Customer insights',
        'Market trends'
      ]
    }
  ]

  const quickTips = [
    {
      title: 'High-Quality Photos',
      tip: 'Use well-lit, clear photos from multiple angles. Show any wear or defects clearly.',
      icon: FiStar
    },
    {
      title: 'Detailed Descriptions',
      tip: 'Write comprehensive descriptions including brand, size, condition, and any flaws.',
      icon: FiMessageSquare
    },
    {
      title: 'Competitive Pricing',
      tip: 'Research similar items and price competitively while ensuring profitability.',
      icon: FiTrendingUp
    },
    {
      title: 'Fast Responses',
      tip: 'Respond to inquiries within 24 hours to build trust and close more sales.',
      icon: FiUsers
    }
  ]

  const successMetrics = [
    { label: 'Average Response Time', value: '< 4 hours', description: 'Quick responses lead to higher sales' },
    { label: 'Order Fulfillment', value: '98%', description: 'Reliable shipping builds trust' },
    { label: 'Customer Satisfaction', value: '4.8/5', description: 'Happy customers return and refer others' },
    { label: 'Account Health Score', value: '95+', description: 'Maintain high standards for better visibility' }
  ]

  return (
    <>
      <Helmet>
        <title>Seller Handbook | Re-Market</title>
        <meta name="description" content="Complete guide for sellers on Re-Market. Learn how to list products, grow sales, and provide excellent customer service." />
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
            <FiBook size={64} className="text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Seller <span className="text-emerald-600">Handbook</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to successful selling on Re-Market.
              From listing products to scaling your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Handbook Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Seller Guide</h2>
            <p className="text-gray-600">
              Everything you need to know to succeed as a seller
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {handbookSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <section.icon size={32} className="text-emerald-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-600 mb-6">{section.description}</p>

                <ul className="space-y-2">
                  {section.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {topic}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300 text-sm"
                >
                  Read Chapter
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Tips for Success</h2>
            <p className="text-gray-600">
              Essential tips to improve your selling performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tip.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Metrics</h2>
            <p className="text-gray-600">
              Key performance indicators for top sellers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 text-center"
              >
                <div className="text-3xl font-bold text-emerald-600 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-gray-600">
              Tools and resources to help you succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Academy</h3>
              <p className="text-gray-600 mb-6">Free courses and tutorials to master selling on Re-Market.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Start Learning
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Community</h3>
              <p className="text-gray-600 mb-6">Connect with other sellers, share tips, and get support.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Join Community
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Support</h3>
              <p className="text-gray-600 mb-6">Get help from our dedicated seller support team.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12"
          >
            <FiTrendingUp size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Selling?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of successful sellers on Re-Market. Use this handbook as your guide
              to building a thriving business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Become a Seller
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Download Handbook PDF
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}