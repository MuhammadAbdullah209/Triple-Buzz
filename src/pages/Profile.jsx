import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUser,
  FiPackage,
  FiRotateCcw,
  FiStar,
  FiCreditCard,
  FiLock,
  FiHeart,
  FiEdit2,
  FiCamera,
  FiMail,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
  FiTrash2,
} from 'react-icons/fi'
import Logo from '../components/Logo'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import {
  fetchMyOrders,
  cancelOrderRequest,
  fetchMyReviews,
  deleteReviewRequest,
  updateProfile,
  uploadAvatar,
  removeAvatar,
  ApiError,
} from '../lib/api'
import AreasServed from '../components/AreasServed'

const NAV_ITEMS = [
  { id: 'account', label: 'My Account', icon: FiUser },
  { id: 'orders', label: 'My Orders', icon: FiPackage },
  { id: 'returns', label: 'Returns & Cancel', icon: FiRotateCcw },
  { id: 'reviews', label: 'My Rating & Reviews', icon: FiStar },
  { id: 'payment', label: 'Payment', icon: FiCreditCard },
  { id: 'password', label: 'Change Password', icon: FiLock },
  { id: 'wishlist', label: 'My Wishlist', icon: FiHeart },
]

const PAYMENT_OPTIONS = [
  { id: 'pickup', label: 'Pay at pickup (card or cash)', icon: FiMapPin },
  { id: 'card', label: 'Credit / Debit Card', icon: FiCreditCard },
  { id: 'cash', label: 'Cash', icon: FiDollarSign },
]

const ORDER_STATUS_STYLE = {
  pending: 'bg-amber-50 text-brand-goldDark',
  confirmed: 'bg-amber-50 text-brand-goldDark',
  shipped: 'bg-amber-50 text-brand-goldDark',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
}

function formatOrderDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function OrdersTab() {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchMyOrders()
      .then((data) => {
        if (!cancelled) setOrders(data.my_orders ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load your orders.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <h2 className="text-lg font-bold text-ink">My Orders</h2>
      <div className="mt-4 border-b border-neutral-200" />

      {error && (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {!orders && !error && <p className="mt-6 text-sm text-neutral-500">Loading your orders…</p>}

      {orders && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <p className="text-lg font-bold text-ink">No orders yet</p>
          <p className="text-sm text-neutral-500">Your order history will show up here.</p>
          <Link to="/shop" className="btn-gold mt-2">
            Browse the Shop
          </Link>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-5">
        {orders?.map((order) => (
          <div key={order._id} className="rounded-xl border border-neutral-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div>
                <p className="text-xs text-neutral-400">Order</p>
                <p className="text-sm font-bold text-ink">{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Placed on</p>
                <p className="text-sm font-semibold text-ink">{formatOrderDate(order.createdAt)}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${ORDER_STATUS_STYLE[order.status] ?? 'bg-neutral-100 text-neutral-600'}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={item.product?._id ?? i} className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-neutral-100 p-2">
                    {item.product?.image?.[0]?.url && (
                      <img
                        src={item.product.image[0].url}
                        alt={item.product?.name ?? 'Product'}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {item.product?.name ?? 'Product no longer available'}
                    </p>
                    <p className="text-xs text-neutral-400">Qty {item.quantity}</p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <p className="text-sm font-bold text-ink">
                Total: <span className="text-brand-goldDark">${order.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-xs text-neutral-500">{order.paymentMethod}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ReturnsTab() {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')
  const [confirmingCancel, setConfirmingCancel] = useState(null)
  const [cancelling, setCancelling] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchMyOrders()
      .then((data) => {
        if (!cancelled) setOrders(data.my_orders ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load your orders.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const cancelOrder = async (id) => {
    setCancelling(id)
    try {
      await cancelOrderRequest(id)
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: 'cancelled' } : o)))
      setConfirmingCancel(null)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not cancel this order.')
    } finally {
      setCancelling(null)
    }
  }

  const cancellable = orders?.filter((o) => ['pending', 'confirmed'].includes(o.status)) ?? []
  const history = orders?.filter((o) => o.status === 'cancelled') ?? []

  return (
    <>
      <h2 className="text-lg font-bold text-ink">Returns &amp; Cancel</h2>
      <div className="mt-4 border-b border-neutral-200" />
      <p className="mt-4 text-sm text-neutral-500">
        Orders can be cancelled any time before they ship. Once an order has shipped or been
        delivered, please contact the shop directly to arrange a return.
      </p>

      {error && (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {!orders && !error && <p className="mt-6 text-sm text-neutral-500">Loading your orders…</p>}

      {orders && (
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-goldDark">
            Eligible for Cancellation
          </h3>
          {cancellable.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">No orders can be cancelled right now.</p>
          ) : (
            <div className="mt-3 flex flex-col gap-3">
              {cancellable.map((order) => (
                <div key={order._id} className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-neutral-400">Order</p>
                      <p className="text-sm font-bold text-ink">{order._id}</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {order.items.map((i) => i.product?.name ?? 'Product').join(', ')}
                      </p>
                    </div>
                    {confirmingCancel === order._id ? (
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500">Cancel this order?</span>
                        <button
                          type="button"
                          disabled={cancelling === order._id}
                          onClick={() => cancelOrder(order._id)}
                          className="text-xs font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          {cancelling === order._id ? 'Cancelling…' : 'Yes, Cancel'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingCancel(null)}
                          className="text-xs font-semibold text-neutral-400 hover:text-ink"
                        >
                          Never Mind
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingCancel(order._id)}
                        className="shrink-0 rounded-md border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-goldDark">
            Cancelled Orders
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {history.map((order) => (
              <div
                key={order._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 p-4"
              >
                <div>
                  <p className="text-sm font-bold text-ink">{order._id}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {order.items.map((i) => i.product?.name ?? 'Product').join(', ')}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${ORDER_STATUS_STYLE[order.status]}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ReviewsTab() {
  const [reviews, setReviews] = useState(null)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchMyReviews()
      .then((data) => {
        if (!cancelled) setReviews(data.reviews ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load your reviews.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const removeReview = async (productId) => {
    setDeletingId(productId)
    try {
      await deleteReviewRequest(productId)
      setReviews((prev) => prev.filter((r) => r.product?._id !== productId))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this review.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <h2 className="text-lg font-bold text-ink">My Rating &amp; Reviews</h2>
      <div className="mt-4 border-b border-neutral-200" />
      <p className="mt-4 text-sm text-neutral-500">
        Write a review from any product page. New and edited reviews go to our team for a quick
        approval before they show up publicly.
      </p>

      {error && (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {!reviews && !error && <p className="mt-6 text-sm text-neutral-500">Loading your reviews…</p>}

      <div className="mt-6 flex flex-col gap-4">
        {reviews?.map((rev) => (
          <div key={rev._id} className="rounded-xl border border-neutral-200 p-5">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-ink">{rev.product?.name ?? 'Product'}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      rev.status === 'approved'
                        ? 'bg-green-50 text-green-700'
                        : rev.status === 'rejected'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-amber-50 text-brand-goldDark'
                    }`}
                  >
                    {rev.status ?? 'approved'}
                  </span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < rev.rating ? 'text-brand-gold' : 'text-neutral-200'}
                    />
                  ))}
                </div>
                {rev.comment && <p className="mt-2 text-sm text-neutral-600">{rev.comment}</p>}
              </div>
              <button
                type="button"
                aria-label="Delete review"
                disabled={deletingId === rev.product?._id}
                onClick={() => removeReview(rev.product?._id)}
                className="shrink-0 text-neutral-300 hover:text-red-500 disabled:opacity-50"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
        {reviews?.length === 0 && (
          <p className="py-10 text-center text-sm text-neutral-500">
            You haven&rsquo;t written any reviews yet.
          </p>
        )}
      </div>
    </>
  )
}

function PaymentTab() {
  const [defaultMethod, setDefaultMethod] = useState('pickup')
  const [justSaved, setJustSaved] = useState(false)

  const choose = (id) => {
    setDefaultMethod(id)
    setJustSaved(true)
  }

  return (
    <>
      <h2 className="text-lg font-bold text-ink">Payment</h2>
      <div className="mt-4 border-b border-neutral-200" />
      <p className="mt-4 text-sm text-neutral-500">
        Choose how you&rsquo;d like to pay by default at checkout. No card numbers are stored &mdash;
        you always confirm payment in person at pickup.
      </p>

      {justSaved && (
        <div className="mt-4 rounded-md border border-brand-gold/40 bg-amber-50 p-3 text-sm text-ink">
          Default payment method updated.
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3">
        {PAYMENT_OPTIONS.map((opt) => {
          const Icon = opt.icon
          const active = defaultMethod === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => choose(opt.id)}
              className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                active ? 'border-brand-gold bg-amber-50' : 'border-neutral-200 hover:border-brand-gold/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className={active ? 'text-brand-goldDark' : 'text-neutral-400'} />
                <span className="text-sm font-semibold text-ink">{opt.label}</span>
              </span>
              {active && (
                <span className="flex items-center gap-1 text-xs font-bold text-brand-goldDark">
                  <FiCheckCircle /> Default
                </span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}

function PasswordTab() {
  const [show, setShow] = useState({ current: false, next: false, confirm: false })
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const toggle = (key) => setShow((s) => ({ ...s, [key]: !s[key] }))

  const submit = (e) => {
    e.preventDefault()
    setSaved(false)
    if (!form.current || !form.next || !form.confirm) {
      setError('Fill in all fields.')
      return
    }
    if (form.next.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }
    if (form.next !== form.confirm) {
      setError('New password and confirmation do not match.')
      return
    }
    setError('')
    setSaved(true)
    setForm({ current: '', next: '', confirm: '' })
  }

  const rows = [
    { key: 'current', label: 'Current Password' },
    { key: 'next', label: 'New Password' },
    { key: 'confirm', label: 'Confirm New Password' },
  ]

  return (
    <>
      <h2 className="text-lg font-bold text-ink">Change Password</h2>
      <div className="mt-4 border-b border-neutral-200" />

      {saved && (
        <div className="mt-5 rounded-md border border-brand-gold/40 bg-amber-50 p-3 text-sm text-ink">
          Your password has been changed.
        </div>
      )}
      {error && (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="mt-6 flex max-w-sm flex-col gap-5">
        {rows.map((row) => (
          <div key={row.key}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-400">
              {row.label}
            </label>
            <div className="relative">
              <input
                type={show[row.key] ? 'text' : 'password'}
                value={form[row.key]}
                onChange={(e) => setForm((f) => ({ ...f, [row.key]: e.target.value }))}
                className="w-full rounded-md border border-neutral-200 px-4 py-2.5 pr-10 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
              />
              <button
                type="button"
                aria-label="Toggle visibility"
                onClick={() => toggle(row.key)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                {show[row.key] ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        ))}
        <button type="submit" className="btn-gold self-start">
          Update Password
        </button>
      </form>
    </>
  )
}

function WishlistTab() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="text-lg font-bold text-ink">My Wishlist</p>
        <p className="text-sm text-neutral-500">
          Nothing saved yet. Tap the heart on any product to add it here.
        </p>
        <Link to="/shop" className="btn-gold mt-2">
          Browse the Shop
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink">
          My Wishlist <span className="text-sm font-normal text-neutral-400">({items.length})</span>
        </h2>
        <Link to="/wishlist" className="text-sm font-semibold text-brand-goldDark hover:text-brand-gold">
          View Full Wishlist
        </Link>
      </div>
      <div className="mt-4 border-b border-neutral-200" />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} flat />
        ))}
      </div>
    </>
  )
}

function userToDraft(user) {
  return {
    firstName: user?.firstname ?? '',
    lastName: user?.lastname ?? '',
    gender: user?.gender ?? '',
    phone: user?.phno ?? '',
    email: user?.email ?? '',
    street: user?.address?.street ?? '',
    city: user?.address?.city ?? '',
    state: user?.address?.province ?? '',
    postalCode: user?.address?.postalCode ?? '',
    country: user?.address?.country ?? '',
  }
}

export default function Profile() {
  const { user, isLoggedIn, ready, refreshUser, setUser } = useAuth()
  const [activeTab, setActiveTab] = useState('account')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(() => userToDraft(user))
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    setDraft(userToDraft(user))
  }, [user])

  const startEditing = () => {
    setDraft(userToDraft(user))
    setSaved(false)
    setError('')
    setEditing(true)
  }

  const cancelEditing = () => {
    setDraft(userToDraft(user))
    setEditing(false)
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { user: updated } = await updateProfile({
        firstname: draft.firstName,
        lastname: draft.lastName,
        gender: draft.gender || undefined,
        phno: draft.phone,
        street: draft.street,
        city: draft.city,
        province: draft.state,
        postalCode: draft.postalCode,
        country: draft.country,
      })
      setUser((u) => ({ ...u, ...updated }))
      setEditing(false)
      setSaved(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save your profile.')
    } finally {
      setSaving(false)
    }
  }

  const field = (key) => ({
    value: draft[key],
    onChange: (e) => setDraft((d) => ({ ...d, [key]: e.target.value })),
    disabled: !editing,
  })

  const inputClass = (disabled) =>
    `w-full rounded-md border px-4 py-2.5 text-sm text-ink outline-none transition ${
      disabled
        ? 'border-neutral-200 bg-neutral-50 text-neutral-500'
        : 'border-neutral-200 bg-white focus:ring-2 focus:ring-brand-gold/40'
    }`

  const handleAvatarPick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setAvatarBusy(true)
    setError('')
    try {
      await uploadAvatar(file)
      await refreshUser()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not upload your photo.')
    } finally {
      setAvatarBusy(false)
    }
  }

  const handleAvatarRemove = async () => {
    setAvatarBusy(true)
    setError('')
    try {
      await removeAvatar()
      await refreshUser()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not remove your photo.')
    } finally {
      setAvatarBusy(false)
    }
  }

  if (!ready) {
    return (
      <section className="container-x py-24 text-center text-sm text-neutral-500">
        Loading your account…
      </section>
    )
  }

  if (!isLoggedIn) {
    return (
      <section className="mx-auto max-w-md px-5 py-24 text-center lg:px-10">
        <h1 className="text-2xl font-bold text-ink">Sign in to view your profile</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Your orders, wishlist, and reviews are all tied to your account.
        </p>
        <Link to="/sign-in" className="btn-gold mt-6 inline-flex">
          Sign In
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
          <span className="font-semibold text-ink">Profile</span>
        </nav>
      </section>

      <section className="container-x py-6">
        <h1 className="text-2xl font-bold text-ink">Profile</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5 card-shadow lg:sticky lg:top-24">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-brand-gold bg-ink">
                {user?.avatar?.url ? (
                  <img src={user.avatar.url} alt="Profile avatar" className="h-full w-full object-cover" />
                ) : (
                  <Logo className="h-8 p-1" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500">Hello,</p>
                <p className="truncate text-sm font-bold text-ink">
                  {user?.firstname} {user?.lastname}
                </p>
              </div>
            </div>

            <ul className="mt-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = activeTab === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold transition ${
                        active
                          ? 'bg-brand-gold text-ink'
                          : 'text-neutral-600 hover:bg-black/5 hover:text-ink'
                      }`}
                    >
                      <Icon className="text-base shrink-0" />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* Content */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 card-shadow sm:p-8">
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
            {activeTab === 'payment' && <PaymentTab />}
            {activeTab === 'password' && <PasswordTab />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'returns' && <ReturnsTab />}
            {activeTab === 'account' && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-ink">Personal Information</h2>
                  {!editing ? (
                    <button
                      type="button"
                      onClick={startEditing}
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-goldDark hover:text-brand-gold"
                    >
                      <FiEdit2 /> Change Profile Information
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="text-sm font-semibold text-neutral-500 hover:text-ink"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4 border-b border-neutral-200" />

                {saved && (
                  <div className="mt-5 rounded-md border border-brand-gold/40 bg-amber-50 p-3 text-sm text-ink">
                    Your profile information has been updated.
                  </div>
                )}
                {error && (
                  <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={saveProfile} className="mt-6 flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full border-2 border-brand-gold bg-ink">
                        {user?.avatar?.url ? (
                          <img src={user.avatar.url} alt="Profile avatar" className="h-full w-full object-cover" />
                        ) : (
                          <Logo className="h-14 p-2" />
                        )}
                      </div>
                      <button
                        type="button"
                        aria-label="Change photo"
                        disabled={avatarBusy}
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -right-1 -bottom-1 grid h-7 w-7 place-items-center rounded-full bg-brand-gold text-ink shadow hover:bg-brand-goldDark disabled:opacity-50"
                      >
                        <FiCamera className="text-sm" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarPick}
                        className="hidden"
                      />
                    </div>
                    {user?.avatar?.url && (
                      <button
                        type="button"
                        disabled={avatarBusy}
                        onClick={handleAvatarRemove}
                        className="text-sm font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
                      >
                        {avatarBusy ? 'Working…' : 'Remove photo'}
                      </button>
                    )}
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-400">
                      Name
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        placeholder="First name"
                        className={inputClass(!editing)}
                        {...field('firstName')}
                      />
                      <input
                        placeholder="Last name"
                        className={inputClass(!editing)}
                        {...field('lastName')}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                      Gender
                    </p>
                    <div className="flex h-[42px] items-center gap-6">
                      {['male', 'female', 'other'].map((g) => (
                        <label key={g} className="flex items-center gap-2 text-sm capitalize text-neutral-600">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={draft.gender === g}
                            disabled={!editing}
                            onChange={() => setDraft((d) => ({ ...d, gender: g }))}
                            className="h-4 w-4 accent-brand-gold"
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                      Phone Number
                    </p>
                    <div className="relative">
                      <FiPhone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className={`${inputClass(!editing)} pl-10`}
                        {...field('phone')}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                      Email
                    </p>
                    <div className="relative">
                      <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="email"
                        readOnly
                        disabled
                        value={user?.email ?? ''}
                        className={`${inputClass(true)} pl-10`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-400">Email cannot be changed</p>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-goldDark">
                      Shipping Address
                    </h3>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                          Street Address
                        </p>
                        <input
                          placeholder="Street address"
                          className={inputClass(!editing)}
                          {...field('street')}
                        />
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                          City
                        </p>
                        <input placeholder="City" className={inputClass(!editing)} {...field('city')} />
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                          Province / State
                        </p>
                        <input
                          placeholder="State"
                          className={inputClass(!editing)}
                          {...field('state')}
                        />
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                          Postal Code
                        </p>
                        <input
                          placeholder="Postal code"
                          className={inputClass(!editing)}
                          {...field('postalCode')}
                        />
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-400">
                          Country
                        </p>
                        <input
                          placeholder="Country"
                          className={inputClass(!editing)}
                          {...field('country')}
                        />
                      </div>
                    </div>
                  </div>

                  {editing && (
                    <button type="submit" disabled={saving} className="btn-gold self-start disabled:opacity-60">
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <AreasServed />
    </>
  )
}
