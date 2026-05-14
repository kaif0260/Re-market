import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:

• Name, email address, phone number, and shipping address
• Payment information (processed securely by third-party providers)
• Profile information and preferences
• Communications with us
• Photos and descriptions of products you sell`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices, updates, and support messages
• Respond to your comments, questions, and requests
• Communicate with you about products, services, and promotions
• Monitor and analyze trends and usage`
    },
    {
      title: 'Information Sharing',
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:

• With service providers who assist us in operating our platform
• To comply with legal obligations
• To protect our rights and prevent fraud
• In connection with a business transfer or acquisition`
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences. We use cookies to:

• Remember your login status
• Analyze site usage and improve our services
• Personalize content and recommendations
• Provide social media features`
    },
    {
      title: 'Third-Party Services',
      content: `Our platform integrates with third-party services for payments, shipping, and analytics. These services have their own privacy policies:

• Payment processing: Stripe, PayPal
• Shipping: Various carriers
• Analytics: Google Analytics
• Cloud storage: Cloudinary`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• Access the personal information we hold about you
• Correct inaccurate or incomplete information
• Delete your account and associated data
• Object to or restrict processing of your information
• Data portability
• Withdraw consent where applicable`
    },
    {
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services and comply with legal obligations. Account data is retained while your account is active and for a reasonable period afterward for backup and legal purposes.`
    },
    {
      title: 'International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.`
    },
    {
      title: 'Children\'s Privacy',
      content: `Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it immediately.`
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.`
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this privacy policy or our data practices, please contact us:

Email: privacy@remarket.com
Phone: +91 1800 123 4567
Address: 123 Tech Street, Bangalore, Karnataka 560001, India`
    }
  ]

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Re-Market</title>
        <meta name="description" content="Learn how Re-Market collects, uses, and protects your personal information." />
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
              Privacy <span className="text-emerald-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {index + 1}. {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Privacy Concerns?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions about your privacy or data rights, we're here to help.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
            >
              Contact Privacy Team
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}