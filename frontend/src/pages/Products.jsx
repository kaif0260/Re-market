import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from '../api/axios'
import ProductCard from '../components/product/ProductCard'
import { FiSliders } from 'react-icons/fi'

export default function Products() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
  })

  useEffect(() => {
    setPage(1)
  }, [query, filters])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.append('q', query)
        else params.append('page', page)
        params.append('limit', 12)
        if (filters.category) params.append('category', filters.category)
        if (filters.brand) params.append('brand', filters.brand)
        if (filters.minPrice) params.append('minPrice', filters.minPrice)
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
        if (filters.sort) params.append('sort', filters.sort)

        const url = query ? `/products/search?${params}` : `/products?${params}`
        const { data } = await axios.get(url)
        setProducts(data.products || [])
        setTotal(data.total || 0)
      } catch (err) {
        setProducts([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [query, page, filters])

  const totalPages = Math.ceil(total / 12) || 1

  return (
    <>
      <Helmet>
        <title>Products | Re-Market</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - sidebar on desktop */}
          <aside className="md:w-56 flex-shrink-0">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-2 w-full py-2 px-4 border rounded-lg mb-4"
            >
              <FiSliders /> Filters
            </button>
            <div className={`${filtersOpen ? 'block' : 'hidden'} md:block bg-white border rounded-xl p-4 space-y-4`}>
              <h3 className="font-semibold text-gray-900">Sort</h3>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="popular">Popularity</option>
              </select>
              <h3 className="font-semibold text-gray-900 pt-2">Price</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Category"
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Brand"
                value={filters.brand}
                onChange={(e) => setFilters((f) => ({ ...f, brand: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => setFilters({ category: '', brand: '', minPrice: '', maxPrice: '', sort: '' })}
                className="w-full py-2 text-sm text-emerald-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              {query ? `Search: "${query}"` : 'All Products'} {total > 0 && `(${total})`}
            </h1>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
                {products.length === 0 && (
                  <p className="text-center text-gray-500 py-12">No products found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
