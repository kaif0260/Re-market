import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function StatCard({ label, value, to, Icon, bgColor = 'bg-emerald-500', className = '' }) {
  const colorMap = {
    'bg-emerald-500': 'from-emerald-50 to-emerald-100',
    'bg-blue-500': 'from-blue-50 to-blue-100',
    'bg-purple-500': 'from-purple-50 to-purple-100',
    'bg-orange-500': 'from-orange-50 to-orange-100',
    default: 'from-slate-50 to-gray-100'
  }

  const hoverBg = bgColor.replace('500', '400/90')

  return (
    <Link
      to={to}
      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-100 hover:border-emerald-200 hover:scale-[1.02] ${className}`}
    >
      {/* Icon Container */}
      <motion.div 
        className={`w-20 h-20 ${bgColor} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-white/50`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        <Icon className="w-12 h-12 text-white drop-shadow-2xl stroke-current stroke-[3px]" />
      </motion.div>
      
      {/* Label */}
      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 text-center group-hover:text-gray-800 transition-colors">
        {label}
      </p>
      
      {/* Value */}
      <motion.p 
        className="text-4xl lg:text-5xl font-black text-gray-900 text-center leading-tight"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.p>
    </Link>
  )
}

