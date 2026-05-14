import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../api/axios'
import { toast } from 'react-toastify'

export default function Profile() {

  const { user } = useSelector(
    (state) => state.auth
  )

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addresses, setAddresses] = useState([])
  const [saving, setSaving] = useState(false)

  const [newAddress, setNewAddress] =
    useState({

      name: '',

      phone: '',

      address: '',

      city: '',

      state: '',

      pincode: ''

    })

  useEffect(() => {

    setName(user?.name || '')
    setPhone(user?.phone || '')

    const fetchProfile = async () => {

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

  const handleSaveProfile = async (
    e
  ) => {

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

  const handleAddAddress = async (
    e
  ) => {

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

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and delivery addresses
          </p>

        </div>

        {/* PROFILE FORM */}

        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

            </div>

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-100"
            />

          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            {saving
              ? 'Saving...'
              : 'Save Profile'}
          </button>

        </form>

        {/* ADDRESS SECTION */}

        <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Saved Addresses
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Add delivery addresses for faster checkout
            </p>

          </div>

          {/* ADDRESS FORM */}

          <form
            onSubmit={handleAddAddress}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    name: e.target.value
                  })
                }
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    phone: e.target.value
                  })
                }
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />

            </div>

            <input
              type="text"
              placeholder="Full Address"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  address: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />

            <div className="grid md:grid-cols-3 gap-5">

              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    city: e.target.value
                  })
                }
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />

              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    state: e.target.value
                  })
                }
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />

              <input
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    pincode: e.target.value
                  })
                }
                className="px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                required
              />

            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              Add Address
            </button>

          </form>

          {/* ADDRESS LIST */}

          <div className="mt-8 space-y-4">

            {addresses.length === 0 ? (

              <div className="border border-red-300 bg-red-50 rounded-2xl p-6">

                <p className="text-red-600 font-medium">
                  No addresses added yet
                </p>

              </div>

            ) : (

              addresses.map((addr) => (

                <div
                  key={addr._id}
                  className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-emerald-50 shadow-sm"
                >

                  <p className="font-bold text-gray-800">
                    {addr.name}
                    {' '}
                    •
                    {' '}
                    {addr.phone}
                  </p>

                  <p className="text-gray-500 mt-1">
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

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  )
}