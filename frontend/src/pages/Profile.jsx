import {
  useEffect,
  useState
} from 'react'

import {
  useSelector
} from 'react-redux'

import axios from '../api/axios'

import { toast } from 'react-toastify'

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
  FiPlus,
  FiShield,
  FiHome
} from 'react-icons/fi'

export default function Profile() {

  const { user } =
    useSelector(
      (state) => state.auth
    )

  const [name, setName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [addresses, setAddresses] =
    useState([])

  const [saving, setSaving] =
    useState(false)

  const [
    newAddress,
    setNewAddress
  ] = useState({

    name: '',

    phone: '',

    address: '',

    city: '',

    state: '',

    pincode: ''

  })

  useEffect(() => {

    setName(
      user?.name || ''
    )

    setPhone(
      user?.phone || ''
    )

    const fetchProfile =
      async () => {

        try {

          const { data } =
            await axios.get(
              '/auth/profile'
            )

          setAddresses(
            data.user?.addresses || []
          )

        } catch (err) {

          setAddresses([])

        }

      }

    fetchProfile()

  }, [user])

  const handleSaveProfile =
    async (e) => {

      e.preventDefault()

      setSaving(true)

      try {

        await axios.put(
          '/auth/profile',
          {
            name,
            phone
          }
        )

        toast.success(
          'Profile updated successfully'
        )

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          'Failed to update profile'
        )

      }

      setSaving(false)

    }

  const handleAddAddress =
    async (e) => {

      e.preventDefault()

      try {

        const { data } =
          await axios.post(
            '/auth/address',
            newAddress
          )

        setAddresses(
          data.addresses || []
        )

        setNewAddress({

          name: '',

          phone: '',

          address: '',

          city: '',

          state: '',

          pincode: ''

        })

        toast.success(
          'Address added successfully'
        )

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          'Failed to add address'
        )

      }

    }

  return (

    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 py-10 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-5">

            <FiShield size={15} />

            Secure Account

          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">

            My Profile

          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg">

            Manage your account information and saved delivery addresses.

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_430px] gap-8">

          {/* PROFILE */}

          <div className="space-y-8">

            {/* ACCOUNT CARD */}

            <div className="rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

              {/* TOP */}

              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white">

                <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex items-center gap-5">

                  <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-3xl font-black">

                    {user?.name?.charAt(0) || 'U'}

                  </div>

                  <div>

                    <h2 className="text-3xl font-black tracking-tight">

                      {user?.name || 'User'}

                    </h2>

                    <p className="text-emerald-50 mt-1">

                      Premium Re-Market Account

                    </p>

                  </div>

                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={
                  handleSaveProfile
                }
                className="p-8 space-y-7"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  {/* NAME */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">

                      <FiUser size={15} />

                      Full Name

                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>

                        setName(
                          e.target.value
                        )

                      }
                      className="w-full h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">

                      <FiPhone size={15} />

                      Phone Number

                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>

                        setPhone(
                          e.target.value
                        )

                      }
                      className="w-full h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">

                    <FiMail size={15} />

                    Email Address

                  </label>

                  <input
                    type="email"
                    value={
                      user?.email || ''
                    }
                    disabled
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300"
                  />

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-300"
                >

                  <FiSave size={18} />

                  {saving
                    ? 'Saving...'
                    : 'Save Changes'}

                </button>

              </form>

            </div>

            {/* ADDRESS FORM */}

            <div className="rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-8">

              <div className="mb-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-5">

                  <FiMapPin size={15} />

                  Delivery Information

                </div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">

                  Add New Address

                </h2>

                <p className="text-slate-500 dark:text-slate-400">

                  Save addresses for faster and secure checkout.

                </p>

              </div>

              <form
                onSubmit={
                  handleAddAddress
                }
                className="space-y-6"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      newAddress.name
                    }
                    onChange={(e) =>

                      setNewAddress({
                        ...newAddress,
                        name:
                          e.target.value
                      })

                    }
                    className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={
                      newAddress.phone
                    }
                    onChange={(e) =>

                      setNewAddress({
                        ...newAddress,
                        phone:
                          e.target.value
                      })

                    }
                    className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />

                </div>

                <input
                  type="text"
                  placeholder="Full Address"
                  value={
                    newAddress.address
                  }
                  onChange={(e) =>

                    setNewAddress({
                      ...newAddress,
                      address:
                        e.target.value
                    })

                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                  required
                />

                <div className="grid md:grid-cols-3 gap-6">

                  <input
                    type="text"
                    placeholder="City"
                    value={
                      newAddress.city
                    }
                    onChange={(e) =>

                      setNewAddress({
                        ...newAddress,
                        city:
                          e.target.value
                      })

                    }
                    className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />

                  <input
                    type="text"
                    placeholder="State"
                    value={
                      newAddress.state
                    }
                    onChange={(e) =>

                      setNewAddress({
                        ...newAddress,
                        state:
                          e.target.value
                      })

                    }
                    className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={
                      newAddress.pincode
                    }
                    onChange={(e) =>

                      setNewAddress({
                        ...newAddress,
                        pincode:
                          e.target.value
                      })

                    }
                    className="h-14 px-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-300"
                >

                  <FiPlus size={18} />

                  Add Address

                </button>

              </form>

            </div>

          </div>

          {/* ADDRESS LIST */}

          <div className="xl:sticky xl:top-28 h-fit">

            <div className="rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

              {/* TOP */}

              <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-900 p-8 text-white">

                <div className="absolute top-[-50px] right-[-50px] w-[160px] h-[160px] rounded-full bg-white/10 blur-3xl" />

                <div className="relative">

                  <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5">

                    <FiHome size={30} />

                  </div>

                  <h2 className="text-3xl font-black tracking-tight">

                    Saved Addresses

                  </h2>

                  <p className="text-slate-300 mt-2">

                    Your delivery locations

                  </p>

                </div>

              </div>

              {/* LIST */}

              <div className="p-6 space-y-5 max-h-[700px] overflow-y-auto">

                {addresses.length === 0 ? (

                  <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 p-8 text-center">

                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-5">

                      <FiMapPin
                        size={28}
                        className="text-slate-500"
                      />

                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">

                      No Addresses Yet

                    </h3>

                    <p className="text-slate-500 dark:text-slate-400">

                      Add your first delivery address to continue faster checkout.

                    </p>

                  </div>

                ) : (

                  addresses.map(
                    (addr) => (

                    <div
                      key={addr._id}
                      className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >

                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">

                          <FiHome
                            size={22}
                            className="text-emerald-600"
                          />

                        </div>

                        <div className="flex-1">

                          <h3 className="text-lg font-black text-slate-900 dark:text-white">

                            {addr.name}

                          </h3>

                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">

                            {addr.phone}

                          </p>

                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">

                            {addr.address},
                            {' '}
                            {addr.city},
                            {' '}
                            {addr.state}
                            {' '}
                            -
                            {' '}
                            {addr.pincode}

                          </p>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}