import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    searchQuery: '',
    filters: {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      sort: '',
    },
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = {
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        sort: '',
      }
    },
  },
})

export const { setSearchQuery, setFilters, resetFilters } = productSlice.actions
export default productSlice.reducer
