import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using Re-Market, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials on Re-Market's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to reverse engineer any software contained on Re-Market's website
• Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: 'User Accounts',
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.`
    },
    {
      title: 'Products and Services',
      content: `Re-Market offers a platform for buying and selling products, including resale items. We strive to provide accurate product descriptions, but we do not warrant that product descriptions or other content on the site is accurate, complete, reliable, current, or error-free.`
    },
    {
      title: 'Pricing and Payment',
      content: `All prices are subject to change without notice. We reserve the right to refuse or cancel any order. Payment must be received prior to the acceptance of an order. We accept various payment methods as indicated on our website.`
    },
    {
      title: 'Shipping and Delivery',
      content: `We will arrange for shipment of the goods to you. You will be notified by email when your order ships. Risk of loss and title for such items pass to you upon delivery to the carrier.`
    },
    {
      title: 'Returns and Refunds',
      content: `Items may be returned within 30 days of purchase for a full refund, provided they are in their original condition. Custom orders and certain items are not eligible for return. Refunds will be processed within 5-7 business days after receipt of the returned item.`
    },
    {
      title: 'Seller Responsibilities',
      content: `Sellers on our platform agree to:
• Provide accurate product descriptions
• Ship items promptly after sale
• Handle customer inquiries professionally
• Maintain positive seller ratings
• Comply with all applicable laws and regulations`
    },
    {
      title: 'Prohibited Uses',
      content: `You may not use our products for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.`
    },
    {
      title: 'Disclaimer',
      content: `The materials on Re-Market's website are provided on an 'as is' basis. Re-Market makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
    },
    {
      title: 'Limitations',
      content: `In no event shall Re-Market or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Re-Market's website, even if Re-Market or a Re-Market authorized representative has been notified orally or in writing of the possibility of such damage.`
    },
    {
      title: 'Accuracy of Materials',
      content: `The materials appearing on Re-Market's website could include technical, typographical, or photographic errors. Re-Market does not warrant that any of the materials on its website are accurate, complete, or current. Re-Market may make changes to the materials contained on its website at any time without notice.`
    },
    {
      title: 'Links',
      content: `Re-Market has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Re-Market of the site. Use of any such linked website is at the user's own risk.`
    },
    {
      title: 'Modifications',
      content: `Re-Market may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.`
    },
    {
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.`
    }
  ]

  return (
    <>
      <Helmet>
        <title>Terms of Service | Re-Market</title>
        <meta name="description" content="Read our terms of service to understand your rights and responsibilities when using Re-Market." />
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
              Terms of <span className="text-emerald-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Please read these terms of service carefully before using Re-Market.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions about these Terms?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@remarket.com</p>
              <p><strong>Phone:</strong> +91 1800 123 4567</p>
              <p><strong>Address:</strong> 123 Tech Street, Bangalore, Karnataka 560001, India</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}