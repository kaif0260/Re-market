import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { FiUsers, FiUserCheck, FiDollarSign, FiTrendingUp, FiStar, FiActivity } from 'react-icons/fi'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get('/admin/analytics')
        setAnalytics(data.analytics)
      } catch (err) {
        setAnalytics(null)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 animate-pulse shadow-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const a = analytics || {}

  const metricCards = [
    {
      label: 'Total Users',
      value: a.totalUsers ?? 0,
      icon: FiUsers,
      gradient: 'from-blue-50 to-indigo-50',
      iconGradient: 'from-blue-500 to-indigo-600',
      color: 'text-blue-600'
    },
    {
      label: 'Total Sellers',
      value: a.totalSellers ?? 0,
      icon: FiUserCheck,
      gradient: 'from-emerald-50 to-teal-50',
      iconGradient: 'from-emerald-500 to-teal-600',
      color: 'text-emerald-600'
    },
    {
      label: 'Monthly Revenue',
      value: `₹${(a.monthlyRevenue ?? 0).toLocaleString()}`,
      icon: FiDollarSign,
      gradient: 'from-green-50 to-emerald-50',
      iconGradient: 'from-green-500 to-emerald-600',
      color: 'text-green-600'
    },
    {
      label: 'Resale Revenue',
      value: `₹${(a.resaleRevenue ?? 0).toLocaleString()}`,
      icon: FiTrendingUp,
      gradient: 'from-purple-50 to-pink-50',
      iconGradient: 'from-purple-500 to-pink-600',
      color: 'text-purple-600'
    }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 group">
              ← <span className="group-hover:underline">Dashboard</span>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-indigo-800 mt-2">Real-time insights into your marketplace performance</p>
          </div>
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <FiActivity className="text-white" size={40} />
                </div>

        </div>

        {/* Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metricCards.map((card) => (
              <div 
                key={card.label}
                className={`group bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 hover:border-indigo-200`}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${card.iconGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                  <card.icon className="text-white" size={32} />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-3 text-center">{card.label}</p>
                <p className={`text-4xl font-bold ${card.color} text-center drop-shadow-lg`}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Products */}
        {a.topProducts?.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FiStar className="text-amber-500" />
              Top Performing Products
            </h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {a.topProducts.map((p, i) => (
                  <div key={p._id} className="p-8 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-emerald-700">{p.name}</p>
                          <p className="text-sm text-gray-500">{p.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{p.sales}</p>
                        <p className="text-sm text-emerald-600 font-medium">sold</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}

