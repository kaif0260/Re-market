import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOTP, resendOTP, clearError } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

export default function VerifyOTP() {
  const location = useLocation()
  const email = location.state?.email || ''
  const [otp, setOtp] = useState(location.state?.otp || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  // Redirect if email missing
  useEffect(() => {
    if (!email) navigate('/register', { replace: true })
  }, [email, navigate])

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }
    await dispatch(verifyOTP({ email, otp }))
  }

  const handleResend = async () => {
    await dispatch(resendOTP({ email }))
    toast.success('OTP resent successfully!')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            Re-Market
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Verify your email
          </h1>
          <p className="text-gray-500 mt-1">
            {location.state?.otp ? 'Use the OTP below to verify.' : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-2xl shadow-sm p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OTP
            </label>

            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              maxLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="w-full py-2 text-emerald-600 text-sm hover:underline"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  )
}