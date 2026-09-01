import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ALL_PRODUCTS, findProductBySlug } from '../data/products'
import { siteConfig } from '../data/siteData'
import { StarIcon, CartIcon, ChevronDownIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'
import { useCart } from '../context/CartContext'

const CATEGORY_BLURB = {
  'Shisha Hookah':
    'Part of our Shisha Hookah lineup — premium hookahs, bases, and flavor packs, always in stock at the shop.',
  'THC Vapes': 'Part of our THC Vapes lineup — trusted brands, lab-tested and ready for pickup.',
  'Torches & Lighters':
    'Part of our Torches & Lighters lineup — reliable butane torches and everyday lighters.',
  'Ashtrays & Trays':
    'Part of our Ashtrays & Trays lineup — rolling trays and ashtrays for everyday use.',
}

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

const REVIEWS = [
  {
    name: 'Jordan M.',
    date: 'Aug 24, 2026',
    rating: 5,
    text: 'Great quality and fast pickup. Staff walked me through everything I needed to know.',
  },
  {
    name: 'Casey R.',
    date: 'Aug 15, 2026',
    rating: 5,
    text: 'This is my go-to now. Consistent quality every time I visit the shop.',
  },
  {
    name: 'Alex P.',
    date: 'Aug 3, 2026',
    rating: 5,
    text: 'Exactly what I was looking for. Will definitely order again.',
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

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.8 8.8 0 0 1-4-1L3 20l1-5.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 1 1 21 11.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const TABS = ['Reviews', 'Discussion', 'FAQs']

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = findProductBySlug(slug)
  const [qty, setQty] = useState(1)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeTab, setActiveTab] = useState('Reviews')
  const [openFaq, setOpenFaq] = useState(2)
  const [added, setAdded] = useState(false)

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

  const subtotal = (parseFloat(product.price) * qty).toFixed(2)
  const related = ALL_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 6)
  const blurb =
    CATEGORY_BLURB[product.category] ||
    `Part of our ${product.category} lineup at ${siteConfig.name}.`

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
                        <p className="text-3xl font-extrabold text-ink">5.0/5.0</p>
                        <p className="text-xs text-neutral-500">
                          {REVIEWS.length} ratings &bull; {REVIEWS.length} reviews
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = REVIEWS.filter((r) => r.rating === star).length
                        const pct = Math.round((count / REVIEWS.length) * 100)
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
                      <button
                        type="button"
                        className="rounded-md border border-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-goldDark hover:bg-amber-50"
                      >
                        Write Review
                      </button>
                    </div>

                    <div className="flex flex-col gap-6">
                      {REVIEWS.map((r) => (
                        <div key={r.name} className="border-b border-neutral-200 pb-6">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                              {r.name[0]}
                            </span>
                            <div>
                              <p className="text-sm font-bold text-ink">{r.name}</p>
                              <p className="text-xs text-neutral-400">{r.date}</p>
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
                          <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Discussion' && (
                <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
                  The statements made regarding these products have not been evaluated by the Food
                  and Drug Administration. The efficacy of these products has not been confirmed by
                  FDA-approved research. These products are not intended to diagnose, treat, cure,
                  or prevent any disease. All information presented here is not meant as a
                  substitute for or alternative to information from health care practitioners.
                  Please consult your health care professional about potential interactions or
                  other possible complications before using any product. The Federal Food, Drug,
                  and Cosmetic Act require this notice.
                </p>
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
              <span className="font-semibold text-ink">5.0/5.0</span>
              <span className="text-neutral-300">|</span>
              <span>{REVIEWS.length} Reviews</span>
              <span className="text-neutral-300">|</span>
              <span>300 sold</span>
            </div>

            {!product.soldOut && (
              <span className="mt-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-goldDark">
                Best Seller
              </span>
            )}

            <p className="mt-4 text-3xl font-extrabold text-ink">${product.price}</p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {showFullDesc
                ? `${blurb} Every batch is checked for quality before it reaches the shelf. Stop by our Pflugerville location or grab it in the shop for pickup.`
                : blurb}{' '}
              <button
                type="button"
                onClick={() => setShowFullDesc((v) => !v)}
                className="font-semibold text-ink hover:text-brand-gold"
              >
                {showFullDesc ? 'View Less' : 'View More'}
              </button>
            </p>

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
                  setTimeout(() => setAdded(false), 1500)
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
                <CartIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-5 text-sm text-neutral-600">
              <button type="button" className="flex items-center gap-1.5 hover:text-ink">
                <ChatIcon /> Chat
              </button>
              <span className="h-4 w-px bg-neutral-200" />
              <button type="button" className="flex items-center gap-1.5 hover:text-ink">
                <HeartOutline /> Wishlist
              </button>
              <span className="h-4 w-px bg-neutral-200" />
              <button type="button" className="flex items-center gap-1.5 hover:text-ink">
                <ShareIcon /> Share
              </button>
            </div>
          </aside>
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
