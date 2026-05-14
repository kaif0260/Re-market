import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiSettings, FiShield, FiEye } from 'react-icons/fi'

export default function Cookies() {
  const cookieTypes = [
    {
      icon: FiSettings,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      purpose: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      examples: ['Authentication cookies', 'Security cookies', 'Session management', 'CSRF protection'],
      duration: 'Session or persistent (varies)'
    },
    {
      icon: FiSettings,
      title: 'Functional Cookies',
      description: 'Enhance your experience on our platform',
      purpose: 'These cookies enable the website to provide enhanced functionality and personalization.',
      examples: ['Language preferences', 'Location settings', 'Shopping cart contents', 'User preferences'],
      duration: '1 year'
    },
    {
      icon: FiEye,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      purpose: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Page views', 'Click patterns', 'Time spent on pages', 'Error tracking'],
      duration: '2 years'
    },
    {
      icon: FiShield,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements',
      purpose: 'These cookies are used to make advertising messages more relevant to you and your interests.',
      examples: ['Retargeting ads', 'Social media pixels', 'Affiliate tracking', 'Campaign measurement'],
      duration: '90 days'
    }
  ]

  const cookieSettings = [
    {
      browser: 'Google Chrome',
      steps: [
        'Click the three dots in the top right corner',
        'Select "Settings"',
        'Click "Privacy and security"',
        'Select "Cookies and other site data"',
        'Choose your preferred cookie settings'
      ]
    },
    {
      browser: 'Mozilla Firefox',
      steps: [
        'Click the menu button (three lines)',
        'Select "Settings"',
        'Click "Privacy & Security" in the left panel',
        'Scroll to "Cookies and Site Data"',
        'Choose your preferred cookie settings'
      ]
    },
    {
      browser: 'Safari',
      steps: [
        'Click "Safari" in the menu bar',
        'Select "Preferences"',
        'Click "Privacy"',
        'Choose your preferred cookie settings'
      ]
    },
    {
      browser: 'Microsoft Edge',
      steps: [
        'Click the three dots in the top right corner',
        'Select "Settings"',
        'Click "Cookies and site permissions"',
        'Select "Cookies and site data"',
        'Choose your preferred cookie settings'
      ]
    }
  ]

  const thirdPartyCookies = [
    {
      provider: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      type: 'Analytics',
      privacyPolicy: 'https://policies.google.com/privacy'
    },
    {
      provider: 'Cloudinary',
      purpose: 'Image optimization and delivery',
      type: 'Functional',
      privacyPolicy: 'https://cloudinary.com/privacy'
    },
    {
      provider: 'Stripe',
      purpose: 'Payment processing',
      type: 'Essential',
      privacyPolicy: 'https://stripe.com/privacy'
    },
    {
      provider: 'Facebook Pixel',
      purpose: 'Marketing and advertising',
      type: 'Marketing',
      privacyPolicy: 'https://www.facebook.com/privacy/policy'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Cookie Policy | Re-Market</title>
        <meta name="description" content="Learn about how Re-Market uses cookies to improve your browsing experience and provide personalized services." />
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
            <FiSettings size={64} className="text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Cookie <span className="text-emerald-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We use cookies to enhance your experience on Re-Market. Learn more about how we use them and your choices.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What are Cookies?</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8"
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Cookies are small text files that are stored on your computer or mobile device when you visit our website.
              They help us provide you with a better browsing experience by remembering your preferences and understanding
              how you use our site.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How Cookies Work</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Stored locally on your device</li>
                  <li>• Sent back to our servers on each visit</li>
                  <li>• Help personalize your experience</li>
                  <li>• Enable essential website functions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cookie Benefits</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Faster website loading</li>
                  <li>• Remembered login status</li>
                  <li>• Personalized recommendations</li>
                  <li>• Improved user experience</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <p className="text-gray-600">
              We categorize cookies based on their purpose and functionality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                    <type.icon size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Purpose</h4>
                    <p className="text-gray-600 text-sm">{type.purpose}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Examples</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      {type.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600">
              We work with trusted third-party service providers
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Provider</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purpose</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Privacy Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {thirdPartyCookies.map((cookie, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cookie.provider}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cookie.purpose}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        {cookie.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href={cookie.privacyPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 underline"
                      >
                        View Policy
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-600">
              You have control over how cookies are used on our website
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Browser Settings</h3>
              <p className="text-gray-600 mb-6">
                Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
              </p>

              <div className="space-y-6">
                {cookieSettings.map((browser, index) => (
                  <div key={index} className="border-l-4 border-emerald-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{browser.browser}</h4>
                    <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                      {browser.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Our Cookie Controls</h3>
              <p className="text-gray-600 mb-6">
                You can manage your cookie preferences directly on our website:
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for website functionality</p>
                  </div>
                  <span className="text-sm text-gray-500">Always On</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-900">Functional Cookies</h4>
                    <p className="text-sm text-gray-600">Enhance your experience</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us improve our services</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Personalized advertisements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Save Preferences
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions about Cookies?</h2>
            <p className="text-gray-600 mb-8">
              If you have any questions about our cookie policy or need assistance managing your preferences, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Privacy Policy
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}