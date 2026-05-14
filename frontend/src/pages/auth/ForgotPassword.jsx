import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearError } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(forgotPassword({ email }))
    if (forgotPassword.fulfilled.match(result)) {
      setSent(true)
      toast.success('Password reset email sent!')
    }
  }

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Re-Market
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Forgot password?</h1>
          <p className="text-gray-500 mt-1">Enter your email to get a reset link</p>
        </div>
        {sent ? (
          <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-600">If an account exists for <span className="font-semibold">{email}</span>, you will receive a password reset link.</p>
            <Link to="/login" className="inline-block mt-4 text-emerald-600 font-medium hover:underline">← Back to login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-sm p-8 space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="you@example.com"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition">
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
            <Link to="/login" className="block text-center text-emerald-600 hover:underline text-sm">← Back to login</Link>
          </form>
        )}
      </div>
    </div>
  )
}
