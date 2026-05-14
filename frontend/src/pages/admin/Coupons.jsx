import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

const emptyCoupon = {
  code: '',
  description: '',
  discountType: 'fixed',
  discountValue: 100,
  minPurchase: 0,
  maxDiscount: 0,
  validFrom: new Date().toISOString().slice(0, 10),
  validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  usageLimit: 100,
  isActive: true
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyCoupon)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axios.get('/admin/coupons')
        setCoupons(data.coupons || [])
      } catch (err) {
        setCoupons([])
        toast.error('Could not fetch coupons')
      } finally {
        setLoading(false)
      }
    }
    fetchCoupons()
  }, [])

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`/admin/coupons/${id}`)
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== id))
      toast.success('Coupon removed successfully')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete coupon')
    }
  }

  const handleCreateCoupon = async () => {
    if (!form.code.trim()) {
      toast.error('Coupon code is required')
      return
    }

    setSaving(true)
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase().trim(),
        discountValue: Number(form.discountValue),
        minPurchase: Number(form.minPurchase),
        maxDiscount: Number(form.maxDiscount) || null,
        usageLimit: Number(form.usageLimit) || null,
        validFrom: new Date(form.validFrom),
        validUntil: new Date(form.validUntil)
      }
      const { data } = await axios.post('/admin/coupons', payload)
      setCoupons((prev) => [data.coupon, ...prev])
      setForm(emptyCoupon)
      toast.success('Coupon created successfully')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create coupon')
    }
    setSaving(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Coupon Center</h1>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create new coupon</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Coupon code</span>
              <input
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="REMARKET100"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Description</span>
              <input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="Get flat ₹100 off"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Discount type</span>
              <select
                value={form.discountType}
                onChange={(e) => setForm((f) => ({ ...f, discountType: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
              >
                <option value="fixed">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Discount value</span>
              <input
                type="number"
                value={form.discountValue}
                onChange={(e) => setForm((f) => ({ ...f, discountValue: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="100"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Minimum purchase</span>
              <input
                type="number"
                value={form.minPurchase}
                onChange={(e) => setForm((f) => ({ ...f, minPurchase: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="0"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Max discount</span>
              <input
                type="number"
                value={form.maxDiscount}
                onChange={(e) => setForm((f) => ({ ...f, maxDiscount: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="300"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Valid from</span>
              <input
                type="date"
                value={form.validFrom}
                onChange={(e) => setForm((f) => ({ ...f, validFrom: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Valid until</span>
              <input
                type="date"
                value={form.validUntil}
                onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Usage limit</span>
              <input
                type="number"
                value={form.usageLimit}
                onChange={(e) => setForm((f) => ({ ...f, usageLimit: e.target.value }))}
                className="w-full border rounded-2xl px-4 py-3 focus:ring-emerald-500"
                placeholder="100"
              />
            </label>
            <label className="flex items-center gap-3 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                className="h-5 w-5 rounded border-gray-300 text-emerald-600"
              />
              <span className="text-sm text-gray-700">Activate coupon immediately</span>
            </label>
          </div>
          <button
            disabled={saving}
            onClick={handleCreateCoupon}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? 'Creating...' : 'Create coupon'}
          </button>
        </div>

        <div className="bg-slate-950 text-white p-6 rounded-3xl shadow-2xl border border-slate-800">
          <h2 className="text-xl font-semibold mb-4">Coupon management</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : coupons.length === 0 ? (
            <p className="text-slate-400">No coupons found yet. Create one to activate a campaign.</p>
          ) : (
            <div className="space-y-4">
              {coupons.map((c) => (
                <div key={c._id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-lg font-semibold text-emerald-400">{c.code}</p>
                      <p className="text-sm text-slate-400 mt-1">{c.description || 'No description provided'}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm ${c.isActive ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-600/20 text-slate-300'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-slate-400">
                    <p>Valid: {new Date(c.validFrom).toLocaleDateString()} — {new Date(c.validUntil).toLocaleDateString()}</p>
                    <p>Min purchase: ₹{c.minPurchase || 0}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleDeleteCoupon(c._id)}
                      className="rounded-2xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <span className="text-sm text-slate-400">{c.usageLimit ? `Usage cap: ${c.usageLimit}` : 'Unlimited use'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
