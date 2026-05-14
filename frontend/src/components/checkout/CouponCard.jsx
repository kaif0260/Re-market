import { useMemo, useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

function formatINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return String(amount)
  }
}

export default function CouponCard({
  coupon,
  appliedCode,
  onCopy,
  onApply,
  disabled = false,
  computePreviewDiscount,
}) {
  const [blast, setBlast] = useState(false)

  const isApplied =
    appliedCode &&
    coupon?.code &&
    appliedCode === coupon.code

  const previewDiscountText = useMemo(() => {
    if (!computePreviewDiscount) return null

    const v = computePreviewDiscount(coupon)

    if (!v) return null

    if (coupon.discountType === 'percentage') {
      return `${v}% off`
    }

    return `₹${formatINR(v)} off`
  }, [coupon, computePreviewDiscount])

  const discountBadge = useMemo(() => {
    if (!coupon) return null

    if (coupon.discountType === 'percentage') {
      return `${Math.round(coupon.discountValue)}% OFF`
    }

    return `₹${formatINR(coupon.discountValue)} OFF`
  }, [coupon])

  const expiryText = useMemo(() => {
    if (!coupon?.validUntil) return null

    try {
      const d = new Date(coupon.validUntil)

      return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    } catch {
      return String(coupon.validUntil)
    }
  }, [coupon?.validUntil])

  const handleApply = () => {
    setBlast(true)

    setTimeout(() => {
      setBlast(false)
    }, 2500)

    onApply?.(coupon)
  }

  return (
    <div className="relative">

      {/* ZOMATO STYLE CONFETTI */}

      {blast && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">

          {[...Array(120)].map((_, i) => {
            const leftSide = i % 2 === 0

            return (
              <span
                key={i}
                className="absolute animate-[zomatoBlast_2.8s_cubic-bezier(0.18,0.89,0.32,1)_forwards]"
                style={{
                  bottom: '-10px',

                  left: leftSide ? '0px' : '100%',

                  width: `${4 + Math.random() * 10}px`,

                  height: `${8 + Math.random() * 22}px`,

                  borderRadius:
                    Math.random() > 0.5
                      ? '999px'
                      : '4px',

                  background: [
                    '#ef4444',
                    '#f97316',
                    '#eab308',
                    '#22c55e',
                    '#3b82f6',
                    '#ec4899',
                    '#ffffff',
                  ][Math.floor(Math.random() * 7)],

                  transform: `rotate(${Math.random() * 360}deg)`,

                  animationDelay: `${Math.random() * 0.25}s`,

                  '--x': `${
                    leftSide
                      ? 180 + Math.random() * 500
                      : -180 - Math.random() * 500
                  }px`,

                  '--y': `${-200 - Math.random() * 500}px`,
                }}
              />
            )
          })}
        </div>
      )}

      <div
        className={`relative overflow-hidden rounded-[32px] border transition-all duration-500 ${
          isApplied
            ? 'border-green-300 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-[0_15px_60px_rgba(34,197,94,0.18)]'
            : 'border-gray-100 bg-white shadow-xl hover:-translate-y-1 hover:shadow-2xl'
        }`}
      >

        {/* PREMIUM GLOW */}

        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-60"></div>

        <div className="relative p-5 sm:p-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                LIMITED OFFER
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-gray-900">
                {discountBadge}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Use Code:
                <span className="ml-2 rounded-lg bg-gray-100 px-2 py-1 font-mono font-bold text-black">
                  {coupon?.code}
                </span>
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Valid till {expiryText}
              </p>

              {previewDiscountText ? (
                <div className="mt-4 inline-flex rounded-2xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                  Save {previewDiscountText}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-end gap-2">

              <button
                type="button"
                onClick={() => onCopy?.(coupon?.code)}
                disabled={disabled}
                className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:scale-105"
              >
                <FiCopy className="h-5 w-5 text-gray-700" />
              </button>

              {isApplied && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-3 animate-pulse">
                  <FiCheck className="h-5 w-5 text-green-600" />
                </div>
              )}
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-6 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={handleApply}
              disabled={disabled || isApplied}
              className={`rounded-2xl py-3.5 text-sm font-bold transition-all duration-300 ${
                isApplied
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:scale-[1.03] hover:shadow-red-500/30 active:scale-95'
              }`}
            >
              {isApplied ? 'Applied ✓' : 'Apply Coupon'}
            </button>

            <button
              type="button"
              onClick={() => onCopy?.(coupon?.code)}
              disabled={disabled}
              className="rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-bold transition-all hover:bg-gray-50"
            >
              Copy Code
            </button>
          </div>
        </div>

        {/* GLOW ORBS */}

        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl"></div>

        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl"></div>

      </div>

      <style jsx>{`
        @keyframes zomatoBlast {
          0% {
            transform:
              translate(0, 0)
              rotate(0deg)
              scale(1);

            opacity: 1;
          }

          100% {
            transform:
              translate(var(--x), var(--y))
              rotate(720deg)
              scale(0.6);

            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}