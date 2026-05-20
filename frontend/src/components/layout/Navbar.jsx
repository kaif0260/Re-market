import {
  useState,
  useEffect,
  useRef
} from 'react'

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'

import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiAlertCircle
} from 'react-icons/fi'

import {
  useSelector,
  useDispatch
} from 'react-redux'

import {
  logout as logoutAction
} from '../../store/slices/authSlice'

import './navbar.css'

export default function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [profileOpen, setProfileOpen] =
    useState(false)

  const [theme, setTheme] =
    useState('light')

  const [search, setSearch] =
    useState('')

  const dropdownRef =
    useRef(null)

  const navigate =
    useNavigate()

  const location =
    useLocation()

  const dispatch =
    useDispatch()

  const {
    isAuthenticated,
    user
  } = useSelector(
    (state) => state.auth
  )

  const { cart } =
    useSelector(
      (state) => state.cart
    )

  const cartCount =
    cart?.items?.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    ) || 0

  /* THEME */

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        'theme'
      )

    const systemDark =
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

    const initialTheme =
      savedTheme ||
      (
        systemDark
          ? 'dark'
          : 'light'
      )

    setTheme(initialTheme)

  }, [])

  useEffect(() => {

    localStorage.setItem(
      'theme',
      theme
    )

    document.documentElement.dataset.theme =
      theme

    if (theme === 'dark') {

      document.documentElement.classList.add(
        'dark'
      )

    } else {

      document.documentElement.classList.remove(
        'dark'
      )

    }

  }, [theme])

  /* CLOSE DROPDOWN */

  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {

          setProfileOpen(false)

        }

      }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )

  }, [])

  /* CLOSE ON ROUTE */

  useEffect(() => {

    setMobileOpen(false)

    setProfileOpen(false)

  }, [location.pathname])

  /* BODY LOCK */

  useEffect(() => {

    if (mobileOpen) {

      document.body.style.overflow =
        'hidden'

    } else {

      document.body.style.overflow =
        ''

    }

    return () => {

      document.body.style.overflow =
        ''

    }

  }, [mobileOpen])

  /* SEARCH */

  const handleSearch = (e) => {

    e.preventDefault()

    if (!search.trim()) return

    navigate(
      `/products?q=${encodeURIComponent(search)}`
    )

  }

  /* LOGOUT */

  const handleLogout = () => {

    dispatch(logoutAction())

    localStorage.removeItem('token')

    localStorage.removeItem('user')

    navigate('/')

  }

  /* ACTIVE LINK */

  const isActive = (path) => {

    return (
      location.pathname === path
    )

  }

  return (

    <header className="navbar">

      <div className="navbar-container">

        {/* LEFT */}

        <div className="nav-left">

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
          >

            {
              mobileOpen
                ? <FiX />
                : <FiMenu />
            }

          </button>

          {/* LOGO */}

          <Link
            to="/"
            className="logo"
          >

            <div className="logo-box">

              <span className="logo-r">

                R

              </span>

            </div>

            <div className="logo-content">

              <span className="logo-title">

                Re-Market

              </span>

              <span className="logo-subtitle">

                Smart Marketplace

              </span>

            </div>

          </Link>

        </div>

        {/* CENTER */}

        <div className="nav-center">

          {/* DESKTOP NAV */}

          <div className="desktop-nav">

            <Link
              to="/products"
              className={
                isActive('/products')
                  ? 'active'
                  : ''
              }
            >

              Products

            </Link>

            <Link
              to="/resale"
              className={
                isActive('/resale')
                  ? 'active'
                  : ''
              }
            >

              Resale

            </Link>

            <Link
              to="/deals"
              className={
                isActive('/deals')
                  ? 'active'
                  : ''
              }
            >

              Deals

            </Link>

          </div>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="search-bar"
          >

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </form>

        </div>

        {/* RIGHT */}

        <div className="nav-right">

          {/* THEME */}

          <button
            className="icon-btn desktop-only"
            onClick={() =>

              setTheme(

                theme === 'dark'
                  ? 'light'
                  : 'dark'

              )

            }
          >

            {
              theme === 'dark'
                ? <FiSun />
                : <FiMoon />
            }

          </button>

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="icon-btn desktop-only"
          >

            <FiHeart />

          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="icon-btn desktop-only cart-btn"
          >

            <FiShoppingCart />

            {
              cartCount > 0 && (

                <span className="cart-badge">

                  {cartCount}

                </span>

              )
            }

          </Link>

          {/* LOGIN / PROFILE */}

          {
            !isAuthenticated ? (

              <Link
                to="/login"
                className="login-btn"
              >

                Login

              </Link>

            ) : (

              <div
                className="profile-wrapper"
                ref={dropdownRef}
              >

                <button
                  className="profile-btn"
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                >

                  <FiUser />

                  <FiChevronDown />

                </button>

                {
                  profileOpen && (

                    <div className="profile-dropdown">

                      {
                        (
                          user?.role === 'admin' ||
                          user?.role === 'seller'
                        ) && (

                          <Link
                            to={
                              user?.role === 'admin'
                                ? '/admin/dashboard'
                                : '/seller/dashboard'
                            }
                            className="dropdown-item"
                          >

                            {
                              user?.role === 'admin'
                                ? 'Admin Dashboard'
                                : 'Seller Dashboard'
                            }

                          </Link>

                        )
                      }

                      <Link
                        to="/profile"
                        className="dropdown-item"
                      >

                        Profile

                      </Link>

                      <Link
                        to="/orders"
                        className="dropdown-item"
                      >

                        Orders

                      </Link>

                      <Link
                        to="/wishlist"
                        className="dropdown-item"
                      >

                        Wishlist

                      </Link>

                      <Link
                        to="/complaints"
                        className="dropdown-item"
                      >

                        <FiAlertCircle />

                        Complaints

                      </Link>

                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout-btn"
                      >

                        Logout

                      </button>

                    </div>

                  )
                }

              </div>

            )
          }

        </div>

      </div>

      {/* MOBILE OVERLAY */}

      <div
        className={`mobile-overlay ${
          mobileOpen
            ? 'show'
            : ''
        }`}
        onClick={() =>
          setMobileOpen(false)
        }
      />

      {/* MOBILE DRAWER */}

      <div
        className={`mobile-drawer ${
          mobileOpen
            ? 'open'
            : ''
        }`}
      >

        <Link to="/products">
          Products
        </Link>

        <Link to="/resale">
          Resale
        </Link>

        <Link to="/deals">
          Deals
        </Link>

        <Link to="/wishlist">
          Wishlist
        </Link>

        <Link to="/cart">
          Cart
        </Link>

      </div>

    </header>

  )

}