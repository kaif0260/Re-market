import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import StatCard from '../../components/dashboard/StatCard'
import Icons from '../../components/icons/Icons'

export default function SellerDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/seller/stats')
        setStats(data.stats)
      } catch (err) {
        setStats(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 py-20"> 
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 animate-pulse shadow-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const statsData = [
    { 
      label: 'Total Products', 
      value: stats?.totalProducts ?? 0, 
      to: '/seller/products',
      Icon: Icons.FiBox,
      bgColor: 'bg-blue-500'
    },
    { 
      label: 'Approved Products', 
      value: stats?.approvedProducts ?? 0, 
      to: '/seller/products?status=approved',
      Icon: Icons.FiCheckCircle,
      bgColor: 'bg-emerald-500'
    },
    { 
      label: 'Pending Approval', 
      value: stats?.pendingProducts ?? 0, 
      to: '/seller/products?status=pending',
      Icon: Icons.FiClock,
      bgColor: 'bg-orange-500'
    },
    { 
      label: 'Wallet Balance', 
      value: `₹${(stats?.walletBalance ?? 0).toLocaleString()}`,
      to: '/seller/wallet',
      Icon: Icons.FiCreditCard,
      bgColor: 'bg-purple-500'
    },
  ]

  const navLinks = [
    { label: 'Add Product', to: '/seller/products/new', Icon: Icons.FiPlus },
    { label: 'Manage Products', to: '/seller/products', Icon: Icons.FiPackage },
    { label: 'Orders', to: '/seller/orders', Icon: Icons.FiShoppingCart },
    { label: 'Analytics', to: '/seller/analytics', Icon: Icons.FiActivity },
    { label: 'Wallet', to: '/seller/wallet', Icon: Icons.FiCreditCard },
    { label: 'Profile Settings', to: '/profile?tab=seller', Icon: Icons.FiSettings },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-100 mb-16 text-center">
          <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-emerald-100">
            <Icons.FiZap className="w-14 h-14 text-white drop-shadow-2xl stroke-[3px]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Seller Dashboard
          </h1>
          <p className="text-xl text-gray-700 font-semibold max-w-2xl mx-auto">
            Grow your business with powerful sales tools and insights
          </p>
        </div>

        {/* Quick Metrics */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Your Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((card) => (
              <StatCard
                key={card.label}
                {...card}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="group bg-white shadow-lg rounded-2xl p-10 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-gray-100 hover:border-emerald-200 flex flex-col items-center gap-6 text-center h-[200px] hover:bg-emerald-50"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border-4 border-white hover:shadow-2xl">
                  <link.Icon className="w-12 h-12 text-white drop-shadow-2xl stroke-[3px]" />
                </div>
                <span className="font-bold text-xl text-gray-900 group-hover:text-emerald-600 transition-all text-center leading-tight">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

