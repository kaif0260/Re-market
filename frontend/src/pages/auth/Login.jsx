import { useState, useEffect } from 'react'

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  login,
  clearError
} from '../../store/slices/authSlice'

import { toast } from 'react-toastify'

import {
  signInWithPopup
} from 'firebase/auth'

import {
  auth,
  googleProvider
} from '../../firebase'

import axios from '../../api/axios'

import {
  FiArrowRight,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi'

export default function Login() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location = useLocation()

  const {
    loading,
    error,
    isAuthenticated
  } = useSelector(
    (state) => state.auth
  )

  const from =
    location.state?.from?.pathname || '/'

  useEffect(() => {

    if (isAuthenticated) {

      navigate(from, {
        replace: true
      })

    }

  }, [
    isAuthenticated,
    navigate,
    from
  ])

  useEffect(() => {

    if (error) {

      toast.error(error)

      dispatch(clearError())

    }

  }, [error, dispatch])

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      await dispatch(
        login({
          email,
          password
        })
      )

    }

  const handleGoogleLogin =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          )

        const user =
          result.user

        const response =
          await axios.post(
            '/auth/google-login',
            {
              name:
                user.displayName,

              email:
                user.email,

              avatar:
                user.photoURL
            }
          )

        localStorage.setItem(
          'token',
          response.data.token
        )

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data.user
          )
        )

        window.location.href = '/'

      } catch (error) {

        console.error(
          'Google Login Error:',
          error
        )

        if (
          error.code ===
          'auth/popup-blocked'
        ) {

          toast.error(
            'Allow popups and try again.'
          )

        } else if (
          error.code ===
          'auth/popup-closed-by-user'
        ) {

          toast.error(
            'Popup closed before login.'
          )

        } else {

          toast.error(
            'Google login failed'
          )

        }

      }

    }

  return (

    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center px-4 py-10">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-green-500/10 blur-3xl" />

      </div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-6xl rounded-[36px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-12">

            <div className="absolute inset-0">

              <div className="absolute top-[-80px] right-[-80px] w-[240px] h-[240px] rounded-full bg-white/10 blur-3xl" />

              <div className="absolute bottom-[-120px] left-[-120px] w-[280px] h-[280px] rounded-full bg-white/10 blur-3xl" />

            </div>

            <div className="relative z-10 flex flex-col justify-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-sm font-semibold mb-8 w-fit">

                <FiShield size={16} />

                Secure Marketplace

              </div>

              <h1 className="text-5xl font-black text-white leading-tight tracking-tight mb-6">

                Welcome Back to Re-Market

              </h1>

              <p className="text-emerald-50/90 text-lg leading-relaxed mb-10 max-w-lg">

                Login to access your orders, wishlist, seller dashboard, resale listings, and premium shopping experience.

              </p>

              <div className="space-y-5">

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Secure JWT Authentication

                </div>

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Smart Cart & Wishlist Sync

                </div>

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Fast & Protected Checkout

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

            <div className="w-full max-w-md">

              {/* LOGO */}

              <div className="text-center mb-10">

                <Link
                  to="/"
                  className="inline-block text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text text-transparent"
                >

                  Re-Market

                </Link>

                <h2 className="text-3xl font-black text-white mt-5">

                  Sign In

                </h2>

                <p className="text-slate-300 mt-3">

                  Access your account securely

                </p>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold text-slate-200 mb-2">

                    Email Address

                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                    placeholder="you@example.com"
                    className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label className="text-sm font-semibold text-slate-200">

                      Password

                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-emerald-300 hover:text-emerald-200"
                    >

                      Forgot Password?

                    </Link>

                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                    placeholder="Enter password"
                    className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                  />

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
                    loading
                      ? 'bg-emerald-400 cursor-wait'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-[0_15px_40px_rgba(34,197,94,0.25)] hover:-translate-y-1'
                  } text-white`}
                >

                  {loading ? (

                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                      Signing In...

                    </>

                  ) : (

                    <>
                      Sign In

                      <FiArrowRight size={18} />

                    </>

                  )}

                </button>

                {/* DIVIDER */}

                <div className="relative py-2">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-white/10" />

                  </div>

                  <div className="relative flex justify-center">

                    <span className="bg-transparent px-4 text-sm text-slate-400">

                      OR CONTINUE WITH

                    </span>

                  </div>

                </div>

                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={
                    handleGoogleLogin
                  }
                  className="w-full h-14 rounded-2xl bg-white text-slate-900 font-bold border border-white/10 hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-3"
                >

                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />

                  Continue with Google

                </button>

                {/* REGISTER */}

                <p className="text-center text-slate-300 text-sm pt-2">

                  Don’t have an account?{' '}

                  <Link
                    to="/register"
                    className="text-emerald-300 font-bold hover:text-emerald-200"
                  >

                    Create One

                  </Link>

                </p>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}