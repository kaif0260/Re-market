import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import axios from '../../api/axios'
import { FiEdit, FiSave, FiX, FiEye, FiCode, FiImage } from 'react-icons/fi'

export default function AdminContentManagement() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data } = await axios.get('/admin/content')
      setContent(data.content || {})
    } catch (err) {
      setContent({})
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (section, currentData) => {
    setEditing(section)
    setFormData({ ...currentData })
  }

  const handleSave = async () => {
    try {
      await axios.put(`/admin/content/${editing}`, formData)
      setContent({ ...content, [editing]: formData })
      setEditing(null)
      setFormData({})
    } catch (err) {
      // Error saving content
    }
  }

  const handleCancel = () => {
    setEditing(null)
    setFormData({})
  }

  const contentSections = [
    {
      key: 'hero',
      title: 'Hero Section',
      description: 'Main homepage hero content',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
        { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
        { name: 'ctaLink', label: 'CTA Button Link', type: 'text' },
        { name: 'backgroundImage', label: 'Background Image URL', type: 'url' }
      ]
    },
    {
      key: 'about',
      title: 'About Section',
      description: 'About us content on homepage',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'stats', label: 'Statistics (JSON)', type: 'textarea' },
        { name: 'image', label: 'Image URL', type: 'url' }
      ]
    },
    {
      key: 'features',
      title: 'Features Section',
      description: 'Key features and benefits',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'features', label: 'Features (JSON)', type: 'textarea' }
      ]
    },
    {
      key: 'footer',
      title: 'Footer Content',
      description: 'Footer links and information',
      fields: [
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'socialLinks', label: 'Social Links (JSON)', type: 'textarea' },
        { name: 'contactInfo', label: 'Contact Info (JSON)', type: 'textarea' }
      ]
    },
    {
      key: 'seo',
      title: 'SEO Settings',
      description: 'Meta tags and SEO content',
      fields: [
        { name: 'metaTitle', label: 'Meta Title', type: 'text' },
        { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
        { name: 'keywords', label: 'Keywords', type: 'text' },
        { name: 'ogImage', label: 'Open Graph Image', type: 'url' }
      ]
    }
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Content Management | Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage website content, SEO settings, and homepage sections</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchContent}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300 flex items-center gap-2"
          >
            <FiEye size={20} />
            Refresh Content
          </motion.button>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {contentSections.map((section) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                  {editing === section.key ? (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                      >
                        <FiSave size={14} />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-1"
                      >
                        <FiX size={14} />
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(section.key, content[section.key] || {})}
                      className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                    >
                      <FiEdit size={14} />
                      Edit
                    </motion.button>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{section.description}</p>
              </div>

              <div className="p-6">
                {editing === section.key ? (
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            rows={field.name.includes('JSON') ? 6 : 3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder={field.name.includes('JSON') ? '{"key": "value"}' : 'Enter content...'}
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {section.fields.map((field) => (
                      <div key={field.name} className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-700">{field.label}:</span>
                        <span className="text-sm text-gray-600 ml-4 flex-1 text-right">
                          {content[section.key]?.[field.name] ?
                            (field.name.includes('JSON') ?
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {content[section.key][field.name].substring(0, 50)}...
                              </code>
                              : content[section.key][field.name]
                            ) : (
                              <span className="text-gray-400 italic">Not set</span>
                            )
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiEye className="text-emerald-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-900">Content Preview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <FiCode className="text-blue-500 mx-auto mb-2" size={32} />
              <p className="text-sm font-medium text-gray-900">Hero Title</p>
              <p className="text-xs text-gray-600 mt-1">
                {content.hero?.title || 'Not configured'}
              </p>
            </div>
            <div className="text-center">
              <FiImage className="text-green-500 mx-auto mb-2" size={32} />
              <p className="text-sm font-medium text-gray-900">About Image</p>
              <p className="text-xs text-gray-600 mt-1">
                {content.about?.image ? 'Image set' : 'Not configured'}
              </p>
            </div>
            <div className="text-center">
              <FiEdit className="text-purple-500 mx-auto mb-2" size={32} />
              <p className="text-sm font-medium text-gray-900">SEO Title</p>
              <p className="text-xs text-gray-600 mt-1">
                {content.seo?.metaTitle || 'Not configured'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}