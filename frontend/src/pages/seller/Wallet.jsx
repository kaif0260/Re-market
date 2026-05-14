import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

export default function SellerWallet() {
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await axios.get('/seller/wallet')
        setWallet(data.wallet)
      } catch (err) {
        setWallet(null)
      } finally {
        setLoading(false)
      }
    }
    fetchWallet()
  }, [])

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12"><div className="h-32 bg-gray-100 rounded-xl animate-pulse" /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/seller/dashboard" className="text-emerald-600 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet</h1>
      <div className="bg-white border rounded-xl p-6">
        <p className="text-gray-500">Available balance</p>
        <p className="text-3xl font-bold text-emerald-600">₹{wallet?.balance?.toLocaleString() ?? 0}</p>
        <p className="text-sm text-gray-500 mt-2">Total earnings: ₹{wallet?.totalEarnings?.toLocaleString() ?? 0}</p>
        <p className="text-sm text-gray-500">Total withdrawn: ₹{wallet?.totalWithdrawn?.toLocaleString() ?? 0}</p>
      </div>
    </div>
  )
}
