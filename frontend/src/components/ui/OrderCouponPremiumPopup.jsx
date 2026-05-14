import { useEffect, useMemo, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}


function formatINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)
  } catch {
    return String(amount)
  }
}

export default function OrderCouponPremiumPopup({
  open,
  mode = 'coupon', // 'coupon' | 'order'
  onConfirm,
  couponName,
  savedAmount,
  orderDetails,
  confirmText = 'woohoo Thanks!',
}) {
  // Coupon mode shows:
  // - exact applied coupon name (couponName)
  // - exact discount amount (savedAmount)
  // - single CTA (onConfirm) so no extra submit/button leaks outside the modal.
  // NOTE: Checkout page passes confirmText; we render it once inside the modal only.

  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])
  const [internalOpen, setInternalOpen] = useState(open)

  const canClose = useMemo(() => false, [])

  useEffect(() => {
    setInternalOpen(open)
  }, [open])

  useEffect(() => {
    if (!internalOpen) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = Math.floor(clientWidth * dpr)
      canvas.height = Math.floor(clientHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // Confetti-like falling candies
    const colors = [
      '#22c55e',
      '#06b6d4',
      '#3b82f6',
      '#a855f7',
      '#f97316',
      '#f43f5e',
      '#fde047',
      '#34d399',
    ]

    const rand = (min, max) => min + Math.random() * (max - min)

    const makeParticle = () => {
      const x = rand(0, canvas.clientWidth)
      const y = -20
      const vx = rand(-0.8, 0.8)
      const vy = rand(2.5, 6.5)
      const size = rand(5, 12)
      const rot = rand(0, Math.PI * 2)
      const rotSpeed = rand(-0.12, 0.12)
      const shape = Math.random() > 0.5 ? 'rect' : 'pill'
      return {
        x,
        y,
        vx,
        vy,
        size,
        color: colors[(Math.random() * colors.length) | 0],
        rot,
        rotSpeed,
        shape,
        life: 1,
        alpha: 1,
      }
    }

    const spawnBurst = (count = 120) => {
      particlesRef.current = []
      for (let i = 0; i < count; i += 1) {
        particlesRef.current.push(makeParticle())
      }
    }

    const start = () => {
      spawnBurst(140)

      const tick = () => {
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        ctx.clearRect(0, 0, w, h)

        const gravity = 0.02
        const drag = 0.995

        const ps = particlesRef.current
        for (let i = 0; i < ps.length; i += 1) {
          const p = ps[i]
          p.vy += gravity
          p.vx *= drag
          p.vy *= drag
          p.x += p.vx
          p.y += p.vy
          p.rot += p.rotSpeed

          // fade near bottom
          const fadeStart = h * 0.65
          if (p.y > fadeStart) {
            p.alpha = Math.max(0, 1 - (p.y - fadeStart) / (h * 0.35))
          }

          ctx.globalAlpha = p.alpha
          ctx.fillStyle = p.color
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.6)
          } else {
            const r = p.size / 2.2
            ctx.beginPath()
            ctx.roundRect(-p.size / 2, -r, p.size, 2 * r, r)
            ctx.fill()
          }

          ctx.restore()
        }
        ctx.globalAlpha = 1

        // Keep animating while modal is open; respawn when done
        const alive = ps.some((p) => p.alpha > 0.01)
        if (!alive) {
          if (internalOpen) spawnBurst(mode === 'order' ? 160 : 130)
        }

        rafRef.current = window.requestAnimationFrame(tick)
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    start()

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      particlesRef.current = []
    }
  }, [internalOpen, mode])

  if (!internalOpen) return null

  const isCoupon = mode === 'coupon'
  const title = isCoupon ? 'Coupon Applied' : 'Order Placed'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" />

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Modal */}
      <div
        className={
          'relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#070b13]/95 p-6 sm:p-8 text-center shadow-[0_35px_120px_rgba(14,64,119,0.45)]'
        }
      >
        {/* Close is disabled by design; keep only for accessibility via hidden handler */}
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 hidden"
          onClick={() => {
            if (canClose) onConfirm?.()
          }}
        />

        {/* Icon / Tick */}
        {isCoupon ? (
          <div className="mx-auto mt-2 flex h-24 w-24 items-center justify-center">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              className="drop-shadow-[0_10px_35px_rgba(16,185,129,0.25)]"
            >
              <defs>
                <linearGradient id="tickGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>

              <path
                d="M20 50 L40 70 L78 28"
                fill="none"
                stroke="url(#tickGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="160"
                strokeDashoffset="160"
                style={{ animation: 'bbDrawTick 900ms cubic-bezier(.2,.9,.2,1) forwards' }}
              />
            </svg>
          </div>
        ) : (
          <div className="mx-auto mt-1 flex h-24 w-24 items-center justify-center">
            <svg
              width="110"
              height="110"
              viewBox="0 0 96 96"
              className="drop-shadow-[0_15px_40px_rgba(34,211,238,0.2)]"
            >
              <defs>
                <linearGradient id="tickGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              <path
                d="M20 50 L40 70 L78 28"
                fill="none"
                stroke="url(#tickGrad2)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 180,
                  strokeDashoffset: 0,
                  filter: 'none',
                  transformOrigin: '50% 50%',
                  animation: 'bbBigTick 900ms cubic-bezier(.2,.9,.2,1) forwards',
                }}
              />
            </svg>
          </div>
        )}

        {/* Title */}
        <div className="mt-2">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            {title}
          </p>
        </div>

        {/* Body text */}
        {isCoupon ? (
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{couponName || 'Coupon Applied'}</h2>
            <p className="mt-2 text-sm sm:text-base leading-6 text-slate-300">
              You saved ₹{formatINR(savedAmount || 0)}
            </p>
          </div>
        ) : (
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Congratulations! Your order is placed
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-6 text-slate-300">
              {orderDetails || 'We’re getting it ready. You’ll receive updates soon.'}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => onConfirm?.()}
            className="w-full rounded-3xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:scale-[1.01] active:scale-[0.99]"
          >
            {confirmText}
          </button>
        </div>

        <style>{`
          @keyframes bbDrawTick {
            0% { stroke-dashoffset: 160; opacity: 0; }
            35% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes bbBigTick {
            0% { transform: scale(0.4); opacity: 0; stroke-dasharray: 0 260; }
            50% { opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>

      {/* Disable outside click closing by using pointer events */}
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  )
}

