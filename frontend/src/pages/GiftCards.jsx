import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiGift, FiCreditCard, FiMail, FiDownload, FiStar, FiShield } from 'react-icons/fi'

export default function GiftCards() {
  const giftCardOptions = [
    {
      amount: 500,
      popular: false,
      features: ['Instant delivery', 'No expiration', 'Universal use']
    },
    {
      amount: 1000,
      popular: true,
      features: ['Instant delivery', 'No expiration', 'Universal use', 'Bonus ₹100']
    },
    {
      amount: 2000,
      popular: false,
      features: ['Instant delivery', 'No expiration', 'Universal use', 'Bonus ₹250']
    },
    {
      amount: 5000,
      popular: false,
      features: ['Instant delivery', 'No expiration', 'Universal use', 'Bonus ₹750']
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Choose Amount',
      description: 'Select the gift card amount that suits your needs',
      icon: FiCreditCard
    },
    {
      step: 2,
      title: 'Make Payment',
      description: 'Complete your purchase securely with multiple payment options',
      icon: FiShield
    },
    {
      step: 3,
      title: 'Receive Instantly',
      description: 'Get your digital gift card code immediately via email',
      icon: FiMail
    },
    {
      step: 4,
      title: 'Share & Enjoy',
      description: 'Send to friends or use yourself on any purchase',
      icon: FiGift
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Perfect gift for my sister\'s birthday! She loved shopping on Re-Market.',
      avatar: 'PS'
    },
    {
      name: 'Rahul Kumar',
      rating: 5,
      comment: 'Great way to try out the platform. Instant delivery and easy to use.',
      avatar: 'RK'
    },
    {
      name: 'Anjali Patel',
      rating: 5,
      comment: 'Bought gift cards for the whole family. Excellent bonus amounts!',
      avatar: 'AP'
    }
  ]

  const faqs = [
    {
      question: 'How do I redeem a gift card?',
      answer: 'During checkout, enter your gift card code in the payment section. The amount will be automatically applied to your order.'
    },
    {
      question: 'Do gift cards expire?',
      answer: 'No, our gift cards never expire. You can use them whenever you\'re ready to make a purchase.'
    },
    {
      question: 'Can I use multiple gift cards on one order?',
      answer: 'Yes, you can combine multiple gift cards with other payment methods for a single purchase.'
    },
    {
      question: 'What if I lose my gift card code?',
      answer: 'Contact our support team immediately. We can help recover your gift card if you provide the original purchase details.'
    },
    {
      question: 'Are gift cards refundable?',
      answer: 'Unused gift cards can be refunded within 30 days of purchase. Partial refunds are not available.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Gift Cards | Re-Market</title>
        <meta name="description" content="Give the gift of choice with Re-Market gift cards. Perfect for any occasion with instant delivery and bonus amounts." />
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
            <FiGift size={64} className="text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Gift <span className="text-emerald-600">Cards</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Give the perfect gift that keeps on giving. Re-Market gift cards work on millions of verified products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Card Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Gift Card</h2>
            <p className="text-gray-600">
              Select the perfect amount and enjoy bonus credits on select options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {giftCardOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  option.popular ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">₹{option.amount.toLocaleString()}</div>
                  {option.amount > 1000 && (
                    <div className="text-lg text-green-600 font-semibold">
                      + ₹{(option.amount === 2000 ? 250 : option.amount === 5000 ? 750 : 100).toLocaleString()} Bonus
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
                >
                  Buy Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">
              Get your gift card in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon size={32} className="text-emerald-600" />
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-emerald-200 transform translate-x-4"></div>
                  )}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">
              Real reviews from gift card recipients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {testimonial.avatar}
                </div>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about gift cards
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
            <FiDownload size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Gift?</h2>
            <p className="text-gray-600 mb-8">
              Purchase your Re-Market gift card now and give the gift of endless possibilities.
              Instant delivery to email or print at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Buy Gift Card
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Corporate Gifting
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}