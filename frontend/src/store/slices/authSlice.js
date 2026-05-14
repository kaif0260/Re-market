import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {

    try {

      const token =
        localStorage.getItem('token')

      if (!token)
        return rejectWithValue(
          'No token'
        )

      const { data } =
        await axios.get(
          '/auth/profile'
        )

      return data.user

    } catch (err) {

      localStorage.clear()

      sessionStorage.clear()

      return rejectWithValue(
        err.response?.data?.message ||
        'Failed to load user'
      )

    }

  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData,
    { rejectWithValue }
  ) => {

    try {

      const { data } =
        await axios.post(
          '/auth/register',
          userData
        )

      return data

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message ||
        'Registration failed'
      )

    }

  }
)

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (
    { email },
    { rejectWithValue }
  ) => {

    try {

      const { data } =
        await axios.post(
          '/auth/resend-otp',
          { email }
        )

      return data

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message ||
        'Failed to resend OTP'
      )

    }

  }
)

export const forgotPassword =
  createAsyncThunk(
    'auth/forgotPassword',
    async (
      { email },
      { rejectWithValue }
    ) => {

      try {

        const { data } =
          await axios.post(
            '/auth/forgot-password',
            { email }
          )

        return data

      } catch (err) {

        return rejectWithValue(
          err.response?.data?.message ||
          'Failed to send reset email'
        )

      }

    }
  )

export const resetPassword =
  createAsyncThunk(
    'auth/resetPassword',
    async (
      { token, password },
      { rejectWithValue }
    ) => {

      try {

        const { data } =
          await axios.post(
            '/auth/reset-password',
            {
              token,
              password
            }
          )

        return data

      } catch (err) {

        return rejectWithValue(
          err.response?.data?.message ||
          'Failed to reset password'
        )

      }

    }
  )

export const verifyOTP =
  createAsyncThunk(
    'auth/verifyOTP',
    async (
      { email, otp },
      { rejectWithValue }
    ) => {

      try {

        const { data } =
          await axios.post(
            '/auth/verify-otp',
            {
              email,
              otp
            }
          )

        localStorage.clear()

        sessionStorage.clear()

        localStorage.setItem(
          'token',
          data.token
        )

        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        )

        window.location.href = '/'

        return data

      } catch (err) {

        return rejectWithValue(
          err.response?.data?.message ||
          'Verification failed'
        )

      }

    }
  )

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password },
    { rejectWithValue }
  ) => {

    try {

      localStorage.clear()

      sessionStorage.clear()

      const { data } =
        await axios.post(
          '/auth/login',
          {
            email,
            password
          }
        )

      localStorage.setItem(
        'token',
        data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      setTimeout(() => {

        window.location.href = '/'

      }, 100)

      return data

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed'

      const networkFail =
        err.code === 'ERR_NETWORK' ||
        err.message ===
          'Network Error' ||
        !err.response

      return rejectWithValue(
        networkFail &&
          !err.response
          ? 'Server tak connect nahi ho pa raha. Backend aur MongoDB check karein.'
          : msg
      )

    }

  }
)

const authSlice = createSlice({

  name: 'auth',

  initialState: {

    user:
      JSON.parse(
        localStorage.getItem('user')
      ) || null,

    token:
      localStorage.getItem('token') ||
      null,

    isAuthenticated:
      !!localStorage.getItem('token'),

    loading: false,

    error: null,

  },

  reducers: {

    logout: (state) => {

      state.user = null

      state.token = null

      state.isAuthenticated = false

      state.error = null

      localStorage.clear()

      sessionStorage.clear()

      setTimeout(() => {

        window.location.href = '/'

      }, 100)

    },

    clearError: (state) => {

      state.error = null

    },

  },

  extraReducers: (builder) => {

    builder

      // LOAD USER

      .addCase(
        loadUser.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        loadUser.fulfilled,
        (state, action) => {

          state.loading = false

          state.user =
            action.payload

          state.isAuthenticated =
            true

        }
      )

      .addCase(
        loadUser.rejected,
        (state) => {

          state.loading = false

          state.user = null

          state.isAuthenticated =
            false

        }
      )

      // LOGIN

      .addCase(
        login.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.loading = false

          state.user =
            action.payload.user

          state.token =
            action.payload.token

          state.isAuthenticated =
            true

          state.error = null

        }
      )

      .addCase(
        login.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

      // REGISTER

      .addCase(
        register.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        register.fulfilled,
        (state) => {

          state.loading = false

          state.error = null

        }
      )

      .addCase(
        register.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

      // VERIFY OTP

      .addCase(
        verifyOTP.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        verifyOTP.fulfilled,
        (state, action) => {

          state.loading = false

          state.user =
            action.payload.user

          state.token =
            action.payload.token

          state.isAuthenticated =
            true

          state.error = null

        }
      )

      .addCase(
        verifyOTP.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

      // RESEND OTP

      .addCase(
        resendOTP.pending,
        (state) => {

          state.loading = true

        }
      )

      .addCase(
        resendOTP.fulfilled,
        (state) => {

          state.loading = false

        }
      )

      .addCase(
        resendOTP.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

      // FORGOT PASSWORD

      .addCase(
        forgotPassword.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        forgotPassword.fulfilled,
        (state) => {

          state.loading = false

        }
      )

      .addCase(
        forgotPassword.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

      // RESET PASSWORD

      .addCase(
        resetPassword.pending,
        (state) => {

          state.loading = true

          state.error = null

        }
      )

      .addCase(
        resetPassword.fulfilled,
        (state) => {

          state.loading = false

        }
      )

      .addCase(
        resetPassword.rejected,
        (state, action) => {

          state.loading = false

          state.error =
            action.payload

        }
      )

  },

})

export const {
  logout,
  clearError
} = authSlice.actions

export default authSlice.reducer