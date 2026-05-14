import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiHeart,
  FiShield,
  FiTruck,
  FiHeadphones
} from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    shopping: [
      { name: 'Products', href: '/products' },
      { name: 'Resale Marketplace', href: '/resale' },
      { name: 'Deals & Offers', href: '/deals' },
      { name: 'Gift Cards', href: '/gift-cards' }
    ],
    selling: [
      { name: 'Sell on Re-Market', href: '/seller/register' },
      { name: 'Seller Dashboard', href: '/seller/dashboard' },
      { name: 'Seller Handbook', href: '/seller/handbook' },
      { name: 'Success Stories', href: '/seller/stories' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Track Order', href: '/orders' },
      { name: 'Returns', href: '/returns' }
    ]
  }

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://www.instagram.com/kaif_multani_0260/', label: 'Instagram' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/kaif-multani-0624a8384/', label: 'LinkedIn' }
  ]

  const features = [
    { icon: FiShield, text: 'Secure Payments' },
    { icon: FiTruck, text: 'Fast Delivery' },
    { icon: FiHeadphones, text: '24/7 Support' },
    { icon: FiHeart, text: 'Verified Sellers' }
  ]

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">R</span>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Re-Market
                  </span>
                </Link>

                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                  Your trusted multi-vendor marketplace. Buy new products from verified sellers or resell what you've purchased with our verified resale system and escrow protection.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <feature.icon size={16} className="text-emerald-400" />
                      {feature.text}
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-emerald-600/20 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-4">Shopping</h4>
              <ul className="space-y-3">
                {footerLinks.shopping.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-4">Selling</h4>
              <ul className="space-y-3">
                {footerLinks.selling.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiMail size={16} className="text-emerald-400" />
                  support@remarket.com
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiPhone size={16} className="text-emerald-400" />
                  +91 864-000-0260
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiMapPin size={16} className="text-emerald-400" />
                  India
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-sm text-gray-400"
              >
                © {currentYear} Re-Market. All rights reserved. Made with{' '}
                <FiHeart className="inline text-emerald-500" size={14} /> for better shopping.
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-6 text-sm text-gray-400"
              >
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/privacy" className="hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/terms" className="hover:text-emerald-400 transition-colors">
                    Terms of Service
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/cookies" className="hover:text-emerald-400 transition-colors">
                    Cookie Policy
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
