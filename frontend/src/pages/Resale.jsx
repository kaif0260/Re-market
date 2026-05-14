import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import ProductCard from '../components/product/ProductCard'
import { FiShield } from 'react-icons/fi'

export default function Resale() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get('/resale')
        setListings(data.listings || [])
      } catch (err) {
        setListings([])
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Resale Marketplace
            <span className="text-sm font-normal bg-amber-100 text-amber-800 px-2 py-1 rounded flex items-center gap-1">
              <FiShield /> Verified purchase only
            </span>
          </h1>
          <p className="text-gray-500 mt-1">Buy from sellers who purchased on Re-Market. Every listing is verified.</p>
        </div>
        <Link to="/resale/create" className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700">
          Sell an item
        </Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No resale listings yet.</p>
          <Link to="/resale/create" className="text-emerald-600 font-medium mt-2 inline-block">List your first item</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <ProductCard
              key={listing._id}
              product={{
                _id: listing._id,
                name: listing.originalProduct?.name,
                brand: listing.originalProduct?.brand,
                images: listing.images,
                image: listing.images?.[0],
                resalePrice: listing.resalePrice,
                verifiedPurchase: listing.verifiedPurchase,
              }}
              isResale
            />
          ))}
        </div>
      )}
    </div>
  )
}
