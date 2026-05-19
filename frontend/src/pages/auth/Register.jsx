import { useState, useEffect } from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  register,
  clearError
} from '../../store/slices/authSlice'

import { toast } from 'react-toastify'

import {
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiLock
} from 'react-icons/fi'

export default function Register() {

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [password, setPassword] =
    useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    isAuthenticated,
    loading,
    error
  } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (isAuthenticated) {

      navigate('/')

    }

  }, [
    isAuthenticated,
    navigate
  ])

  useEffect(() => {

    if (error) {

      toast.error(error)

      dispatch(clearError())

    }

  }, [
    error,
    dispatch
  ])

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      const result =
        await dispatch(
          register({
            name,
            email,
            phone,
            password
          })
        )

      if (
        register.fulfilled.match(
          result
        )
      ) {

        const otpFromApi =
          result.payload?.otp

        if (otpFromApi) {

          toast.success(
            'Use OTP below to verify'
          )

          navigate(
            '/verify-otp',
            {
              state: {
                email,
                otp: otpFromApi
              }
            }
          )

        } else {

          toast.success(
            'OTP sent to your email'
          )

          navigate(
            '/verify-otp',
            {
              state: { email }
            }
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

                Trusted Marketplace

              </div>

              <h1 className="text-5xl font-black text-white leading-tight tracking-tight mb-6">

                Create Your Re-Market Account

              </h1>

              <p className="text-emerald-50/90 text-lg leading-relaxed mb-10 max-w-lg">

                Join thousands of buyers and sellers using Re-Market for secure shopping, resale listings, and protected transactions.

              </p>

              <div className="space-y-5">

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Secure OTP Verification

                </div>

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Protected User Accounts

                </div>

                <div className="flex items-center gap-3 text-white">

                  <FiCheckCircle
                    size={20}
                    className="text-lime-300"
                  />

                  Fast Marketplace Access

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

                  Create Account

                </h2>

                <p className="text-slate-300 mt-3">

                  Start your secure shopping journey

                </p>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME */}

                <div>

                  <label className="block text-sm font-semibold text-slate-200 mb-2">

                    Full Name

                  </label>

                  <div className="relative">

                    <FiUser
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      required
                      placeholder="Enter full name"
                      className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold text-slate-200 mb-2">

                    Email Address

                  </label>

                  <div className="relative">

                    <FiMail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

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
                      className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label className="block text-sm font-semibold text-slate-200 mb-2">

                    Phone Number

                  </label>

                  <div className="relative">

                    <FiPhone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                        )
                      }
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="block text-sm font-semibold text-slate-200 mb-2">

                    Password

                  </label>

                  <div className="relative">

                    <FiLock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      required
                      minLength={6}
                      placeholder="Create password"
                      className="w-full h-14 pl-12 pr-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                    />

                  </div>

                  <p className="text-xs text-slate-400 mt-2">

                    Password must be at least 6 characters

                  </p>

                </div>

                {/* BUTTON */}

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

                      Creating Account...

                    </>

                  ) : (

                    <>
                      Create Account

                      <FiArrowRight size={18} />

                    </>

                  )}

                </button>

                {/* LOGIN */}

                <p className="text-center text-slate-300 text-sm pt-2">

                  Already have an account?{' '}

                  <Link
                    to="/login"
                    className="text-emerald-300 font-bold hover:text-emerald-200"
                  >

                    Sign In

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