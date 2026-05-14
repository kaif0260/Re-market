/** UPI VPA: user@bank / user@paytm etc. */
export function isValidUpiId(raw) {
  const v = String(raw || '').trim().toLowerCase()
  if (v.length < 5 || v.length > 255) return false
  return /^[a-z0-9._-]{2,256}@[a-z0-9._-]{2,64}$/i.test(v)
}

export function digitsOnly(s) {
  return String(s || '').replace(/\D/g, '')
}

/** Mask UPI for display in payment UI (e.g. ab••••yz@okaxis). */
export function maskUpiForDisplay(raw) {
  const s = String(raw || '').trim()
  const at = s.indexOf('@')
  if (at < 1) return '••••••••'
  const local = s.slice(0, at)
  const domain = s.slice(at)
  if (local.length <= 2) return `${local[0] || '•'}••••${domain}`
  return `${local.slice(0, 2)}••••${local.slice(-2)}${domain}`
}

export function cardBrandFromPan(raw) {
  const d = digitsOnly(raw)
  const c = d[0]
  if (c === '4') return 'Visa'
  if (c === '5') return 'Mastercard'
  if (c === '3') return 'Amex'
  if (c === '6') return 'RuPay'
  return 'Card'
}

/** Luhn check for 12–19 digit PANs (demo cards included). */
export function passesLuhn(numStr) {
  const d = digitsOnly(numStr)
  if (d.length < 12 || d.length > 19) return false
  let sum = 0
  let alt = false
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10)
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

export function isValidCardNumber(raw) {
  const d = digitsOnly(raw)
  return d.length === 16 && passesLuhn(d)
}

/** MM / YY or MM/YY */
export function isValidCardExpiry(raw) {
  const m = String(raw || '').trim().match(/^(\d{2})\s*\/?\s*(\d{2})$/)
  if (!m) return false
  const month = parseInt(m[1], 10)
  const yy = parseInt(m[2], 10)
  if (month < 1 || month > 12) return false
  const now = new Date()
  const fullYear = 2000 + yy
  const expEnd = new Date(fullYear, month, 0, 23, 59, 59)
  return expEnd >= now
}

export function isValidCvv(raw) {
  const d = digitsOnly(raw)
  return d.length === 3 || d.length === 4
}

export function isValidCardholderName(raw) {
  return String(raw || '').trim().length >= 3
}

export const NETBANKING_BANKS = [
  { id: 'sbi', label: 'State Bank of India' },
  { id: 'hdfc', label: 'HDFC Bank' },
  { id: 'icici', label: 'ICICI Bank' },
  { id: 'axis', label: 'Axis Bank' },
  { id: 'kotak', label: 'Kotak Mahindra Bank' },
  { id: 'pnb', label: 'Punjab National Bank' }
]

export const EMI_TENURES = [
  { months: 3, label: '3 months' },
  { months: 6, label: '6 months' },
  { months: 9, label: '9 months' },
  { months: 12, label: '12 months' }
]
