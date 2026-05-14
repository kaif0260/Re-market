import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Demo-only payment sheet: looks like a real PG checkout (no Razorpay branding).
 * Props drive masked payer line + method for realistic copy.
 */
export default function DummyPaymentModal({
  open,
  amount,
  methodLabel,
  payMode,
  payerSummary,
  transactionRef,
  onComplete,
  onCancel
}) {
  const [phase, setPhase] = useState(0)
  const cancelledRef = useRef(false)

  const steps = [
    {
      title: 'Secure connection',
      desc: 'TLS 1.2 · PCI-DSS ready sandbox · Session token issued'
    },
    {
      title: 'Verifying payer',
      desc:
        payMode === 'upi'
          ? `UPI / NPCI · ${payerSummary || 'VPA verified'}`
          : payMode === 'card'
            ? payerSummary || 'Card verified with issuer test environment'
            : payMode === 'netbanking'
              ? `${payerSummary || 'Bank'} · redirect simulation (no browser leave)`
              : payMode === 'emi'
                ? `${payerSummary || 'EMI'} · lender eligibility check (demo)`
                : payerSummary || 'Payment method verified'
    },
    {
      title: 'Authorising transaction',
      desc: 'Hold placed on test balance · awaiting final capture'
    },
    {
      title: 'Payment successful',
      desc: 'Completing your order on Remarket…'
    }
  ]

  useEffect(() => {
    if (!open) {
      setPhase(0)
      return undefined
    }
    cancelledRef.current = false
    setPhase(0)

    const schedule = [
      setTimeout(() => {
        if (!cancelledRef.current) setPhase(1)
      }, 520),
      setTimeout(() => {
        if (!cancelledRef.current) setPhase(2)
      }, 1350),
      setTimeout(() => {
        if (!cancelledRef.current) setPhase(3)
      }, 2300),
      setTimeout(() => {
        if (!cancelledRef.current) onComplete?.()
      }, 3100)
    ]

    return () => {
      schedule.forEach(clearTimeout)
    }
  }, [open, onComplete])

  const progress = ((phase + 1) / steps.length) * 100

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-[420px] rounded-2xl bg-white shadow-[0_25px_80px_-12px_rgba(15,23,42,0.45)] overflow-hidden ring-1 ring-slate-200/80"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            {/* Top bar — common PG pattern */}
            <div className="bg-slate-900 px-5 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-white/95">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                <span className="text-xs font-medium tracking-wide">Secured checkout</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-300/90 font-semibold">
                Remarket Pay · demo
              </span>
            </div>

            <div className="px-6 pt-6 pb-2 border-b border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Paying to</p>
              <p className="text-lg font-bold text-slate-900">Remarket</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">Amount payable</p>
                  <p className="text-3xl font-bold text-slate-900 tabular-nums">
                    ₹{Number(amount || 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500 space-y-0.5">
                  <p>{methodLabel}</p>
                  {transactionRef ? (
                    <p className="font-mono text-slate-600">Ref · {transactionRef}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[min(52vh,320px)] overflow-y-auto">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`flex gap-3 transition-all duration-300 ${
                    i === phase ? 'opacity-100 scale-[1.01]' : i < phase ? 'opacity-55' : 'opacity-25'
                  }`}
                >
                  <div
                    className={`mt-0.5 h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      i < phase
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : i === phase
                          ? 'bg-white border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {i < phase ? '✓' : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-sm leading-snug">{s.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-[11px] text-center text-slate-500 leading-relaxed">
                <span className="font-medium text-slate-600">Demo gateway</span>
                {' — '}
                No money leaves your account. Built to mirror a live payment experience for demos &
                testing.
              </p>
              {phase < 3 && (
                <button
                  type="button"
                  onClick={() => {
                    cancelledRef.current = true
                    onCancel?.()
                  }}
                  className="mt-3 w-full py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-white/80 transition"
                >
                  Cancel payment
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
