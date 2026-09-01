import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import Logo from './Logo'
import { navLinks, shopCategories } from '../data/siteData'
import { useCart } from '../context/CartContext'

function navHref(link) {
  if (link.label === 'Home') return '/'
  if (link.label === 'Shop') return '/shop'
  return '/'
}

function categoryHref(name) {
  return `/shop?category=${encodeURIComponent(name)}`
}

const MEGA_COLS = 5

function ShopMegaMenu({ open }) {
  return (
    <div
      className={`absolute left-1/2 top-full w-[1180px] max-w-[94vw] -translate-x-1/2 rounded-md border border-neutral-200 bg-white p-8 text-ink shadow-2xl transition-all duration-200 ease-out ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0'
      }`}
    >
      <div className="grid grid-cols-5 gap-x-10 gap-y-10">
        {shopCategories.map((cat, i) => (
          <div key={cat.label} className={i % MEGA_COLS !== 0 ? 'border-l border-neutral-200 pl-8' : ''}>
            <Link
              to={categoryHref(cat.label)}
              className="block border-b border-neutral-200 pb-2 text-[15px] font-semibold text-ink hover:text-brand-goldDark"
            >
              {cat.label}
            </Link>
            <ul className="mt-3 flex flex-col gap-2">
              {cat.subcategories.map((sub) => (
                <li key={sub}>
                  <Link to={categoryHref(sub)} className="text-sm font-medium text-ink hover:text-brand-goldDark">
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const OPEN_DELAY = 80
const CLOSE_DELAY = 250

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [openMobileCat, setOpenMobileCat] = useState(null)
  const [megaOpen, setMegaOpen] = useState(false)
  const hoverTimer = useRef(null)
  const { items } = useCart()
  const cartCount = items.reduce((s, i) => s + i.qty, 0)

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const openMega = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setMegaOpen(true), OPEN_DELAY)
  }
  const closeMega = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setMegaOpen(false), CLOSE_DELAY)
  }

  return (
    <header className="relative z-40 border-b border-neutral-200 bg-white text-ink">
      <div className="container-x relative flex items-center justify-between gap-6 py-4">
        <button
          type="button"
          className="text-2xl lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium text-neutral-500 lg:flex">
          {navLinks.map((link) =>
            link.label === 'Shop' ? (
              <div
                key={link.label}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <Link to="/shop" className="flex items-center gap-1.5 py-2 transition-colors hover:text-ink">
                  {link.label}
                  <FiChevronDown className="text-xs" />
                </Link>
              </div>
            ) : (
              <Link
                key={link.label}
                to={navHref(link)}
                className="flex items-center gap-1.5 py-2 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden max-w-md flex-1 items-center lg:flex">
          <div className="flex w-full items-center overflow-hidden rounded border border-neutral-200">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2.5 text-sm text-ink outline-none"
            />
            <button
              type="button"
              className="flex items-center justify-center bg-brand-gold px-4 py-2.5 text-white"
              aria-label="Search"
            >
              <FiSearch />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/sign-in" className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-neutral-500">Login / Signup</span>
            <span className="font-semibold text-ink">My account</span>
          </Link>
          <span className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <Link to="/cart" className="flex items-center gap-2">
            <span className="relative text-xl text-neutral-700">
              <FiShoppingCart />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </span>
            <span className="font-semibold text-ink">Cart</span>
          </Link>
        </div>

        <div onMouseEnter={openMega} onMouseLeave={closeMega}>
          <ShopMegaMenu open={megaOpen} />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center overflow-hidden rounded border border-neutral-200">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-sm text-ink outline-none"
            />
            <button type="button" className="flex items-center justify-center bg-brand-gold px-4 py-2.5 text-white">
              <FiSearch />
            </button>
          </div>
          <ul className="flex flex-col gap-1 text-sm font-medium text-neutral-600">
            {navLinks.map((link) =>
              link.label === 'Shop' ? (
                <li key={link.label} className="border-b border-neutral-100 py-2">
                  <div className="flex items-center justify-between">
                    <Link to="/shop" onClick={() => setMobileOpen(false)} className="font-semibold text-ink">
                      Shop
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle Shop categories"
                      onClick={() => setMobileShopOpen((v) => !v)}
                      className="p-1 text-neutral-400"
                    >
                      <FiChevronDown className={`transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {mobileShopOpen && (
                    <div className="mt-2 flex flex-col gap-3 border-l border-neutral-200 pl-3">
                      {shopCategories.map((cat) => (
                        <div key={cat.label}>
                          <div className="flex items-center justify-between">
                            <Link
                              to={categoryHref(cat.label)}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm font-semibold text-ink"
                            >
                              {cat.label}
                            </Link>
                            {cat.subcategories.length > 0 && (
                              <button
                                type="button"
                                aria-label={`Toggle ${cat.label} subcategories`}
                                onClick={() => setOpenMobileCat(openMobileCat === cat.label ? null : cat.label)}
                                className="p-1 text-neutral-400"
                              >
                                <FiChevronDown
                                  className={`text-xs transition-transform ${openMobileCat === cat.label ? 'rotate-180' : ''}`}
                                />
                              </button>
                            )}
                          </div>
                          {cat.subcategories.length > 0 && openMobileCat === cat.label && (
                            <ul className="mt-2 flex flex-col gap-2 border-l border-neutral-200 pl-3">
                              {cat.subcategories.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    to={categoryHref(sub)}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xs text-neutral-500 hover:text-brand-goldDark"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.label} className="border-b border-neutral-100 py-2">
                  <Link to={navHref(link)} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
            <FiUser /> Login / Signup
          </Link>
        </div>
      )}
    </header>
  )
}
