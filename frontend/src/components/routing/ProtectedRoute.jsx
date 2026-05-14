import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.auth
  )

  const location = useLocation()

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">
          Loading...
        </div>
      </div>
    )
  }

  // Not logged in
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  // Admin routes only
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Seller routes only
  if (requiredRole === 'seller' && user?.role !== 'seller') {
    return <Navigate to="/" replace />
  }

  // Customer routes only
  if (requiredRole === 'customer' && user?.role !== 'customer') {
    return <Navigate to="/" replace />
  }

  return children
}