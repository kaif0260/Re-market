import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'

import axios from '../../api/axios'

/* =========================================
   FETCH CART
========================================= */

export const fetchCart =
  createAsyncThunk(

    'cart/fetchCart',

    async (_, thunkAPI) => {

      try {

        const { data } =
          await axios.get('/cart')

        return data.cart

      } catch (err) {

        return thunkAPI.rejectWithValue(

          err.response?.data?.message ||

          'Failed to fetch cart'

        )

      }

    }

  )

/* =========================================
   ADD TO CART
========================================= */

export const addToCart =
  createAsyncThunk(

    'cart/addToCart',

    async (product, thunkAPI) => {

      try {

        const { data } =
          await axios.post(

            '/cart',

            {
              productId:
                product._id,

              quantity:
                product.quantity || 1
            }

          )

        return data.cart

      } catch (err) {

        return thunkAPI.rejectWithValue(

          err.response?.data?.message ||

          'Failed to add product'

        )

      }

    }

  )

/* =========================================
   UPDATE CART ITEM
========================================= */

export const updateCartItem =
  createAsyncThunk(

    'cart/updateCartItem',

    async (
      {
        itemId,
        quantity
      },
      thunkAPI
    ) => {

      try {

        const { data } =
          await axios.put(

            `/cart/${itemId}`,

            { quantity }

          )

        return data.cart

      } catch (err) {

        return thunkAPI.rejectWithValue(

          err.response?.data?.message ||

          'Failed to update cart'

        )

      }

    }

  )

/* =========================================
   REMOVE FROM CART
========================================= */

export const removeFromCart =
  createAsyncThunk(

    'cart/removeFromCart',

    async (
      itemId,
      thunkAPI
    ) => {

      try {

        const { data } =
          await axios.delete(

            `/cart/${itemId}`

          )

        return data.cart

      } catch (err) {

        return thunkAPI.rejectWithValue(

          err.response?.data?.message ||

          'Failed to remove item'

        )

      }

    }

  )

/* =========================================
   CLEAR CART
========================================= */

export const clearCart =
  createAsyncThunk(

    'cart/clearCart',

    async (_, thunkAPI) => {

      try {

        await axios.delete('/cart')

        return {
          items: []
        }

      } catch (err) {

        return thunkAPI.rejectWithValue(

          err.response?.data?.message ||

          'Failed to clear cart'

        )

      }

    }

  )

/* =========================================
   INITIAL STATE
========================================= */

const initialState = {

  cart: {
    items: []
  },

  loading: false,

  error: null

}

/* =========================================
   SLICE
========================================= */

const cartSlice =
  createSlice({

    name: 'cart',

    initialState,

    reducers: {},

    extraReducers: builder => {

      builder

        /* ================================
           FETCH CART
        ================================ */

        .addCase(
          fetchCart.pending,

          state => {

            state.loading = true

            state.error = null

          }
        )

        .addCase(
          fetchCart.fulfilled,

          (
            state,
            action
          ) => {

            state.loading = false

            state.cart =
              action.payload

          }
        )

        .addCase(
          fetchCart.rejected,

          (
            state,
            action
          ) => {

            state.loading = false

            state.error =
              action.payload

          }
        )

        /* ================================
           ADD TO CART
        ================================ */

        .addCase(
          addToCart.pending,

          state => {

            state.loading = true

          }
        )

        .addCase(
          addToCart.fulfilled,

          (
            state,
            action
          ) => {

            state.loading = false

            state.cart =
              action.payload

          }
        )

        .addCase(
          addToCart.rejected,

          (
            state,
            action
          ) => {

            state.loading = false

            state.error =
              action.payload

          }
        )

        /* ================================
           UPDATE CART
        ================================ */

        .addCase(
          updateCartItem.fulfilled,

          (
            state,
            action
          ) => {

            state.cart =
              action.payload

          }
        )

        /* ================================
           REMOVE ITEM
        ================================ */

        .addCase(
          removeFromCart.fulfilled,

          (
            state,
            action
          ) => {

            state.cart =
              action.payload

          }
        )

        /* ================================
           CLEAR CART
        ================================ */

        .addCase(
          clearCart.fulfilled,

          (
            state,
            action
          ) => {

            state.cart =
              action.payload

          }
        )

    }

  })

/* =========================================
   EXPORT
========================================= */

export default
cartSlice.reducer