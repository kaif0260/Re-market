import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase'
import axios from '../../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  )

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(login({ email, password }))
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      const user = result.user

      const response = await axios.post('/auth/google-login', {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      window.location.href = '/'
    } catch (error) {
      console.error('Google Login Error:', error)
      if (error.code === 'auth/popup-blocked') {
        toast.error('Popup was blocked by browser. Please allow popups for this site and try again.')
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Popup was closed before completing the sign-in.')
      } else {
        toast.error('Google login failed: ' + (error.message || 'Unknown error'))
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-blue-950 px-4 py-12">
      <div className="relative w-full max-w-xl rounded-3xl p-1 shadow-2xl shadow-black/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,106,0.44),_rgba(16,185,129,0.10),_transparent)] pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[500px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">

          <div className="hidden md:flex flex-col justify-center items-start px-8 py-10 bg-emerald-700/30">
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome to Re-Market
            </h2>

            <p className="text-sm text-emerald-100 mb-6">
              Buy or sell used goods with trusted transfers, fast delivery,
              and verified listings.
            </p>

            <ul className="space-y-3 text-sm text-emerald-50">
              <li>✅ Secure login with JWT</li>
              <li>✅ Smart cart & wishlist sync</li>
              <li>✅ Fast checkout experience</li>
            </ul>
          </div>

          <div className="flex flex-col justify-center px-8 py-10">

            <div className="text-center mb-6">
              <Link
                to="/"
                className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text"
              >
                Re-Market
              </Link>

              <h1 className="text-2xl font-bold text-white mt-3">
                Sign in to your account
              </h1>

              <p className="text-emerald-200 mt-2">
                Secure access to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-emerald-100 mb-1"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-emerald-100 mb-1"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  required
                  className="w-full px-4 py-3 bg-white/85 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-emerald-200 hover:text-white hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-lime-300/50 transition"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Continue with Google
              </button>

              <p className="text-center text-emerald-200 text-sm">
                Don’t have an account?{' '}
                <Link
                  to="/register"
                  className="text-lime-200 font-semibold hover:text-lime-100"
                >
                  Create one
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}