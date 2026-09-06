import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CartIcon } from './Icons'

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function PlusIconSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0 1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

export default function CartDrawer() {
  const { items, updateQty, removeItem, subtotal, isCartOpen, closeCart } = useCart()
  const itemCount = items.length

  useEffect(() => {
    if (!isCartOpen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isCartOpen, closeCart])

  return (
    <div
      className={`fixed inset-0 z-[90] ${isCartOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isCartOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink">
            <CartIcon className="h-5 w-5" />
            Your Cart
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-brand-goldDark">
              {itemCount}
            </span>
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="grid h-8 w-8 place-items-center rounded-md text-neutral-500 hover:bg-black/5 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <CartIcon className="h-10 w-10 text-neutral-300" />
            <p className="text-sm font-semibold text-ink">Your cart is empty</p>
            <p className="text-xs text-neutral-500">Add something you like and it&rsquo;ll show up here.</p>
            <button
              type="button"
              onClick={closeCart}
              className="btn-gold mt-2"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-3 border-b border-neutral-100 pb-4">
                    <Link
                      to={`/shop/${item.slug}`}
                      onClick={closeCart}
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-neutral-100 p-2"
                    >
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-goldDark"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeItem(item.slug)}
                          className="shrink-0 text-neutral-400 hover:text-red-500"
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-neutral-200">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(item.slug, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center text-neutral-600 hover:bg-black/5"
                          >
                            <MinusIcon />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-ink">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(item.slug, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center text-neutral-600 hover:bg-black/5"
                          >
                            <PlusIconSmall />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-ink">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-600">Subtotal</span>
                <span className="text-lg font-extrabold text-ink">${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-400">Shipping and discounts calculated at checkout.</p>

              <Link
                to="/cart"
                onClick={closeCart}
                className="btn-gold mt-4 w-full"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full text-center text-xs font-semibold text-neutral-500 hover:text-ink"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
