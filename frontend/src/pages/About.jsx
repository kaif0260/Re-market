import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiUsers, FiTrendingUp, FiShield, FiAward, FiTarget, FiHeart } from 'react-icons/fi'

export default function About() {
  const stats = [
    { icon: FiUsers, value: '10K+', label: 'Active Users' },
    { icon: FiTrendingUp, value: '50K+', label: 'Products Sold' },
    { icon: FiShield, value: '99.9%', label: 'Trust Score' },
    { icon: FiAward, value: '4.8★', label: 'User Rating' }
  ]

  const values = [
    {
      icon: FiShield,
      title: 'Trust & Security',
      description: 'Every transaction is protected with escrow service and verified seller authentication.'
    },
    {
      icon: FiTarget,
      title: 'Quality Assurance',
      description: 'All products undergo rigorous quality checks and come with detailed descriptions.'
    },
    {
      icon: FiHeart,
      title: 'Community First',
      description: 'Building a sustainable marketplace where buyers and sellers thrive together.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us | Re-Market</title>
        <meta name="description" content="Learn about Re-Market - Your trusted multi-vendor marketplace for verified products and resale." />
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
              About <span className="text-emerald-600">Re-Market</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people buy and sell products through our trusted,
              verified marketplace that puts quality and security first.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2024, Re-Market was born from a simple idea: create a marketplace where
                  trust comes first. We noticed that traditional e-commerce platforms lacked the
                  verification and security that buyers and sellers truly need.
                </p>
                <p>
                  Today, we're proud to be India's most trusted multi-vendor marketplace, connecting
                  verified sellers with quality-conscious buyers. Our platform combines the best of
                  new product shopping with verified resale opportunities.
                </p>
                <p>
                  Every seller on our platform is thoroughly vetted, every product is quality-checked,
                  and every transaction is protected by our escrow service. This commitment to
                  excellence has made us the go-to marketplace for discerning shoppers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">2024</div>
                  <div className="text-xl">Founded</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-200 rounded-2xl flex items-center justify-center">
                <FiShield size={32} className="text-emerald-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Re-Market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8">
              To create the most trusted and sustainable marketplace ecosystem where quality products
              meet verified buyers and sellers, fostering a community built on transparency,
              security, and mutual success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-white/20 rounded-full">✓ Verified Sellers</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✓ Quality Assurance</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✓ Secure Transactions</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✓ Community Focus</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}