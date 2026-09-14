import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDownIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'
import { useProducts } from '../context/ProductsContext'
import { categoryPageCopy, defaultShopPageCopy, resolveCategoryLabel } from '../data/siteData'

const RATINGS = [5, 4, 3, 2, 1]

export default function Shop() {
  const { products, categoryNames, loading, loadingMore, hasMore, loadMore, error } = useProducts()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category')
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? initialCategory.split('|').filter(Boolean) : []
  )
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [perPage, setPerPage] = useState(9)
  const [page, setPage] = useState(1)
  const [openFilters, setOpenFilters] = useState({ category: true, rating: true, price: true })

  const toggleFilterSection = (key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Shop stays mounted across in-app navigation to /shop (same route, just
  // different query params), so a category picked earlier wouldn't
  // otherwise clear when the user lands here again via a plain "/shop" link
  // — resync the filter from the URL on every navigation, not just the
  // first one.
  useEffect(() => {
    const cat = searchParams.get('category')
    setSelectedCategories(cat ? cat.split('|').filter(Boolean) : [])
    setSearchQuery(searchParams.get('search') || '')
    setPage(1)
  }, [searchParams])

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setPage(1)
  }

  const filtered = useMemo(() => {
    const term = searchQuery.trim().toLowerCase()
    let list = products.filter((p) => {
      const inCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category)
      const price = parseFloat(p.price)
      const aboveMin = !minPrice || price >= parseFloat(minPrice)
      const belowMax = !maxPrice || price <= parseFloat(maxPrice)
      const matchesSearch = !term || p.name.toLowerCase().includes(term)
      return inCategory && aboveMin && belowMax && matchesSearch
    })

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    return list
  }, [products, selectedCategories, searchQuery, minPrice, maxPrice, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  // The full catalogue loads in backend-sized batches rather than all at
  // once (see ProductsContext), so filtering/paging can run out of already-
  // loaded items well before the real result set is exhausted. Whenever that
  // happens, pull in the next batch until either there's enough to fill this
  // page or the backend confirms there's nothing left.
  useEffect(() => {
    if (hasMore && !loadingMore && filtered.length < currentPage * perPage) {
      loadMore()
    }
  }, [hasMore, loadingMore, filtered.length, currentPage, perPage])

  const relatedProducts = products.slice(0, 6)

  const activeCategoryLabel = resolveCategoryLabel(selectedCategories)
  const pageCopy = activeCategoryLabel ? categoryPageCopy[activeCategoryLabel] : defaultShopPageCopy

  return (
    <>
      <section className="container-x pt-10">
        <div className="ml-10">
          <h1 className="text-2xl font-bold leading-tight text-ink sm:text-[28px]">
            {pageCopy.title} <span className="font-normal text-neutral-400">&ndash;</span> {pageCopy.subtitle}
          </h1>
          <p className="mt-1.5 text-sm text-neutral-500">
            {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <div className="border-b border-neutral-200 pb-6">
              <button
                type="button"
                onClick={() => toggleFilterSection('category')}
                aria-expanded={openFilters.category}
                className="mb-3 flex w-full items-center justify-between text-sm font-bold text-ink"
              >
                Category
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${openFilters.category ? 'rotate-180' : ''}`}
                />
              </button>
              {openFilters.category && (
                <>
                  <label className="flex items-center gap-2 py-1 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="h-4 w-4 accent-brand-gold"
                    />
                    All
                  </label>
                  {categoryNames.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 py-1 text-sm text-neutral-600">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="h-4 w-4 accent-brand-gold"
                      />
                      {cat}
                    </label>
                  ))}
                </>
              )}
            </div>

            <div className="border-b border-neutral-200 py-6">
              <button
                type="button"
                onClick={() => toggleFilterSection('rating')}
                aria-expanded={openFilters.rating}
                className="mb-3 flex w-full items-center justify-between text-sm font-bold text-ink"
              >
                Rating
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${openFilters.rating ? 'rotate-180' : ''}`}
                />
              </button>
              {openFilters.rating && (
                <>
                  <label className="flex items-center gap-2 py-1 text-sm text-neutral-600">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-gold" />
                    All
                  </label>
                  {RATINGS.map((r) => (
                    <label key={r} className="flex items-center gap-2 py-1 text-sm text-neutral-600">
                      <input type="checkbox" className="h-4 w-4 accent-brand-gold" />
                      {r} {r === 1 ? 'Star' : 'Stars'}
                    </label>
                  ))}
                </>
              )}
            </div>

            <div className="py-6">
              <button
                type="button"
                onClick={() => toggleFilterSection('price')}
                aria-expanded={openFilters.price}
                className="mb-3 flex w-full items-center justify-between text-sm font-bold text-ink"
              >
                Price
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${openFilters.price ? 'rotate-180' : ''}`}
                />
              </button>
              {openFilters.price && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
                    <span className="text-sm text-neutral-600">$</span>
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value)
                        setPage(1)
                      }}
                      className="w-full text-sm text-ink outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
                    <span className="text-sm text-neutral-600">$</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value)
                        setPage(1)
                      }}
                      className="w-full text-sm text-ink outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>

          <div>
            {searchQuery.trim() && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                <span>
                  Showing results for <span className="font-semibold text-ink">&ldquo;{searchQuery.trim()}&rdquo;</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="font-semibold text-ink hover:text-brand-gold"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-ink focus:outline-none"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">Show</span>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value))
                    setPage(1)
                  }}
                  className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-ink focus:outline-none"
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="py-16 text-center text-sm text-neutral-500">Loading products…</p>
            ) : error ? (
              <p className="py-16 text-center text-sm text-red-600">{error}</p>
            ) : pageItems.length === 0 && !loadingMore ? (
              <p className="py-16 text-center text-sm text-neutral-500">
                No products match your filters.
              </p>
            ) : pageItems.length === 0 ? (
              <p className="py-16 text-center text-sm text-neutral-500">Loading more products…</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
            {loadingMore && pageItems.length > 0 && (
              <p className="py-4 text-center text-xs text-neutral-400">Loading more products…</p>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i + 1)}
                      className={`grid h-9 w-9 place-items-center rounded-md text-sm font-semibold transition ${currentPage === i + 1
                          ? 'bg-ink text-white'
                          : 'text-neutral-600 hover:bg-black/5'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-1.5 rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-black/[0.02] disabled:opacity-40"
                  >
                    &larr; Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="flex items-center gap-1.5 rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-black/[0.02] disabled:opacity-40"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <AreasServed />
    </>
  )
}
