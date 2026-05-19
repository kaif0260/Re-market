import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'

import axios from '../api/axios'

import ProductCard from '../components/product/ProductCard'

import {
  FiSliders,
  FiX
} from 'react-icons/fi'

export default function Products() {

  const [searchParams] =
    useSearchParams()

  const query =
    searchParams.get('q') || ''

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [page, setPage] =
    useState(1)

  const [total, setTotal] =
    useState(0)

  const [filtersOpen, setFiltersOpen] =
    useState(false)

  const [filters, setFilters] =
    useState({

      category: '',

      brand: '',

      minPrice: '',

      maxPrice: '',

      sort: ''

    })

  useEffect(() => {

    setPage(1)

  }, [query, filters])

  useEffect(() => {

    const fetchProducts = async () => {

      setLoading(true)

      try {

        const params =
          new URLSearchParams()

        if (query) {

          params.append('q', query)

        } else {

          params.append('page', page)

        }

        params.append('limit', 12)

        if (filters.category) {

          params.append(
            'category',
            filters.category
          )

        }

        if (filters.brand) {

          params.append(
            'brand',
            filters.brand
          )

        }

        if (filters.minPrice) {

          params.append(
            'minPrice',
            filters.minPrice
          )

        }

        if (filters.maxPrice) {

          params.append(
            'maxPrice',
            filters.maxPrice
          )

        }

        if (filters.sort) {

          params.append(
            'sort',
            filters.sort
          )

        }

        const url = query

          ? `/products/search?${params}`

          : `/products?${params}`

        const { data } =
          await axios.get(url)

        setProducts(
          data.products || []
        )

        setTotal(
          data.total || 0
        )

      } catch (err) {

        setProducts([])

        setTotal(0)

      } finally {

        setLoading(false)

      }

    }

    fetchProducts()

  }, [query, page, filters])

  const totalPages =
    Math.ceil(total / 12) || 1

  const clearFilters = () => {

    setFilters({

      category: '',

      brand: '',

      minPrice: '',

      maxPrice: '',

      sort: ''

    })

  }

  return (

    <>

      <Helmet>

        <title>

          Products | Re-Market

        </title>

      </Helmet>

      <section className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8 sm:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TOP HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">

                Explore Products

              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">

                {query
                  ? `Search: "${query}"`
                  : 'All Products'}

              </h1>

              <p className="text-slate-600 dark:text-slate-300 mt-3">

                {total > 0
                  ? `${total} products available`
                  : 'Discover amazing products'}

              </p>

            </div>

            {/* MOBILE FILTER BUTTON */}

            <button
              onClick={() =>
                setFiltersOpen(
                  !filtersOpen
                )
              }
              className="lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm text-slate-800 dark:text-white font-semibold"
            >

              {filtersOpen ? (

                <FiX size={18} />

              ) : (

                <FiSliders size={18} />

              )}

              Filters

            </button>

          </div>

          <div className="flex flex-col lg:flex-row gap-7">

            {/* SIDEBAR */}

            <aside
              className={`${
                filtersOpen
                  ? 'block'
                  : 'hidden'
              } lg:block w-full lg:w-[290px] flex-shrink-0`}
            >

              <div className="sticky top-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg p-5">

                {/* TITLE */}

                <div className="flex items-center justify-between mb-6">

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">

                    Filters

                  </h3>

                  <button
                    onClick={clearFilters}
                    className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >

                    Clear

                  </button>

                </div>

                {/* SORT */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">

                    Sort By

                  </label>

                  <select
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters(f => ({
                        ...f,
                        sort:
                          e.target.value
                      }))
                    }
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  >

                    <option value="">
                      Newest
                    </option>

                    <option value="price_low">
                      Price: Low to High
                    </option>

                    <option value="price_high">
                      Price: High to Low
                    </option>

                    <option value="rating">
                      Rating
                    </option>

                    <option value="popular">
                      Popularity
                    </option>

                  </select>

                </div>

                {/* PRICE */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">

                    Price Range

                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <input
                      type="number"
                      placeholder="Min"
                      value={
                        filters.minPrice
                      }
                      onChange={(e) =>
                        setFilters(f => ({
                          ...f,
                          minPrice:
                            e.target.value
                        }))
                      }
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      value={
                        filters.maxPrice
                      }
                      onChange={(e) =>
                        setFilters(f => ({
                          ...f,
                          maxPrice:
                            e.target.value
                        }))
                      }
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                    />

                  </div>

                </div>

                {/* CATEGORY */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">

                    Category

                  </label>

                  <input
                    type="text"
                    placeholder="Search category"
                    value={
                      filters.category
                    }
                    onChange={(e) =>
                      setFilters(f => ({
                        ...f,
                        category:
                          e.target.value
                      }))
                    }
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  />

                </div>

                {/* BRAND */}

                <div>

                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">

                    Brand

                  </label>

                  <input
                    type="text"
                    placeholder="Search brand"
                    value={filters.brand}
                    onChange={(e) =>
                      setFilters(f => ({
                        ...f,
                        brand:
                          e.target.value
                      }))
                    }
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  />

                </div>

              </div>

            </aside>

            {/* PRODUCTS */}

            <div className="flex-1 min-w-0">

              {loading ? (

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

                  {[...Array(8)].map(
                    (_, i) => (

                    <div
                      key={i}
                      className="h-[340px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 animate-pulse"
                    />

                  ))}

                </div>

              ) : (

                <>

                  {/* GRID */}

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">

                    {products.map((p) => (

                      <ProductCard
                        key={p._id}
                        product={p}
                      />

                    ))}

                  </div>

                  {/* EMPTY */}

                  {products.length === 0 && (

                    <div className="text-center py-20">

                      <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-5 flex items-center justify-center">

                        <FiSliders
                          size={32}
                          className="text-slate-400"
                        />

                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">

                        No Products Found

                      </h3>

                      <p className="text-slate-500 dark:text-slate-400">

                        Try changing your filters.

                      </p>

                    </div>

                  )}

                  {/* PAGINATION */}

                  {totalPages > 1 && (

                    <div className="flex flex-wrap justify-center items-center gap-4 mt-12">

                      <button
                        onClick={() =>
                          setPage(p =>
                            Math.max(
                              1,
                              p - 1
                            )
                          )
                        }
                        disabled={
                          page === 1
                        }
                        className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold disabled:opacity-50"
                      >

                        Previous

                      </button>

                      <div className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold shadow-lg">

                        {page} / {totalPages}

                      </div>

                      <button
                        onClick={() =>
                          setPage(p =>
                            Math.min(
                              totalPages,
                              p + 1
                            )
                          )
                        }
                        disabled={
                          page >=
                          totalPages
                        }
                        className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold disabled:opacity-50"
                      >

                        Next

                      </button>

                    </div>

                  )}

                </>

              )}

            </div>

          </div>

        </div>

      </section>

    </>

  )

}