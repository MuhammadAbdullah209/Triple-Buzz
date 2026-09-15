import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { siteConfig, categoryPageCopy, defaultShopPageCopy, resolveCategoryLabel } from '../data/siteData'
import { StarIcon, CartIcon, ChevronDownIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'
import ShareModal from '../components/ShareModal'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useProducts, normalizeProduct } from '../context/ProductsContext'
import { fetchProductReviews, writeReviewRequest, fetchProducts, ApiError } from '../lib/api'
import {
  getDisplaySold,
  getDisplayRating,
  getDisplayReviewCount,
  getDisplayBreakdown,
  getFakeReviews,
} from '../utils/socialProof'

const PRODUCT_FAQS = [
  {
    q: 'Do you offer shipping?',
    a: 'We currently focus on in-store pickup so our team can help you find exactly what you need. Call the store to check availability.',
  },
  {
    q: 'When can I pick up my order?',
    a: "Most orders are ready the same day during store hours. We'll reach out if an item needs to be transferred from our second location.",
  },
  {
    q: 'Can I exchange or return this item?',
    a: "If you'd like to exchange this item for something else, bring it back to the store with your receipt and our team will help you out. Please get in touch before returning anything so we can confirm it's still eligible.",
  },
]

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

function HeartOutline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d="M12 20.5s-7.5-4.6-9.8-9.2C.6 7.7 2.6 4.5 6 4.5c2 0 3.6 1.1 4.5 2.6.9-1.5 2.5-2.6 4.5-2.6 3.4 0 5.4 3.2 3.8 6.8-2.3 4.6-9.8 9.2-9.8 9.2z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8L15.8 6.2M8.2 13.2l7.6 4.6" strokeLinecap="round" />
    </svg>
  )
}

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange(n)}
          className="text-xl"
        >
          <StarIcon className={`h-5 w-5 ${n <= value ? 'text-brand-gold' : 'text-black/10'}`} />
        </button>
      ))}
    </div>
  )
}

const TABS = ['Reviews', 'Description', 'FAQs']

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem, openCart } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { isLoggedIn } = useAuth()
  const { products, findBySlug, loading: productsLoading } = useProducts()
  const localProduct = findBySlug(slug)
  const [remoteProduct, setRemoteProduct] = useState(null)
  const [searchExhausted, setSearchExhausted] = useState(false)
  const product = localProduct || remoteProduct

  // The catalogue loads in 100-item batches (see ProductsContext) rather than
  // all at once (2,000+ products), so a product further down the list —
  // reached via a direct link, a bookmark, or a click from the cart drawer —
  // is often not in memory yet. Paging through every batch sequentially to
  // find it could mean dozens of awaited round-trips before it turns up, so
  // instead this does a couple of targeted name searches (the backend's
  // `search` param) using the slug's own words, which resolves it in one or
  // two requests instead. Falls back to "not found" once those are exhausted
  // rather than hanging indefinitely.
  useEffect(() => {
    setRemoteProduct(null)
    setSearchExhausted(false)
  }, [slug])

  useEffect(() => {
    if (localProduct || remoteProduct || searchExhausted || productsLoading) return

    let cancelled = false
    const words = slug.split('-').filter((w) => w.length > 2)
    const searchTerms = [...words].sort((a, b) => b.length - a.length).slice(0, 3)

    ;(async () => {
      for (const term of searchTerms.length ? searchTerms : [slug]) {
        try {
          const data = await fetchProducts({ page: 1, site: 'triplebuzz', limit: 100, search: term })
          const match = (data.products || []).map(normalizeProduct).find((p) => p.slug === slug)
          if (match) {
            if (!cancelled) setRemoteProduct(match)
            return
          }
        } catch {
          // Network hiccup on this term — try the next one.
        }
      }
      if (!cancelled) setSearchExhausted(true)
    })()

    return () => {
      cancelled = true
    }
  }, [slug, localProduct, remoteProduct, searchExhausted, productsLoading])

  const [qty, setQty] = useState(1)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeTab, setActiveTab] = useState('Reviews')
  const [openFaq, setOpenFaq] = useState(2)
  const [added, setAdded] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewsData, setReviewsData] = useState(null)
  const [reviewsError, setReviewsError] = useState('')

  useEffect(() => {
    if (!product?.backendId) return
    let cancelled = false
    fetchProductReviews(product.backendId)
      .then((data) => {
        if (!cancelled) setReviewsData(data)
      })
      .catch((err) => {
        if (!cancelled) setReviewsError(err instanceof ApiError ? err.message : 'Could not load reviews.')
      })
    return () => {
      cancelled = true
    }
  }, [product?.backendId])

  if (productsLoading || (!product && !searchExhausted)) {
    return (
      <section className="container-x py-20 text-center">
        <p className="text-sm text-neutral-500">Loading product…</p>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-ink hover:text-brand-gold">
          &larr; Back to Shop
        </Link>
      </section>
    )
  }

  const wishlisted = isWishlisted(product.backendId)
  const subtotal = (parseFloat(product.price) * qty).toFixed(2)
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 6)

  const productCategoryLabel = resolveCategoryLabel([product.category])
  const pageCopy = productCategoryLabel ? categoryPageCopy[productCategoryLabel] : defaultShopPageCopy

  const reviews = reviewsData?.reviews ?? []
  const summary = reviewsData?.summary ?? { average: 0, total: 0, breakdown: {} }

  const hasRealReviews = summary.total > 0
  const displayRating = hasRealReviews ? summary.average : getDisplayRating(product)
  const displayReviewTotal = hasRealReviews ? summary.total : getDisplayReviewCount(product)
  const displayBreakdown = hasRealReviews
    ? summary.breakdown
    : getDisplayBreakdown(product, displayReviewTotal)
  const displaySold = getDisplaySold(product)
  const fakeReviews = hasRealReviews ? [] : getFakeReviews(product, Math.min(5, displayReviewTotal))

  const submitReview = async (e) => {
    e.preventDefault()
    if (!reviewRating || !product.backendId) return
    try {
      await writeReviewRequest(product.backendId, { rating: reviewRating, comment: reviewText })
      setShowReviewForm(false)
      setReviewRating(0)
      setReviewText('')
      const data = await fetchProductReviews(product.backendId)
      setReviewsData(data)
    } catch (err) {
      setReviewsError(err instanceof ApiError ? err.message : 'Could not submit your review.')
    }
  }

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/shop" className="hover:text-ink">{product.category}</Link>
          <span>&rsaquo;</span>
          <span className="font-semibold text-ink">{product.name.toUpperCase()}</span>
        </nav>
      </section>

      <section className="container-x py-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[100px_1fr]">
              <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={`grid h-[76px] w-[76px] shrink-0 place-items-center rounded-md border-2 bg-neutral-100 p-2 ${
                      i === 0 ? 'border-brand-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={product.image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>

              <div className="order-1 flex aspect-square items-center justify-center rounded-xl bg-neutral-100 p-10 sm:order-2">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
              </div>
            </div>

            <div className="mt-10 border-t border-neutral-200 pt-8">
              <div className="flex gap-8 border-b border-neutral-200">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold ${
                      activeTab === tab
                        ? 'border-b-2 border-brand-gold text-ink'
                        : 'text-neutral-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Reviews' && (
                <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <StarIcon className="h-8 w-8 text-brand-gold" />
                      <div>
                        <p className="text-3xl font-extrabold text-ink">{displayRating.toFixed(1)}/5.0</p>
                        <p className="text-xs text-neutral-500">
                          {displayReviewTotal} rating{displayReviewTotal === 1 ? '' : 's'} &bull; {displayReviewTotal} review
                          {displayReviewTotal === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = displayBreakdown?.[star] ?? 0
                        const pct = displayReviewTotal ? Math.round((count / displayReviewTotal) * 100) : 0
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs text-neutral-600">
                            <span className="flex w-8 items-center gap-0.5">
                              {star} <StarIcon className="h-3 w-3 text-brand-gold" />
                            </span>
                            <div className="h-1.5 flex-1 rounded-full bg-black/10">
                              <div
                                className="h-1.5 rounded-full bg-brand-gold"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-6 text-right">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink">Sort by</span>
                        <select className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-ink focus:outline-none">
                          <option>Latest</option>
                          <option>Highest rated</option>
                        </select>
                      </div>
                      {isLoggedIn ? (
                        <button
                          type="button"
                          onClick={() => setShowReviewForm((v) => !v)}
                          className="rounded-md border border-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-goldDark hover:bg-amber-50"
                        >
                          {showReviewForm ? 'Cancel' : 'Write Review'}
                        </button>
                      ) : (
                        <Link
                          to="/sign-in"
                          className="text-xs font-semibold text-ink hover:text-brand-gold"
                        >
                          Sign in to write a review
                        </Link>
                      )}
                    </div>

                    {reviewsError && (
                      <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {reviewsError}
                      </p>
                    )}

                    {showReviewForm && (
                      <form
                        onSubmit={submitReview}
                        className="mb-6 flex flex-col gap-3 rounded-xl border border-brand-gold/40 bg-amber-50 p-4"
                      >
                        <StarPicker value={reviewRating} onChange={setReviewRating} />
                        <textarea
                          rows={3}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience with this product…"
                          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                        />
                        <button
                          type="submit"
                          disabled={!reviewRating}
                          className="btn-gold self-start disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}

                    <div className="flex flex-col gap-6">
                      {reviews.length === 0 &&
                        fakeReviews.map((r) => (
                          <div key={r._id} className="border-b border-neutral-200 pb-6">
                            <div className="flex items-center gap-3">
                              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                                {r.name[0]}
                              </span>
                              <div>
                                <p className="text-sm font-bold text-ink">{r.name}</p>
                                <p className="text-xs text-neutral-400">{r.time}</p>
                              </div>
                            </div>
                            <div className="mt-2 flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < r.rating ? 'text-brand-gold' : 'text-black/10'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.comment}</p>
                          </div>
                        ))}
                      {reviews.map((r) => {
                        const name =
                          [r.user?.firstname, r.user?.lastname].filter(Boolean).join(' ') || 'A customer'
                        const date = new Date(r.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                        return (
                          <div key={r._id} className="border-b border-neutral-200 pb-6">
                            <div className="flex items-center gap-3">
                              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                                {name[0]}
                              </span>
                              <div>
                                <p className="text-sm font-bold text-ink">{name}</p>
                                <p className="text-xs text-neutral-400">{date}</p>
                              </div>
                              {r.status === 'pending' && (
                                <span className="ml-auto rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-goldDark">
                                  Pending approval
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < r.rating ? 'text-brand-gold' : 'text-black/10'
                                  }`}
                                />
                              ))}
                            </div>
                            {r.comment && (
                              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.comment}</p>
                            )}
                          </div>
                        )
                      })}
                      {reviews.length === 0 && fakeReviews.length === 0 && (
                        <p className="text-sm text-neutral-500">
                          No reviews yet — be the first to share your thoughts.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Description' && product.description && (
                <div
                  className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-neutral-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {activeTab === 'FAQs' && (
                <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3">
                  {PRODUCT_FAQS.map((item, i) => {
                    const isOpen = openFaq === i
                    return (
                      <div
                        key={item.q}
                        className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : i)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="text-sm font-semibold text-ink">{item.q}</span>
                          <ChevronDownIcon
                            className={`h-4 w-4 shrink-0 text-brand-gold transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-500">
                            {item.a}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-ink">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-600">
              <StarIcon className="h-4 w-4 text-brand-gold" />
              <span className="font-semibold text-ink">{displayRating.toFixed(1)}/5.0</span>
              <span className="text-neutral-300">|</span>
              <span>{displayReviewTotal} Reviews</span>
              <span className="text-neutral-300">|</span>
              <span>{displaySold} sold</span>
            </div>

            {!product.soldOut && (
              <span className="mt-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-goldDark">
                Best Seller
              </span>
            )}

            <p className="mt-4 text-3xl font-extrabold text-ink">${product.price}</p>

            {product.description && (
              <div className="mt-4 text-sm leading-relaxed text-neutral-600">
                <div
                  className={showFullDesc ? '' : 'line-clamp-3'}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <button
                  type="button"
                  onClick={() => setShowFullDesc((v) => !v)}
                  className="mt-1 font-semibold text-ink hover:text-brand-gold"
                >
                  {showFullDesc ? 'View Less' : 'View More'}
                </button>
              </div>
            )}

            <p className="mt-6 text-sm font-bold text-ink">Availability</p>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${product.soldOut ? 'bg-red-500' : 'bg-brand-gold'}`}
              />
              <div>
                <p className="text-sm font-semibold text-ink">
                  {product.soldOut ? 'Currently sold out' : 'In stock — ready for pickup'}
                </p>
                <p className="text-xs text-neutral-500">
                  Pickup at {siteConfig.address}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm font-bold text-ink">Quantity</p>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center rounded-md border border-neutral-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-black/5"
                >
                  <MinusIcon />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-ink">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-black/5"
                >
                  <PlusIconSmall />
                </button>
              </div>
            </div>

            <p className="mt-5 text-sm text-neutral-600">
              Subtotal <span className="ml-2 text-xl font-extrabold text-ink">${subtotal}</span>
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                disabled={product.soldOut}
                onClick={() => {
                  addItem(product, qty)
                  navigate('/cart')
                }}
                className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buy Now
              </button>
              <button
                type="button"
                disabled={product.soldOut}
                onClick={() => {
                  addItem(product, qty)
                  setAdded(true)
                  openCart()
                  setTimeout(() => setAdded(false), 1500)
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
                <CartIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-5 text-sm text-neutral-600">
              <button
                type="button"
                onClick={() => toggleItem(product)}
                className={`flex items-center gap-1.5 hover:text-ink ${wishlisted ? 'text-red-500' : ''}`}
              >
                {wishlisted ? <FaHeart className="text-red-500" /> : <HeartOutline />}
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <span className="h-4 w-px bg-neutral-200" />
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-1.5 hover:text-ink"
              >
                <ShareIcon /> Share
              </button>
            </div>
          </aside>
        </div>
      </section>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title={product?.name}
      />

      <section className="container-x border-t border-neutral-200 py-10">
        <h2 className="text-xl font-bold text-ink">
          {pageCopy.title} <span className="font-normal text-neutral-400">&ndash;</span> {pageCopy.subtitle}
        </h2>
        <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-neutral-600">
          {pageCopy.description.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
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
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <AreasServed />
    </>
  )
}
