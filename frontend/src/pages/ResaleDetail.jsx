import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../api/axios'
import { useSelector } from 'react-redux'
import { FiShield } from 'react-icons/fi'

export default function ResaleDetail() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/resale/${id}`)
        setListing(data.listing)
      } catch (err) {
        setListing(null)
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Listing not found.</p>
        <Link to="/resale" className="text-emerald-600 mt-4 inline-block">Back to resale</Link>
      </div>
    )
  }

  const product = listing.originalProduct || {}
  const images = listing.images?.length ? listing.images : ['https://via.placeholder.com/600']

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/resale" className="text-emerald-600 text-sm mb-4 inline-block">← Back to resale</Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
            <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {listing.verifiedPurchase && (
            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-sm">
              <FiShield /> Verified purchase
            </span>
          )}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Condition: {listing.condition?.replace(/_/g, ' ')}</p>
          <p className="text-2xl font-bold text-emerald-600 mt-4">₹{listing.resalePrice?.toLocaleString()}</p>
          <p className="mt-4 text-gray-600">{listing.description}</p>
          <p className="mt-4 text-sm text-gray-500">Sold by verified Re-Market buyer</p>
          {listing.status === 'approved' && listing.seller?._id && (
            <Link
              to="/checkout"
              state={{ resaleListingId: listing._id }}
              className="mt-6 inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
            >
              Buy now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
