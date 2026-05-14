import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiClock, FiUser, FiTag, FiArrowRight, FiTrendingUp, FiShield, FiShoppingBag, FiUsers } from 'react-icons/fi'

export default function Blog() {
  const featuredPost = {
    title: 'The Future of Online Marketplaces: Trends Shaping 2025',
    excerpt: 'Explore the emerging trends that are transforming how we buy and sell online, from AI-powered recommendations to blockchain verification systems.',
    author: 'Sarah Chen',
    date: 'December 20, 2024',
    readTime: '8 min read',
    category: 'Industry Insights',
    image: '/api/placeholder/600/400'
  }

  const blogPosts = [
    {
      title: 'Building Trust in Online Transactions: Our Verification System',
      excerpt: 'How Re-Market\'s blockchain-powered verification ensures authenticity and builds buyer confidence in every transaction.',
      author: 'Michael Rodriguez',
      date: 'December 18, 2024',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['Blockchain', 'Security', 'Trust']
    },
    {
      title: 'The Rise of Resale Culture: Why Second-Hand is the New New',
      excerpt: 'Understanding the growing trend of sustainable shopping and how resale platforms are becoming mainstream.',
      author: 'Emma Thompson',
      date: 'December 15, 2024',
      readTime: '5 min read',
      category: 'Market Trends',
      tags: ['Sustainability', 'Consumer Behavior', 'Resale']
    },
    {
      title: 'Seller Success Stories: From Side Hustle to Full-Time Business',
      excerpt: 'Real stories from Re-Market sellers who turned their passion into profitable businesses.',
      author: 'David Park',
      date: 'December 12, 2024',
      readTime: '7 min read',
      category: 'Success Stories',
      tags: ['Entrepreneurship', 'Success', 'Community']
    },
    {
      title: 'AI in E-commerce: How Machine Learning is Revolutionizing Shopping',
      excerpt: 'Exploring how artificial intelligence is enhancing the shopping experience from product discovery to customer service.',
      author: 'Lisa Wang',
      date: 'December 10, 2024',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['AI', 'E-commerce', 'Innovation']
    },
    {
      title: 'Sustainable Shopping: Making Eco-Friendly Choices Online',
      excerpt: 'Tips and insights for making environmentally conscious purchasing decisions in the digital marketplace.',
      author: 'James Green',
      date: 'December 8, 2024',
      readTime: '4 min read',
      category: 'Sustainability',
      tags: ['Environment', 'Ethics', 'Shopping']
    },
    {
      title: 'The Psychology of Online Shopping: What Drives Purchase Decisions',
      excerpt: 'Understanding consumer behavior and the factors that influence buying decisions in digital marketplaces.',
      author: 'Dr. Rachel Kim',
      date: 'December 5, 2024',
      readTime: '9 min read',
      category: 'Consumer Insights',
      tags: ['Psychology', 'Marketing', 'Behavior']
    }
  ]

  const categories = [
    { name: 'All Posts', count: 24, active: true },
    { name: 'Technology', count: 8, active: false },
    { name: 'Market Trends', count: 6, active: false },
    { name: 'Success Stories', count: 5, active: false },
    { name: 'Sustainability', count: 3, active: false },
    { name: 'Industry Insights', count: 2, active: false }
  ]

  const popularTags = [
    'E-commerce', 'Blockchain', 'AI', 'Sustainability', 'Resale', 'Technology',
    'Shopping', 'Marketplace', 'Trust', 'Innovation', 'Success', 'Entrepreneurship'
  ]

  return (
    <>
      <Helmet>
        <title>Blog | Re-Market</title>
        <meta name="description" content="Insights, trends, and stories from the world of online marketplaces. Stay updated with the latest in e-commerce innovation." />
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
              Our <span className="text-emerald-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Insights, trends, and stories from the evolving world of online marketplaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                {featuredPost.category}
              </span>
              <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {featuredPost.title}
            </h3>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-4xl">
              {featuredPost.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiUser size={16} />
                  <span className="text-sm">{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiClock size={16} />
                  <span className="text-sm">{featuredPost.date}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Read Article
                <FiArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  category.active
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FiUser size={14} />
                        {post.author}
                      </div>
                      <span className="text-gray-500 text-xs">{post.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-white text-emerald-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300 text-sm"
                    >
                      Read More
                      <FiArrowRight size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiTag size={20} className="text-emerald-600" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-emerald-100 transition-colors"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest insights and trends delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiTrendingUp size={20} className="text-emerald-600" />
                  Trending Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 hover:text-emerald-600 transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
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
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <FiUsers size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Contribute?</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for guest writers and industry experts to share their insights.
              Have a story to tell or expertise to share?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Become a Contributor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Pitch an Idea
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}