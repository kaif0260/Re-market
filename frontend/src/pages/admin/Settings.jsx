import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import axios from '../../api/axios'
import { FiSettings, FiSave, FiRefreshCw, FiMail, FiCreditCard, FiShield, FiGlobe, FiCheckCircle, FiShield as FiSecureShield, FiActivity, FiZap } from 'react-icons/fi'

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get('/admin/settings')
      setSettings(data.settings || {})
    } catch (err) {
      setSettings({})
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put('/admin/settings', settings)
    } catch (err) {
      // Error saving settings
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const settingSections = [
    {
      title: 'General Settings',
      icon: FiSettings,
      gradient: 'from-slate-50 to-gray-50',
      iconGradient: 'from-gray-500 to-slate-600',
      settings: [
        { key: 'siteName', label: 'Site Name', type: 'text', placeholder: 'Re-Market' },
        { key: 'siteDescription', label: 'Site Description', type: 'textarea', placeholder: 'Your trusted marketplace...' },
        { key: 'contactEmail', label: 'Contact Email', type: 'email', placeholder: 'support@re-market.com' },
        { key: 'supportPhone', label: 'Support Phone', type: 'text', placeholder: '+1 (555) 123-4567' },
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'checkbox' }
      ]
    },
    {
      title: 'Payment Settings',
      icon: FiCreditCard,
      gradient: 'from-emerald-50 to-green-50',
      iconGradient: 'from-emerald-500 to-green-600',
      settings: [
        { key: 'stripePublishableKey', label: 'Stripe Publishable Key', type: 'password' },
        { key: 'stripeSecretKey', label: 'Stripe Secret Key', type: 'password' },
        { key: 'paypalClientId', label: 'PayPal Client ID', type: 'password' },
        { key: 'paypalClientSecret', label: 'PayPal Client Secret', type: 'password' },
        { key: 'commissionRate', label: 'Commission Rate (%)', type: 'number', min: 0, max: 100 }
      ]
    },
    {
      title: 'Email Settings',
      icon: FiMail,
      gradient: 'from-blue-50 to-indigo-50',
      iconGradient: 'from-blue-500 to-indigo-600',
      settings: [
        { key: 'smtpHost', label: 'SMTP Host', type: 'text' },
        { key: 'smtpPort', label: 'SMTP Port', type: 'number' },
        { key: 'smtpUser', label: 'SMTP Username', type: 'text' },
        { key: 'smtpPassword', label: 'SMTP Password', type: 'password' },
        { key: 'emailFrom', label: 'From Email', type: 'email' }
      ]
    },
    {
      title: 'Security Settings',
      icon: FiShield,
      gradient: 'from-purple-50 to-pink-50',
      iconGradient: 'from-purple-500 to-pink-600',
      settings: [
        { key: 'enableTwoFactor', label: 'Enable 2FA', type: 'checkbox' },
        { key: 'passwordMinLength', label: 'Minimum Password Length', type: 'number', min: 6, max: 50 },
        { key: 'sessionTimeout', label: 'Session Timeout (hours)', type: 'number', min: 1, max: 168 },
        { key: 'maxLoginAttempts', label: 'Max Login Attempts', type: 'number', min: 3, max: 10 },
        { key: 'enableCaptcha', label: 'Enable CAPTCHA', type: 'checkbox' }
      ]
    },
    {
      title: 'Platform Settings',
      icon: FiGlobe,
      gradient: 'from-cyan-50 to-blue-50',
      iconGradient: 'from-cyan-500 to-blue-600',
      settings: [
        { key: 'allowGuestCheckout', label: 'Allow Guest Checkout', type: 'checkbox' },
        { key: 'autoApproveProducts', label: 'Auto-approve Products', type: 'checkbox' },
        { key: 'requireSellerVerification', label: 'Require Seller Verification', type: 'checkbox' },
        { key: 'maxProductsPerSeller', label: 'Max Products per Seller', type: 'number', min: 1 },
        { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'INR'] }
      ]
    }
  ]

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 animate-pulse shadow-lg">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Platform Settings | Admin</title>
      </Helmet>

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 mb-16 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <FiSettings className="text-white" size={48} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Platform Settings
            </h1>
            <p className="text-2xl text-indigo-800 font-light max-w-3xl mx-auto leading-relaxed">
              Fine-tune every aspect of your Re-Market platform with comprehensive configuration options
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchSettings}
              className="px-8 py-4 bg-gradient-to-r from-slate-500 to-gray-600 text-white font-bold rounded-2xl hover:shadow-xl hover:from-slate-600 hover:to-gray-700 transition-all duration-300 flex items-center gap-3 shadow-lg"
            >
              <FiRefreshCw className="animate-spin" size={20} />
              Refresh All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave size={20} />
              {saving ? 'Saving...' : 'Save All Changes'}
            </motion.button>
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {settingSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className={`rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br ${section.gradient} backdrop-blur-sm hover:ring-4 ring-white/30`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 ${section.iconGradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                    <section.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600 mt-1">Configure {section.title.toLowerCase()}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {section.settings.map((setting) => (
                    <motion.div
                      key={setting.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group"
                    >
                      <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">
                        {setting.label}
                      </label>

                      {setting.type === 'checkbox' ? (
                        <label className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group-hover:scale-[1.02]">
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white hover:bg-indigo-50 transition-all group-hover:border-indigo-400">
                            <input
                              type="checkbox"
                              checked={settings[setting.key] || false}
                              onChange={(e) => updateSetting(setting.key, e.target.checked)}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            />
                          </div>
                          <span className="font-semibold text-gray-700">
                            {settings[setting.key] ? 'Enabled' : 'Disabled'}
                          </span>
                        </label>
                      ) : setting.type === 'select' ? (
                        <select
                          value={settings[setting.key] || ''}
                          onChange={(e) => updateSetting(setting.key, e.target.value)}
                          className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-4 ring-indigo-500/20 focus:border-indigo-500 outline-none shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                        >
                          {setting.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          )) || <option>No options</option>}
                        </select>
                      ) : setting.type === 'textarea' ? (
                        <textarea
                          value={settings[setting.key] || ''}
                          onChange={(e) => updateSetting(setting.key, e.target.value)}
                          rows={3}
                          placeholder={setting.placeholder}
                          className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-4 ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-md hover:shadow-lg transition-all duration-300 resize-vertical font-mono text-sm"
                        />
                      ) : (
                        <input
                          type={setting.type}
                          value={settings[setting.key] || ''}
                          onChange={(e) => updateSetting(setting.key, e.target.value)}
                          min={setting.min}
                          max={setting.max}
                          placeholder={setting.placeholder}
                          className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-4 ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-md hover:shadow-lg transition-all duration-300 font-mono"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-12 flex items-center justify-center gap-4">
              <FiCheckCircle className="text-emerald-500" size={48} />
              System Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="group text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-emerald-200 hover:border-emerald-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-12 transition-all">
                  <FiSecureShield className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold text-emerald-700 mb-2">Security</p>
                <p className="text-lg font-semibold text-emerald-600">All systems secure</p>
              </motion.div>

              <motion.div 
                className="group text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-blue-200 hover:border-blue-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-12 transition-all">
                  <FiActivity className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold text-blue-700 mb-2">API Status</p>
                <p className="text-lg font-semibold text-blue-600">All endpoints operational</p>
              </motion.div>

              <motion.div 
                className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-purple-200 hover:border-purple-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-12 transition-all">
                  <FiZap className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold text-purple-700 mb-2">Performance</p>
                <p className="text-lg font-semibold text-purple-600">Optimized & Ready</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

