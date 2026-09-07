import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDownIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'
import { useProducts } from '../context/ProductsContext'

const RATINGS = [5, 4, 3, 2, 1]

export default function Shop() {
  const { products, categoryNames, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category')
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? initialCategory.split(',').filter(Boolean) : []
  )
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [perPage, setPerPage] = useState(9)
  const [page, setPage] = useState(1)

  useEffect(() => {
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

  const relatedProducts = products.slice(0, 6)

  return (
    <>
      <section className="container-x py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <div className="border-b border-neutral-200 pb-6">
              <p className="mb-3 flex items-center justify-between text-sm font-bold text-ink">
                Category
                <ChevronDownIcon className="h-4 w-4" />
              </p>
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
            </div>

            <div className="border-b border-neutral-200 py-6">
              <p className="mb-3 flex items-center justify-between text-sm font-bold text-ink">
                Rating
                <ChevronDownIcon className="h-4 w-4" />
              </p>
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
            </div>

            <div className="py-6">
              <p className="mb-3 flex items-center justify-between text-sm font-bold text-ink">
                Price
                <ChevronDownIcon className="h-4 w-4" />
              </p>
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
            ) : pageItems.length === 0 ? (
              <p className="py-16 text-center text-sm text-neutral-500">
                No products match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
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
