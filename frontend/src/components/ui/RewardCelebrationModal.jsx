import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiCopy, FiX } from 'react-icons/fi'

export default function RewardCelebrationModal({ open, onClose, rewardCode, rewardMessage }) {
  const [copyLabel, setCopyLabel] = useState('Copy')

  const handleCopy = async () => {
    if (!rewardCode) return
    await navigator.clipboard.writeText(rewardCode)
    setCopyLabel('Copied')
    window.setTimeout(() => setCopyLabel('Copy'), 1500)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-800"
            >
              <FiX size={20} />
            </button>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/20">
              <FiCheckCircle size={48} />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">You’re all set!</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{rewardMessage || 'Thanks for shopping with Re-Market. Your premium order is confirmed with reward status.'}</p>
            <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reward Code</p>
              <div className="mt-3 flex items-center justify-between gap-4 rounded-3xl bg-slate-950 px-4 py-3 text-white">
                <span className="text-sm font-semibold break-all">{rewardCode || 'REMARKET20'}</span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
                >
                  <FiCopy /> {copyLabel}
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20"
            >
              Continue to orders
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
