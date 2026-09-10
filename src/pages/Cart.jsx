import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, chargeAuthorizeNetOrder, ApiError } from '../lib/api'
import { useProducts } from '../context/ProductsContext'
import { siteConfig } from '../data/siteData'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'
import CardPaymentForm from '../components/CardPaymentForm'
import ShippingAddressModal from '../components/ShippingAddressModal'

const COUPONS = {
  WELCOME10: 0.1,
}

const PICKUP_LABEL = `Pickup at ${siteConfig.address}`

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function PlusIconSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
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

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 6h11v10H3z" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 9.5h19" strokeLinecap="round" />
    </svg>
  )
}

export default function Cart() {
  const { items, updateQty, removeItem, toggleProtection, subtotal, protectionTotal, clearCart } =
    useCart()
  const { isLoggedIn } = useAuth()
  const { products: allProducts } = useProducts()

  const [placing, setPlacing] = useState(false)
  const [placeError, setPlaceError] = useState('')

  const [address, setAddress] = useState(null)
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressForm, setAddressForm] = useState({
    line1: '',
    country: '',
    province: '',
    city: '',
    postalCode: '',
  })

  const [showCoupon, setShowCoupon] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const [notes, setNotes] = useState({})
  const [notingSlug, setNotingSlug] = useState(null)

  const [placed, setPlaced] = useState(false)

  const [paymentMode, setPaymentMode] = useState('cod') // 'cod' | 'card'
  const cardFormRef = useRef(null)

  const [shippingModalOpen, setShippingModalOpen] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(null)

  const [placedOrder, setPlacedOrder] = useState(null)

  const itemCount = items.reduce((s, i) => s + i.qty, 0)
  const discount = appliedCoupon ? (subtotal + protectionTotal) * COUPONS[appliedCoupon] : 0
  const grandTotal = subtotal + protectionTotal - discount
  const shippingLabel = shippingAddress
    ? `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.province} ${shippingAddress.postalCode}`
    : PICKUP_LABEL

  const relatedProducts = allProducts.filter(
    (p) => !items.some((i) => i.slug === p.slug)
  ).slice(0, 6)

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (COUPONS[code]) {
      setAppliedCoupon(code)
      setCouponError('')
    } else {
      setCouponError("That code isn't valid.")
      setAppliedCoupon(null)
    }
  }

  const saveAddress = (e) => {
    e.preventDefault()
    setAddress(addressForm)
    setEditingAddress(false)
    setShippingAddress((prev) => (prev ? addressForm : prev))
  }

  const missingLink = items.some((i) => !i.backendId)

  const placeOrder = async () => {
    if (!address) {
      setPlaceError('Add a shipping/contact address before placing your order.')
      return
    }
    setPlaceError('')

    const orderItems = items.map((i) => ({ productId: i.backendId, quantity: i.qty }))
    const orderShippingAddress = {
      street: address.line1,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      country: address.country,
    }

    setPlacing(true)
    try {
      let order
      if (paymentMode === 'card') {
        let opaqueData
        try {
          opaqueData = await cardFormRef.current.tokenize()
        } catch (tokenizeErr) {
          setPlaceError(tokenizeErr.message || 'Could not process your card. Please check the details and try again.')
          return
        }
        ;({ order } = await chargeAuthorizeNetOrder({
          items: orderItems,
          shippingAddress: orderShippingAddress,
          opaqueData,
        }))
      } else {
        ;({ order } = await createOrder({
          items: orderItems,
          shippingAddress: orderShippingAddress,
          paymentMethod: 'Cash On Delivery',
        }))
      }
      setPlacedOrder({
        order,
        items,
        itemCount,
        subtotal,
        protectionTotal,
        discount,
        shippingLabel,
      })
      setPlaced(true)
      clearCart()
    } catch (err) {
      setPlaceError(err instanceof ApiError ? err.message : 'Could not place your order.')
    } finally {
      setPlacing(false)
    }
  }

  if (placed && placedOrder) {
    const dateLabel = new Date(placedOrder.order.createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    const orderRelated = allProducts.slice(0, 6)

    return (
      <>
        <section className="mx-auto max-w-[640px] px-5 py-16 lg:px-10">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 card-shadow">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-brand-gold text-brand-goldDark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
                <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mt-4 text-center text-2xl font-bold text-ink">Thanks for Your Order!</h1>
            <p className="mt-1 text-center text-xs text-neutral-400">{placedOrder.order._id}</p>

            <div className="mt-6 border-t border-neutral-200 pt-4">
              <p className="text-sm font-bold text-ink">Transaction Date</p>
              <p className="mt-1 text-sm text-neutral-600">{dateLabel}</p>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-4">
              <p className="text-sm font-bold text-ink">Payment Method</p>
              <p className="mt-1 text-sm text-neutral-600">{placedOrder.order.paymentMethod}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
              <div>
                <p className="text-sm font-bold text-ink">Shipping Method</p>
                <p className="mt-1 text-sm text-neutral-600">{placedOrder.shippingLabel}</p>
              </div>
              <button
                type="button"
                className="shrink-0 text-xs font-semibold text-ink hover:text-brand-gold"
              >
                Track Order
              </button>
            </div>

            <h2 className="mt-6 border-t border-neutral-200 pt-4 text-sm font-bold text-ink">
              Your Order
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {placedOrder.items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-start gap-4 rounded-lg border border-neutral-200 p-4"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-neutral-100 p-2">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold uppercase tracking-wide text-ink underline">
                      {item.name}
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-brand-goldDark">
                      {item.category}
                    </span>
                    <p className="mt-2 text-sm font-bold text-ink">${item.price}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-neutral-500">x{item.qty}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
              <div className="flex items-center justify-between">
                <span>
                  Total Product Price ({placedOrder.itemCount} Item{placedOrder.itemCount === 1 ? '' : 's'})
                </span>
                <span className="font-semibold text-ink">${placedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Product Protection</span>
                <span className="font-semibold text-ink">
                  ${placedOrder.protectionTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Shipping Price</span>
                <span className="font-semibold text-brand-goldDark">Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping Insurance</span>
                <span className="font-semibold text-brand-goldDark">Free</span>
              </div>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-4">
              <p className="text-sm font-bold text-ink">Transaction Fees</p>
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-600">
                <span>Service Fees</span>
                <span className="font-semibold text-ink">$0</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="text-sm font-bold text-ink">Grand total</span>
              <span className="text-2xl font-extrabold text-ink">
                ${placedOrder.order.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Status</span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold capitalize text-brand-goldDark">
                {placedOrder.order.status}
              </span>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-6 w-full rounded-md border border-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/5"
            >
              Print Invoice
            </button>
            <Link
              to="/shop"
              className="btn-gold mt-3 block w-full text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </section>

        <section className="container-x border-t border-neutral-200 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="section-title">Related Products</h2>
            <Link to="/shop" className="text-sm font-semibold text-ink hover:text-brand-gold">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {orderRelated.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <AreasServed />
      </>
    )
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[640px] px-5 py-24 text-center lg:px-10">
        <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Looks like you haven&rsquo;t added anything yet.
        </p>
        <Link
          to="/shop"
          className="btn-gold mt-6 inline-flex"
        >
          Browse the Shop
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <span>&rsaquo;</span>
          <span className="font-semibold text-ink">Checkout</span>
        </nav>
      </section>

      <section className="container-x py-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h1 className="text-2xl font-bold text-ink">Your Order</h1>

            <div className="mt-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.slug} className="rounded-xl border border-neutral-200 p-5">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-md bg-neutral-100 p-2">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/shop/${item.slug}`}
                        className="text-sm font-bold uppercase tracking-wide text-ink underline hover:text-brand-goldDark"
                      >
                        {item.name}
                      </Link>
                      <div>
                        <span className="mt-1 inline-block rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-brand-goldDark">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <p className="text-lg font-extrabold text-ink">${item.price}</p>
                        <button
                          type="button"
                          onClick={() => setNotingSlug(notingSlug === item.slug ? null : item.slug)}
                          className="text-xs font-semibold text-ink hover:text-brand-gold"
                        >
                          Write Note
                        </button>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeItem(item.slug)}
                          className="text-neutral-400 hover:text-red-500"
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      {notingSlug === item.slug && (
                        <textarea
                          autoFocus
                          rows={2}
                          value={notes[item.slug] || ''}
                          onChange={(e) => setNotes((n) => ({ ...n, [item.slug]: e.target.value }))}
                          placeholder="Add a note for this item…"
                          className="mt-3 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                      )}
                    </div>

                    <div className="flex shrink-0 items-center rounded-md border border-neutral-200">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-black/5"
                      >
                        <MinusIcon />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-black/5"
                      >
                        <PlusIconSmall />
                      </button>
                    </div>
                  </div>

                  <label className="mt-4 flex items-start gap-3 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      checked={item.protection}
                      onChange={() => toggleProtection(item.slug)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-gold"
                    />
                    <span className="flex-1">
                      <span className="font-semibold text-ink">Product Protection</span>{' '}
                      <span className="text-xs text-neutral-500">
                        The claim process is easy and instant, valid for 6 months
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-ink">$1</span>
                  </label>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-xl font-bold text-ink">Address</h2>
            <div className="mt-4 rounded-xl border border-neutral-200 p-5">
              <p className="inline-block border-b-2 border-brand-gold pb-2 text-sm font-bold text-brand-goldDark">
                {address ? 'Existing Address' : 'New Address'}
              </p>

              <div className="mt-4 border-t border-neutral-200 pt-4">
                {!address || editingAddress ? (
                  <form onSubmit={saveAddress} className="flex flex-col gap-3">
                    <input
                      required
                      placeholder="Street address"
                      value={addressForm.line1}
                      onChange={(e) => setAddressForm((f) => ({ ...f, line1: e.target.value }))}
                      className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                    />
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div>
                        <p className="mb-1 text-xs text-neutral-500">Country</p>
                        <input
                          required
                          value={addressForm.country}
                          onChange={(e) => setAddressForm((f) => ({ ...f, country: e.target.value }))}
                          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-neutral-500">Province</p>
                        <input
                          required
                          value={addressForm.province}
                          onChange={(e) => setAddressForm((f) => ({ ...f, province: e.target.value }))}
                          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-neutral-500">City</p>
                        <input
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-neutral-500">Postal Code</p>
                        <input
                          required
                          value={addressForm.postalCode}
                          onChange={(e) =>
                            setAddressForm((f) => ({ ...f, postalCode: e.target.value }))
                          }
                          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-gold mt-1 self-start"
                    >
                      Save Address
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-neutral-600">
                        Address <span className="ml-2 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-brand-goldDark">Main Address</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditingAddress(true)}
                        className="shrink-0 text-xs font-semibold text-ink hover:text-brand-gold"
                      >
                        Change Address
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-ink">{address.line1}</p>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-neutral-500">Country</p>
                        <p className="text-sm font-semibold text-ink">{address.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Province</p>
                        <p className="text-sm font-semibold text-ink">{address.province}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">City</p>
                        <p className="text-sm font-semibold text-ink">{address.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Postal Code</p>
                        <p className="text-sm font-semibold text-ink">{address.postalCode}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <h2 className="mt-10 text-xl font-bold text-ink">Shipping</h2>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <TruckIcon className="text-brand-gold" />
                <span className="text-sm font-semibold text-ink">{shippingLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setShippingModalOpen(true)}
                className="shrink-0 text-xs font-semibold text-ink hover:text-brand-gold"
              >
                Change Shipping
              </button>
            </div>

            <h2 className="mt-10 text-xl font-bold text-ink">Payment Method</h2>
            <div className="mt-4 flex overflow-hidden rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setPaymentMode('cod')}
                className={`flex flex-1 items-center justify-center gap-2 px-5 py-4 text-sm font-semibold ${
                  paymentMode === 'cod' ? 'bg-amber-50 text-brand-goldDark' : 'text-neutral-500 hover:bg-black/5'
                }`}
              >
                <CardIcon className="h-4 w-4" />
                Pay at Pickup
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('card')}
                className={`flex flex-1 items-center justify-center gap-2 border-l border-neutral-200 px-5 py-4 text-sm font-semibold ${
                  paymentMode === 'card' ? 'bg-amber-50 text-brand-goldDark' : 'text-neutral-500 hover:bg-black/5'
                }`}
              >
                <CardIcon className="h-4 w-4" />
                Credit / Debit Card
              </button>
            </div>

            {paymentMode === 'card' && <CardPaymentForm ref={cardFormRef} />}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-neutral-200 p-5">
              {!showCoupon ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowCoupon(true)}
                    className="w-full rounded-md border border-brand-gold py-2.5 text-sm font-bold uppercase tracking-wide text-brand-goldDark hover:bg-amber-50"
                  >
                    Apply Coupon
                  </button>
                  <p className="my-3 text-center text-xs text-neutral-400">or</p>
                  <p className="text-center text-sm text-neutral-600">
                    Get 10% Discount on First Order
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="shrink-0 rounded-md border border-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-goldDark hover:bg-amber-50"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs font-medium text-red-600">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="text-xs font-medium text-brand-goldDark">
                      Code {appliedCoupon} applied &mdash; 10% off
                    </p>
                  )}
                  <p className="text-xs text-neutral-500">Try WELCOME10 for 10% off your first order.</p>
                </div>
              )}

              <div className="mt-5 border-t border-neutral-200 pt-4">
                <p className="text-sm font-bold text-ink">Total Product</p>
                <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span>
                      Total Product Price ({itemCount} Item{itemCount === 1 ? '' : 's'})
                    </span>
                    <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Product Protection</span>
                    <span className="font-semibold text-ink">
                      ${protectionTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Shipping Price</span>
                    <span className="font-semibold text-brand-goldDark">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping Insurance</span>
                    <span className="font-semibold text-brand-goldDark">Free</span>
                  </div>
                </div>

                <p className="mt-4 text-sm font-bold text-ink">Transaction Fees</p>
                <div className="mt-3 flex items-center justify-between text-sm text-neutral-600">
                  <span>Service Fees</span>
                  <span className="font-semibold text-ink">$0</span>
                </div>

                {discount > 0 && (
                  <div className="mt-3 flex items-center justify-between text-sm text-brand-goldDark">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
                  <span className="text-sm font-bold text-ink">Grand total</span>
                  <span className="text-2xl font-extrabold text-ink">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {placeError && (
                <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {placeError}
                </p>
              )}

              {!isLoggedIn ? (
                <Link to="/sign-in" className="btn-gold mt-5 block w-full text-center">
                  Sign In to Checkout
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={placing || missingLink}
                  className="btn-gold mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {placing ? 'Placing Order…' : paymentMode === 'card' ? 'Pay & Place Order' : 'Pay Now'}
                </button>
              )}
              {missingLink && isLoggedIn && (
                <p className="mt-2 text-center text-xs text-red-500">
                  Some items in your cart aren&rsquo;t linked to the store catalogue yet.
                </p>
              )}
              <p className="mt-2 text-center text-xs text-neutral-500">
                {paymentMode === 'card'
                  ? 'Your card will be charged immediately.'
                  : 'No charge today — you pay in store when you pick up.'}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container-x border-t border-neutral-200 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="section-title">Related Products</h2>
            <Link to="/shop" className="text-sm font-semibold text-ink hover:text-brand-gold">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <AreasServed />

      <ShippingAddressModal
        open={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        address={address}
        onConfirm={setShippingAddress}
        onEditAddress={() => setEditingAddress(true)}
      />
    </>
  )
}
