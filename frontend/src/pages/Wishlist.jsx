import { useEffect, useState } from 'react'
import axios from '../api/axios'
import ProductCard from '../components/product/ProductCard'
import { toast } from 'react-toastify'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get('/wishlist')
        setWishlist(data.wishlist?.products || [])
      } catch (err) {
        setWishlist([])
      } finally {
        setLoading(false)
      }
    }
    fetchWishlist()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="text-gray-500 mt-2">Save items you like for later.</p>
        <a href="/products" className="inline-block mt-6 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700">
          Browse products
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}
