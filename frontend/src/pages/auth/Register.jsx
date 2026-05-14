import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearError } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, role, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(register({ name, email, phone, password }))
    if (register.fulfilled.match(result)) {
      const otpFromApi = result.payload?.otp
      if (otpFromApi) {
        toast.success('Use OTP below to verify (email not configured)')
        navigate('/verify-otp', { state: { email, otp: otpFromApi } })
      } else {
        toast.success('OTP sent to your email')
        navigate('/verify-otp', { state: { email } })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-emerald-900 to-zinc-950 px-4 py-12">
      <div className="relative w-full max-w-xl rounded-3xl p-1 shadow-2xl shadow-black/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(34,197,94,0.44),rgba(16,185,129,0.12),transparent)] pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[560px] bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl overflow-hidden">
          <div className="hidden lg:flex flex-col justify-center px-8 py-10 bg-emerald-800/30">
            <h2 className="text-3xl font-bold text-white mb-3">Join the Green Marketplace</h2>
            <p className="text-sm text-emerald-100 mb-6">Trusted by eco-conscious buyers and sellers. Start listing and selling sustainably.</p>
            <ul className="space-y-3 text-sm text-emerald-50">
              <li>🌱 Reuse & resell with confidence</li>
              <li>🔒 Encrypted account protection</li>
              <li>⚡ Fast on-ramp order processing</li>
            </ul>
          </div>

          <div className="flex flex-col justify-center px-8 py-10">
            <div className="text-center mb-6">
              <Link to="/" className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text">Re-Market</Link>
              <h1 className="text-2xl font-bold text-white mt-3">Create an account</h1>
              <p className="text-emerald-200 mt-2">Secure signup with multi-step verification</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-emerald-100 mb-1">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-emerald-100 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-emerald-100 mb-1">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-emerald-100 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                />
                <p className="text-xs text-emerald-200 mt-1">At least 6 characters</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-lime-300/50 transition"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
              <p className="text-center text-emerald-200 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-lime-200 font-semibold hover:text-lime-100">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
