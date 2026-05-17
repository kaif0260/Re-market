import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown
} from 'react-icons/fi'

import './navbar.css'

import { logout as logoutAction } from '../../store/slices/authSlice'
import { setSearchQuery } from '../../store/slices/productSlice'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('light')

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'

    setTheme(savedTheme)

    document.documentElement.dataset.theme = savedTheme

    document.documentElement.classList.toggle(
      'dark',
      savedTheme === 'dark'
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.dataset.theme = theme

    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    const query = search.trim()

    if (!query) return

    dispatch(setSearchQuery(query))

    navigate(`/products?q=${encodeURIComponent(query)}`)

    setSearch('')

    setMobileOpen(false)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleLogout = () => {
    dispatch(logoutAction())

    localStorage.clear()

    sessionStorage.clear()

    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }

  const isActive = (path) =>
    location.pathname === path ||
    (path === '/resale' && location.pathname.startsWith('/resale'))

  return (
    <header
      className={`app-navbar ${scrolled ? 'scrolled' : ''}`}
      data-theme={theme}
    >
      <div className="navbar-inner container mx-auto">
        <Link to="/" className="navbar-brand">
          <span className="logo-mark">R</span>
          <span className="logo-text">Re-Market</span>
        </Link>

        <div className="nav-links hidden lg:flex">
          <Link
            to="/products"
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
          >
            Products
          </Link>

          <Link
            to="/resale"
            className={`nav-link ${isActive('/resale') ? 'active' : ''}`}
          >
            Resale
          </Link>

          <Link
            to="/deals"
            className={`nav-link ${isActive('/deals') ? 'active' : ''}`}
          >
            Deals
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="search-bar hidden lg:flex lg:flex-1 lg:max-w-md"
        >
          <FiSearch className="search-icon" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search-input"
          />
        </form>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          <Link to="/cart" className="icon-btn relative">
            <FiShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="icon-btn">
            <FiHeart size={18} />
          </Link>

          {isAuthenticated ? (
            <div className="user-menu-wrapper relative">
              <button
                type="button"
                className="user-trigger"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <FiUser size={18} />

                <span className="user-label">
                  {user?.name?.split(' ')[0] || 'Profile'}
                </span>

                <FiChevronDown size={14} />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>

                  <Link to="/orders" className="dropdown-item">
                    Orders
                  </Link>

                  {user?.role === 'seller' && (
                    <Link
                      to="/seller/dashboard"
                      className="dropdown-item"
                    >
                      Seller Dashboard
                    </Link>
                  )}

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-item"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    type="button"
                    className="dropdown-item danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn-outline">
                Login
              </Link>

              <Link to="/register" className="btn-primary">
                Join Free
              </Link>
            </div>
          )}

          <button
            type="button"
            className="mobile-toggle lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearch} className="mobile-search">
          <FiSearch className="search-icon" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search-input"
          />
        </form>

        <div className="mobile-links">
          <Link to="/products" onClick={closeMobileMenu} className="mobile-link">
            Products
          </Link>

          <Link to="/resale" onClick={closeMobileMenu} className="mobile-link">
            Resale
          </Link>

          <Link to="/deals" onClick={closeMobileMenu} className="mobile-link">
            Deals
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/profile" onClick={closeMobileMenu} className="mobile-link">
                Profile
              </Link>

              <Link to="/orders" onClick={closeMobileMenu} className="mobile-link">
                Orders
              </Link>

              <Link to="/cart" onClick={closeMobileMenu} className="mobile-link">
                Cart ({cartCount})
              </Link>

              {user?.role === 'seller' && (
                <Link
                  to="/seller/dashboard"
                  onClick={closeMobileMenu}
                  className="mobile-link"
                >
                  Seller Dashboard
                </Link>
              )}

              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMobileMenu}
                  className="mobile-link"
                >
                  Admin Panel
                </Link>
              )}

              <button
                type="button"
                className="btn-outline w-full mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}