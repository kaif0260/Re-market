import React from 'react';
import {
  FiActivity,
  FiPackage,
  FiUserPlus,
  FiRotateCcw,
  FiAlertTriangle,
  FiUsers,
  FiBox,
  FiShoppingCart,
  FiStar,
  FiSettings,
  FiTag,
  FiSave,
  FiRefreshCw,
  FiMail,
  FiCreditCard,
  FiShield,
  FiGlobe,
  FiCheckCircle,
  FiZap,
  FiPlus,
  FiClock,
  FiMessageCircle,
  FiX,
  FiSend
} from 'react-icons/fi';

const Icons = {
  FiActivity: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-indigo-600', ...props }) => (
    <FiActivity size={size} className={className} {...props} />
  ),
  FiPackage: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-blue-600', ...props }) => (
    <FiPackage size={size} className={className} {...props} />
  ),
  FiUserPlus: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiUserPlus size={size} className={className} {...props} />
  ),
  FiRotateCcw: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-cyan-600', ...props }) => (
    <FiRotateCcw size={size} className={className} {...props} />
  ),
  FiAlertTriangle: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-orange-600', ...props }) => (
    <FiAlertTriangle size={size} className={className} {...props} />
  ),
  FiUsers: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-purple-600', ...props }) => (
    <FiUsers size={size} className={className} {...props} />
  ),
  FiBox: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-indigo-600', ...props }) => (
    <FiBox size={size} className={className} {...props} />
  ),
  FiShoppingCart: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiShoppingCart size={size} className={className} {...props} />
  ),
  FiStar: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-amber-600', ...props }) => (
    <FiStar size={size} className={className} {...props} />
  ),
  FiSettings: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-slate-600', ...props }) => (
    <FiSettings size={size} className={className} {...props} />
  ),
  FiTicket: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-green-600', ...props }) => (
    <FiTag size={size} className={className} {...props} />
  ),
  FiSave: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-blue-600', ...props }) => (
    <FiSave size={size} className={className} {...props} />
  ),
  FiRefreshCw: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-orange-600', ...props }) => (
    <FiRefreshCw size={size} className={className} {...props} />
  ),
  FiMail: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-slate-600', ...props }) => (
    <FiMail size={size} className={className} {...props} />
  ),
  FiCreditCard: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-purple-600', ...props }) => (
    <FiCreditCard size={size} className={className} {...props} />
  ),
  FiShield: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiShield size={size} className={className} {...props} />
  ),
  FiGlobe: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-blue-600', ...props }) => (
    <FiGlobe size={size} className={className} {...props} />
  ),
  FiCheckCircle: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiCheckCircle size={size} className={className} {...props} />
  ),
  FiZap: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-amber-600', ...props }) => (
    <FiZap size={size} className={className} {...props} />
  ),
  FiPlus: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiPlus size={size} className={className} {...props} />
  ),
  FiClock: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-orange-600', ...props }) => (
    <FiClock size={size} className={className} {...props} />
  ),
  MessageCircle: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-blue-600', ...props }) => (
    <FiMessageCircle size={size} className={className} {...props} />
  ),
  X: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-red-600', ...props }) => (
    <FiX size={size} className={className} {...props} />
  ),
  Send: ({ size = 24, className = 'text-gray-800 stroke-[1.5px] group-hover:text-emerald-600', ...props }) => (
    <FiSend size={size} className={className} {...props} />
  )
};

export default Icons;

