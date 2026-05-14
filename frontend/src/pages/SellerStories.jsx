import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiUsers, FiStar, FiAward, FiTarget, FiDollarSign } from 'react-icons/fi'

export default function SellerStories() {
  const successStories = [
    {
      name: 'Sarah Johnson',
      location: 'New York, NY',
      avatar: 'SJ',
      story: 'Started with just 5 items from my closet. Now running a full-time business making $50K+ monthly.',
      stats: { sales: '$127K', items: '2,340', rating: '4.9' },
      category: 'Fashion & Accessories',
      journey: 'From closet cleanout to fashion empire in 18 months',
      testimonial: 'Re-Market gave me the platform to turn my passion for fashion into a sustainable business. The escrow system gave buyers confidence, and the seller tools helped me scale efficiently.'
    },
    {
      name: 'Mike Chen',
      location: 'San Francisco, CA',
      avatar: 'MC',
      story: 'Electronics reseller who built a 6-figure business by focusing on verified, high-quality products.',
      stats: { sales: '$89K', items: '450', rating: '4.8' },
      category: 'Electronics',
      journey: 'From weekend hobby to professional reseller',
      testimonial: 'The verification process sets Re-Market apart. Buyers trust the products, and I can focus on finding great deals rather than convincing people to buy.'
    },
    {
      name: 'Emma Rodriguez',
      location: 'Austin, TX',
      avatar: 'ER',
      story: 'Book lover turned entrepreneur, now selling rare and vintage books with a 98% satisfaction rate.',
      stats: { sales: '$45K', items: '1,200', rating: '4.9' },
      category: 'Books & Media',
      journey: 'Transforming a personal collection into a thriving business',
      testimonial: 'Re-Market\'s community of book lovers made it easy to find my niche. The platform\'s tools for managing inventory and tracking sales have been invaluable.'
    },
    {
      name: 'David Park',
      location: 'Seattle, WA',
      avatar: 'DP',
      story: 'Sports equipment specialist who expanded from local garage sales to nationwide shipping.',
      stats: { sales: '$67K', items: '890', rating: '4.7' },
      category: 'Sports & Outdoors',
      journey: 'From local sales to national reach',
      testimonial: 'The shipping tools and buyer protection made it possible to sell nationwide. I went from worrying about scams to focusing on growing my business.'
    },
    {
      name: 'Lisa Thompson',
      location: 'Chicago, IL',
      avatar: 'LT',
      story: 'Home goods reseller who built a brand around sustainable, upcycled furniture.',
      stats: { sales: '$93K', items: '320', rating: '4.9' },
      category: 'Home & Garden',
      journey: 'Creating a sustainable business from upcycled goods',
      testimonial: 'Re-Market helped me build a brand around sustainability. The platform\'s features for storytelling and building customer relationships have been game-changing.'
    },
    {
      name: 'Alex Kim',
      location: 'Los Angeles, CA',
      avatar: 'AK',
      story: 'Tech gadget reseller who mastered the art of product photography and descriptions.',
      stats: { sales: '$156K', items: '780', rating: '4.8' },
      category: 'Electronics',
      journey: 'From amateur photos to professional product listings',
      testimonial: 'The detailed analytics showed me exactly what buyers were looking for. Investing time in better photos and descriptions increased my conversion rate by 300%.'
    }
  ]

  const successMetrics = [
    { label: 'Average Monthly Revenue', value: '$25K+', description: 'Top sellers earn significantly more' },
    { label: 'Items Sold Monthly', value: '200+', description: 'Consistent sellers move inventory quickly' },
    { label: 'Customer Satisfaction', value: '4.8/5', description: 'Happy customers drive repeat business' },
    { label: 'Account Age for Success', value: '6-12 months', description: 'Most successful sellers start small and scale' }
  ]

  const tips = [
    {
      icon: FiTarget,
      title: 'Find Your Niche',
      description: 'Specialize in a category you know well. Deep knowledge leads to better listings and customer service.'
    },
    {
      icon: FiStar,
      title: 'Quality Photos Matter',
      description: 'Invest time in professional-quality photos. They increase sales conversion by up to 300%.'
    },
    {
      icon: FiUsers,
      title: 'Build Relationships',
      description: 'Respond quickly, be honest about condition, and follow up after sales to build customer loyalty.'
    },
    {
      icon: FiTrendingUp,
      title: 'Scale Gradually',
      description: 'Start small, learn the platform, then expand your inventory and marketing efforts.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Seller Success Stories | Re-Market</title>
        <meta name="description" content="Real success stories from Re-Market sellers who built thriving businesses on our platform. Learn from their journeys and get inspired." />
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
            <FiAward size={64} className="text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Seller <span className="text-emerald-600">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real stories from sellers who turned their passion into profitable businesses on Re-Market.
              Get inspired by their journeys and learn from their experiences.
            </p>
          </motion.div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success by the Numbers</h2>
            <p className="text-gray-600">
              What successful sellers achieve on Re-Market
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

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Seller Journeys</h2>
            <p className="text-gray-600">
              From side hustle to full-time business - meet our successful sellers
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {story.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-emerald-600 font-medium mb-2">{story.location}</p>
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
                      {story.category}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">{story.journey}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{story.stats.sales}</div>
                    <div className="text-sm text-gray-600">Total Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{story.stats.items}</div>
                    <div className="text-sm text-gray-600">Items Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{story.stats.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700">
                  "{story.testimonial}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tips for Your Success</h2>
            <p className="text-gray-600">
              Proven strategies from our most successful sellers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tip.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <FiTrendingUp size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of successful sellers on Re-Market. Start your journey today and
              turn your items into income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Start Selling Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Read Seller Handbook
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}