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

import {
  useSelector,
  useDispatch
} from 'react-redux'

import {
  logout as logoutAction
} from '../../store/slices/authSlice'

import {
  setSearchQuery
} from '../../store/slices/productSlice'

import './navbar.css'

export default function Navbar() {

  const [search, setSearch] =
    useState('')

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [userMenuOpen, setUserMenuOpen] =
    useState(false)

  const [theme, setTheme] =
    useState('light')

  const [scrolled, setScrolled] =
    useState(false)

  const [searchFocused, setSearchFocused] =
    useState(false)

  const dropdownRef =
    useRef(null)

  const dispatch =
    useDispatch()

  const navigate =
    useNavigate()

  const location =
    useLocation()

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

  /* SCROLL */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 12
      )

    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>

      window.removeEventListener(
        'scroll',
        handleScroll
      )

  }, [])

  /* CLOSE MENUS ON ROUTE CHANGE */

  useEffect(() => {

    setMobileOpen(false)

    setUserMenuOpen(false)

  }, [location.pathname])

  /* CLICK OUTSIDE */

  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {

          setUserMenuOpen(false)

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

  /* ESC CLOSE */

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === 'Escape') {

        setUserMenuOpen(false)

        setMobileOpen(false)

      }

    }

    document.addEventListener(
      'keydown',
      handleEsc
    )

    return () =>

      document.removeEventListener(
        'keydown',
        handleEsc
      )

  }, [])

  /* BODY SCROLL LOCK */

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

  const toggleTheme = () => {

    setTheme(prev =>

      prev === 'dark'
        ? 'light'
        : 'dark'

    )

  }

  const handleSearch = (e) => {

    e.preventDefault()

    const query =
      search.trim()

    if (!query) return

    dispatch(
      setSearchQuery(query)
    )

    navigate(
      `/products?q=${encodeURIComponent(query)}`
    )

    setSearch('')

    setMobileOpen(false)

  }

  const handleLogout = () => {

    setUserMenuOpen(false)

    setMobileOpen(false)

    dispatch(logoutAction())

    localStorage.removeItem(
      'token'
    )

    localStorage.removeItem(
      'user'
    )

    setTimeout(() => {

      navigate('/')

    }, 100)

  }

  const isActive = (path) =>

    location.pathname === path ||

    (
      path === '/resale' &&
      location.pathname.startsWith(
        '/resale'
      )
    )

  return (

    <header
      className={`app-navbar ${
        scrolled
          ? 'scrolled'
          : ''
      } ${
        mobileOpen
          ? 'mobile-open'
          : ''
      }`}
    >

      <div className="navbar-inner container mx-auto">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-brand"
        >

          <span className="logo-mark">

            R

          </span>

          <span className="logo-text">

            Re-Market

          </span>

        </Link>

        {/* DESKTOP LINKS */}

        <div className="nav-links hidden lg:flex">

          <Link
            to="/products"
            className={`nav-link ${
              isActive('/products')
                ? 'active'
                : ''
            }`}
          >

            Products

          </Link>

          <Link
            to="/resale"
            className={`nav-link ${
              isActive('/resale')
                ? 'active'
                : ''
            }`}
          >

            Resale

          </Link>

          <Link
            to="/deals"
            className={`nav-link ${
              isActive('/deals')
                ? 'active'
                : ''
            }`}
          >

            Deals

          </Link>

        </div>

        {/* SEARCH */}

        <form
          onSubmit={handleSearch}
          className={`search-bar hidden lg:flex lg:flex-1 lg:max-w-md transition-all duration-300 ${
            searchFocused
              ? 'ring-2 ring-emerald-500/20'
              : ''
          }`}
        >

          <FiSearch
            className="search-icon"
            size={18}
          />

          <input
            type="search"
            value={search}
            onFocus={() =>
              setSearchFocused(true)
            }
            onBlur={() =>
              setSearchFocused(false)
            }
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search products..."
            className="search-input"
          />

        </form>

        {/* ACTIONS */}

        <div className="nav-actions">

          {/* THEME */}

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >

            {theme === 'light'
              ? (
                <FiMoon size={18} />
              )
              : (
                <FiSun size={18} />
              )}

          </button>

          {/* CART */}

          <Link
            to="/cart"
            className="icon-btn relative"
          >

            <FiShoppingCart size={19} />

            {cartCount > 0 && (

              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center px-1">

                {cartCount}

              </span>

            )}

          </Link>

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="icon-btn"
          >

            <FiHeart size={18} />

          </Link>

          {/* USER */}

          {isAuthenticated ? (

            <div
              className="relative"
              ref={dropdownRef}
            >

              <button
                type="button"
                className="user-trigger"
                onClick={() =>

                  setUserMenuOpen(
                    prev => !prev
                  )

                }
              >

                <FiUser size={17} />

                <span className="user-label">

                  {
                    user?.name?.split(' ')[0] ||
                    'Profile'
                  }

                </span>

                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    userMenuOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />

              </button>

              {userMenuOpen && (

                <div className="user-dropdown animate-in fade-in zoom-in-95 duration-200">

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

                  {user?.role ===
                    'seller' && (

                    <Link
                      to="/seller/dashboard"
                      className="dropdown-item"
                    >

                      Seller Dashboard

                    </Link>

                  )}

                  {user?.role ===
                    'admin' && (

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

              <Link
                to="/login"
                className="btn-outline"
              >

                Login

              </Link>

              <Link
                to="/register"
                className="btn-primary"
              >

                Join Free

              </Link>

            </div>

          )}

          {/* MOBILE TOGGLE */}

          <button
            type="button"
            className="mobile-toggle lg:hidden"
            onClick={() =>

              setMobileOpen(
                prev => !prev
              )

            }
          >

            {mobileOpen
              ? (
                <FiX size={22} />
              )
              : (
                <FiMenu size={22} />
              )}

          </button>

        </div>

      </div>

      {/* MOBILE PANEL */}

      <>

        {mobileOpen && (

          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          />

        )}

        <div
          className={`mobile-panel ${
            mobileOpen
              ? 'open'
              : ''
          }`}
        >

          {/* MOBILE SEARCH */}

          <form
            onSubmit={handleSearch}
            className="mobile-search"
          >

            <FiSearch
              className="search-icon"
              size={18}
            />

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search products..."
              className="search-input"
            />

          </form>

          {/* MOBILE LINKS */}

          <div className="mobile-links">

            <Link
              to="/products"
              className="mobile-link"
            >

              Products

            </Link>

            <Link
              to="/resale"
              className="mobile-link"
            >

              Resale

            </Link>

            <Link
              to="/deals"
              className="mobile-link"
            >

              Deals

            </Link>

            {isAuthenticated ? (

              <>

                <Link
                  to="/profile"
                  className="mobile-link"
                >

                  Profile

                </Link>

                <Link
                  to="/orders"
                  className="mobile-link"
                >

                  Orders

                </Link>

                <Link
                  to="/cart"
                  className="mobile-link"
                >

                  Cart ({cartCount})

                </Link>

                {user?.role ===
                  'seller' && (

                  <Link
                    to="/seller/dashboard"
                    className="mobile-link"
                  >

                    Seller Dashboard

                  </Link>

                )}

                {user?.role ===
                  'admin' && (

                  <Link
                    to="/admin/dashboard"
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

            ) : (

              <div className="flex flex-col gap-3 mt-3">

                <Link
                  to="/login"
                  className="btn-outline text-center"
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  className="btn-primary text-center"
                >

                  Join Free

                </Link>

              </div>

            )}

          </div>

        </div>

      </>

    </header>

  )

}