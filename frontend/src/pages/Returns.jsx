import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiPackage, FiRefreshCw, FiTruck, FiShield, FiClock, FiCheckCircle } from 'react-icons/fi'

export default function Returns() {
  const returnSteps = [
    {
      icon: FiPackage,
      title: 'Prepare Your Item',
      description: 'Ensure the item is in its original condition with all packaging, tags, and accessories.',
      details: ['Keep original packaging', 'Include all accessories', 'Remove personalizations if possible']
    },
    {
      icon: FiTruck,
      title: 'Ship the Item',
      description: 'Use the prepaid return label provided or package securely for shipping.',
      details: ['Use prepaid label when available', 'Insure valuable items', 'Track your shipment']
    },
    {
      icon: FiRefreshCw,
      title: 'Processing',
      description: 'Once received, our team will inspect and process your return within 3-5 business days.',
      details: ['Quality inspection', 'Refund processing', 'Return confirmation']
    },
    {
      icon: FiCheckCircle,
      title: 'Refund Issued',
      description: 'Refunds are processed to your original payment method within 5-7 business days.',
      details: ['Original payment method', 'Processing time varies', 'Email confirmation sent']
    }
  ]

  const returnPolicies = [
    {
      title: '30-Day Return Window',
      description: 'Most items can be returned within 30 days of delivery for a full refund.',
      eligible: ['Unworn clothing', 'Unused electronics', 'New condition items'],
      notEligible: ['Opened software', 'Personal care items', 'Custom orders']
    },
    {
      title: 'Resale Items',
      description: 'Pre-owned items follow our resale return policy with specific conditions.',
      eligible: ['As described condition', 'Authentic items', 'Within policy timeframe'],
      notEligible: ['Items not as described', 'Counterfeit products', 'Damaged in transit']
    },
    {
      title: 'Damaged or Defective Items',
      description: 'Items damaged during shipping or defective upon arrival qualify for immediate replacement.',
      eligible: ['Shipping damage', 'Manufacturing defects', 'Missing parts'],
      notEligible: ['Normal wear', 'User damage', 'Expired items']
    }
  ]

  const faqs = [
    {
      question: 'How long do I have to return an item?',
      answer: 'Most items can be returned within 30 days of delivery. Some categories may have different return windows.'
    },
    {
      question: 'Do I need to pay for return shipping?',
      answer: 'Return shipping is free for defective items or our error. For other returns, you may need to cover shipping costs unless you have a prepaid label.'
    },
    {
      question: 'What condition must the item be in for return?',
      answer: 'Items must be in their original condition, unworn, unwashed, and with all original tags and packaging intact.'
    },
    {
      question: 'How long does refund processing take?',
      answer: 'Refunds are typically processed within 5-7 business days after we receive and inspect your return.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, exchanges are available for the same item in a different size/color or for store credit.'
    },
    {
      question: 'What if I received the wrong item?',
      answer: 'If you received the wrong item due to our error, we will arrange for free return shipping and send the correct item immediately.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Returns & Exchanges | Re-Market</title>
        <meta name="description" content="Learn about our returns and exchanges policy. Easy returns within 30 days with free shipping on defective items." />
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
              Returns & <span className="text-emerald-600">Exchanges</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hassle-free returns within 30 days. We're committed to your satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Return Process</h2>
            <p className="text-gray-600">
              Follow these easy steps to return your items
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
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
                  {index < returnSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-emerald-200 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>• {detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Policies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Return Policies</h2>
            <p className="text-gray-600">
              Different policies apply to different types of items
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {returnPolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{policy.title}</h3>
                <p className="text-gray-600 mb-6">{policy.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✓ Eligible</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {policy.eligible.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-500 mb-2">✗ Not Eligible</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {policy.notEligible.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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
              Common questions about returns and exchanges
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
                className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <FiShield size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help with a Return?</h2>
            <p className="text-gray-600 mb-8">
              Our customer service team is here to assist you with any return-related questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Start Return
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}