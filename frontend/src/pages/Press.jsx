import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiExternalLink, FiCalendar, FiUser, FiTrendingUp, FiAward, FiUsers } from 'react-icons/fi'

export default function Press() {
  const pressReleases = [
    {
      title: 'Re-Market Launches Revolutionary Verified Resale Platform',
      date: 'December 15, 2024',
      excerpt: 'Introducing blockchain-powered verification system ensuring authenticity of all resale items with escrow protection.',
      category: 'Product Launch',
      readTime: '3 min read',
      featured: true
    },
    {
      title: 'Re-Market Secures $10M Series A Funding',
      date: 'November 28, 2024',
      excerpt: 'Leading venture capital firms invest in our mission to revolutionize online marketplaces with trust and transparency.',
      category: 'Funding',
      readTime: '4 min read',
      featured: false
    },
    {
      title: 'Partnership with Major Retail Brands Announced',
      date: 'November 10, 2024',
      excerpt: 'Strategic alliances formed with top consumer brands to enhance product authenticity verification.',
      category: 'Partnership',
      readTime: '2 min read',
      featured: false
    },
    {
      title: 'Re-Market Reaches 1 Million Active Users Milestone',
      date: 'October 22, 2024',
      excerpt: 'Platform celebrates rapid growth with over 1 million verified users and 500,000 successful transactions.',
      category: 'Milestone',
      readTime: '3 min read',
      featured: false
    },
    {
      title: 'New AI-Powered Fraud Detection System Deployed',
      date: 'October 5, 2024',
      excerpt: 'Advanced machine learning algorithms now protect all transactions with 99.9% accuracy rate.',
      category: 'Technology',
      readTime: '5 min read',
      featured: false
    },
    {
      title: 'Re-Market Expands to International Markets',
      date: 'September 18, 2024',
      excerpt: 'Platform now available in 15 countries with localized payment systems and customer support.',
      category: 'Expansion',
      readTime: '4 min read',
      featured: false
    }
  ]

  const mediaCoverage = [
    {
      publication: 'TechCrunch',
      title: 'How Re-Market is Solving Trust Issues in Online Resale',
      date: 'December 20, 2024',
      link: '#',
      type: 'Article'
    },
    {
      publication: 'Forbes',
      title: 'The Future of E-commerce: Verified Resale Platforms',
      date: 'December 18, 2024',
      link: '#',
      type: 'Feature'
    },
    {
      publication: 'The Economic Times',
      title: 'Indian Startup Re-Market Raises $10M in Series A',
      date: 'November 30, 2024',
      link: '#',
      type: 'News'
    },
    {
      publication: 'Business Today',
      title: 'Re-Market: Building Trust in Online Marketplaces',
      date: 'November 25, 2024',
      link: '#',
      type: 'Interview'
    },
    {
      publication: 'YourStory',
      title: 'From Idea to IPO: The Re-Market Journey',
      date: 'November 15, 2024',
      link: '#',
      type: 'Profile'
    },
    {
      publication: 'Inc. India',
      title: 'How Re-Market is Disrupting the Resale Market',
      date: 'October 30, 2024',
      link: '#',
      type: 'Analysis'
    }
  ]

  const stats = [
    { icon: FiUsers, number: '1M+', label: 'Active Users' },
    { icon: FiTrendingUp, number: '500K+', label: 'Transactions' },
    { icon: FiAward, number: '15', label: 'Countries' },
    { icon: FiCalendar, number: '2+', label: 'Years Operating' }
  ]

  const achievements = [
    'Forbes Asia 100 To Watch 2024',
    'TechCrunch Disrupt Startup Battlefield Finalist',
    'Google for Startups Accelerator Graduate',
    'Microsoft for Startups Program Member',
    'Best E-commerce Innovation 2024 - NASSCOM',
    'Red Herring Asia Top 100 Winner'
  ]

  return (
    <>
      <Helmet>
        <title>Press | Re-Market</title>
        <meta name="description" content="Latest news, press releases, and media coverage about Re-Market's journey in revolutionizing online marketplaces." />
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
              Press <span className="text-emerald-600">Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, announcements, and milestones from Re-Market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-emerald-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Press Release */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-gray-600">
              Our most recent announcements and updates
            </p>
          </motion.div>

          {pressReleases.filter(release => release.featured).map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {release.category}
                </span>
                <span className="text-gray-500 text-sm">{release.readTime}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{release.title}</h3>

              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <FiCalendar size={16} />
                  {release.date}
                </div>
                <div className="flex items-center gap-2">
                  <FiUser size={16} />
                  Re-Market Team
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{release.excerpt}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Read Full Release
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Releases</h2>
            <p className="text-gray-600">
              Official announcements and company updates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.filter(release => !release.featured).map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    {release.category}
                  </span>
                  <span className="text-gray-500 text-xs">{release.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
                  {release.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{release.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{release.date}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <FiExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Coverage</h2>
            <p className="text-gray-600">
              Featured in leading publications worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaCoverage.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-emerald-600">{coverage.publication}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {coverage.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                  {coverage.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{coverage.date}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <FiExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-gray-600">
              Recognition from industry leaders and publications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <FiAward className="text-emerald-600" size={24} />
                  <span className="font-medium text-gray-900">{achievement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Kit & Resources</h2>
            <p className="text-gray-600 mb-8">
              Download our press kit with logos, photos, and company information for media coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Download Press Kit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Contact Press Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}