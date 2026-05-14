import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiCopy, FiX, FiPercent } from 'react-icons/fi'

const rewardTypes = {
  purchase: 'Successful purchase',
  firstOrder: 'First order complete',
  referral: 'Referral reward',
  sellerAchievement: 'Seller achievement',
  coupon: 'Coupon applied',
  cashback: 'Cashback unlocked',
  transaction: 'Transaction success'
}

const defaultActions = {
  onContinue: () => {},
  onViewDeals: () => {}
}

export default function ReMarketRewardModal({
  open,
  onClose,
  userName = 'Kaif',
  rewardCode = 'REMARKET100',
  rewardMessage = 'You’ve unlocked an exclusive ReMarket reward',
  rewardTitle = 'Reward Unlocked',
  rewardType = 'purchase',
  discountLabel = 'Get ₹100 OFF on your next purchase',
  validLabel = 'Valid for 24 hours',
  savedAmount = 100,
  autoClose = true,
  autoCloseSeconds = 12,
  soundSrc,
  onContinue = defaultActions.onContinue,
  onViewDeals = defaultActions.onViewDeals
}) {
  const [copyLabel, setCopyLabel] = useState('Copy Code')
  const [visible, setVisible] = useState(open)
  const [countdown, setCountdown] = useState(autoCloseSeconds)
  const [scratchRevealed, setScratchRevealed] = useState(false)

  useEffect(() => {
    setVisible(open)
    setScratchRevealed(false)
    setCountdown(autoCloseSeconds)
  }, [open, autoCloseSeconds])

  useEffect(() => {
    if (!visible || !autoClose) return undefined

    const timer = setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return value - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [visible, autoClose, onClose])

  useEffect(() => {
    if (!visible || !soundSrc) return undefined
    const audio = new Audio(soundSrc)
    audio.volume = 0.7
    audio.play().catch(() => {})
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [visible, soundSrc])

  const progress = useMemo(() => {
    if (!autoClose) return 0
    return Math.max(0, (countdown / autoCloseSeconds) * 100)
  }, [autoClose, countdown, autoCloseSeconds])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rewardCode)
      setCopyLabel('Copied!')
      window.setTimeout(() => setCopyLabel('Copy Code'), 1500)
    } catch {
      setCopyLabel('Tap to copy')
    }
  }

  const handleScratch = () => {
    setScratchRevealed(true)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-[#070b13]/95 shadow-[0_35px_120px_rgba(14,64,119,0.45)]"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,207,234,0.18),_transparent_42%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_40%,_rgba(255,255,255,0.02))]" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-200 shadow-lg shadow-black/20 transition hover:bg-slate-800"
            >
              <FiX size={20} />
            </button>

            <div className="relative overflow-hidden px-6 pb-8 pt-10 sm:px-10 sm:pb-10">
              <div className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-[0.95fr_0.7fr]">
                <motion.div
                  className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(4,15,30,0.55)]"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/12 text-emerald-300 shadow-[0_20px_40px_rgba(16,185,129,0.12)]">
                      <FiCheckCircle size={32} />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">{rewardTypes[rewardType] || rewardTitle}</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">🎉 Congratulations {userName}!</h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    {rewardMessage}
                  </p>

                  <div className="mt-7 rounded-[1.75rem] border border-cyan-400/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reward card</p>
                        <p className="mt-2 text-sm text-slate-300">Coupon Code</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white tracking-[0.08em]">{rewardCode}</h3>
                      </div>
                      <div className="rounded-3xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                        Save ₹{savedAmount}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                        <p className="font-medium text-slate-100">{discountLabel}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                        <p className="font-medium text-slate-100">{validLabel}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 rounded-3xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                      >
                        <FiCopy /> {copyLabel}
                      </button>
                      <button
                        type="button"
                        onClick={handleScratch}
                        className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:bg-slate-800"
                      >
                        <FiPercent /> Scratch to reveal
                      </button>
                    </div>

                    <motion.div
                      className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80"
                      initial={{ height: 0 }}
                      animate={{ height: scratchRevealed ? 'auto' : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {scratchRevealed ? (
                        <div className="px-5 py-4 text-sm text-slate-200">
                          <p className="font-semibold text-emerald-300">Scratch card unlocked!</p>
                          <p className="mt-2 text-slate-400">Your code is now active and ready to use at checkout.</p>
                        </div>
                      ) : null}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_24px_80px_rgba(4,15,30,0.55)]"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <div className="absolute inset-x-6 top-6 h-20 rounded-full bg-white/5 blur-2xl" />
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-5 text-center shadow-[0_18px_55px_rgba(4,15,30,0.3)]">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-emerald-400/15 text-cyan-200 shadow-[0_20px_60px_rgba(14,206,255,0.16)]">
                        <span className="text-3xl font-bold">✨</span>
                      </div>
                      <p className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-500">Premium unlock</p>
                      <p className="mt-3 text-xl font-semibold text-white">{rewardTypes[rewardType] || rewardTitle}</p>
                    </div>

                    <div className="space-y-4 rounded-[1.75rem] border border-cyan-400/10 bg-slate-900/90 p-5">
                      <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 px-4 py-4 text-sm text-slate-300">
                        <span>Cashback boost</span>
                        <span className="text-emerald-300">+₹{savedAmount}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 px-4 py-4 text-sm text-slate-300">
                        <span>Floating coins</span>
                        <span className="text-slate-100">Enabled</span>
                      </div>
                      <div className="rounded-3xl bg-gradient-to-r from-slate-900/80 via-cyan-500/10 to-slate-900/80 p-4 text-center text-sm text-slate-300">
                        <span className="font-semibold text-cyan-200">Congratulations! Level up your experience with ReMarket.</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={onContinue}
                        className="rounded-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
                      >
                        Continue Shopping
                      </button>
                      <button
                        type="button"
                        onClick={onViewDeals}
                        className="rounded-3xl border border-cyan-400/20 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-slate-800"
                      >
                        View Deals
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4 shadow-inner shadow-black/50">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                  <span>Auto-close in</span>
                  <span className="font-semibold text-slate-100">{countdown}s</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-slate-200"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute block h-2 w-2 rounded-full bg-cyan-300/70 blur-xl"
                initial={{ y: 0, x: 0, opacity: 0 }}
                animate={{ y: [0, -120, -260], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, delay: index * 0.1, duration: 2.2, ease: 'easeInOut' }}
                style={{
                  left: `${15 + index * 7}%`,
                  top: `${20 + (index % 5) * 8}%`
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
