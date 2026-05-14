import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiUsers, FiTrendingUp, FiHeart, FiAward, FiMapPin, FiClock, FiDollarSign, FiChevronRight } from 'react-icons/fi'

export default function Careers() {
  const values = [
    {
      icon: FiUsers,
      title: 'Collaborative Culture',
      description: 'We believe in the power of teamwork and diverse perspectives to drive innovation.'
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Mindset',
      description: 'Continuous learning and professional development are at the heart of our culture.'
    },
    {
      icon: FiHeart,
      title: 'Customer First',
      description: 'Everything we do is centered around creating exceptional experiences for our users.'
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code to customer service.'
    }
  ]

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Competitive Salary',
      description: 'Market-leading compensation with performance bonuses'
    },
    {
      icon: FiClock,
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible scheduling options'
    },
    {
      icon: FiMapPin,
      title: 'Remote Work',
      description: 'Hybrid work model with remote work opportunities'
    },
    {
      icon: FiTrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths and mentorship programs'
    }
  ]

  const openPositions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Build next-generation user interfaces for our marketplace platform using React and modern web technologies.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Drive product strategy and roadmap for our resale marketplace and seller tools.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Design and maintain scalable infrastructure for our growing platform.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Ensure seller and buyer satisfaction through proactive support and relationship management.'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Create beautiful, intuitive designs that enhance user experience across our platform.'
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Analyze user behavior and market trends to drive business insights and product improvements.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Team Members' },
    { number: '15+', label: 'Countries' },
    { number: '99%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support' }
  ]

  return (
    <>
      <Helmet>
        <title>Careers | Re-Market</title>
        <meta name="description" content="Join our team at Re-Market. We're looking for passionate individuals to help build the future of online marketplaces." />
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
              Join Our <span className="text-emerald-600">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Be part of a mission to revolutionize online marketplaces. We're building the future of e-commerce,
              one innovative solution at a time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
            >
              View Open Positions
            </motion.button>
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
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                  <value.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Re-Market?</h2>
            <p className="text-gray-600">
              We offer more than just a job – we offer a career with purpose
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600">
              Join our growing team and help shape the future of e-commerce
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={14} />
                        {position.location}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {position.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{position.description}</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
                >
                  Apply Now
                  <FiChevronRight size={18} />
                </motion.button>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-gray-600 mb-8">
              Don't see a position that matches your skills? We're always looking for talented individuals.
              Send us your resume and let's start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Apply for Any Position
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Learn More About Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}