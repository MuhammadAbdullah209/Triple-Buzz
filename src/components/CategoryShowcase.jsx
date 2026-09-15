import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import ProductCard from './ProductCard'
import { useProducts } from '../context/ProductsContext'
import { categorySlugs } from '../data/siteData'

// Generic version of VapesSection's pattern — a homepage strip for one
// category, built from whatever's already loaded in ProductsContext (no
// separate fetch of its own). Shows an initial page of products with a
// "Load More Products" link that takes the user to the Shop page pre-
// filtered to this category, rather than expanding in place — and, since
// the homepage only ever sees whatever's been paged into context so far,
// not the full catalogue, keeps pulling more backend pages on its own if
// this category has nothing to show yet, so a smaller/later-sorted
// category isn't stuck hidden just because its products haven't loaded in.
export default function CategoryShowcase({ title, categories, initialCount = 6 }) {
  const { products, loading, hasMore, loadMore, loadingMore } = useProducts()
  const matched = products.filter((p) => categories.includes(p.category))

  // Depending on matched.length alone silently stalls when a category has
  // zero matches both before and after the initial page loads (0 → 0 isn't
  // a value React sees as "changed", so the effect never re-runs) —
  // explicitly depending on `loading` guarantees a re-check once the first
  // page actually finishes, same pattern ProductDetail.jsx uses.
  useEffect(() => {
    if (matched.length === 0 && !loading && hasMore && !loadingMore) {
      loadMore()
    }
  }, [matched.length, loading, hasMore, loadingMore])

  if (matched.length === 0) return null

  const visible = matched.slice(0, initialCount)
  // `title` matches a real category label in practice (e.g. "Vape Juice"),
  // so it gets the same clean "/collections/:slug" URL as the header — falls
  // back to the internal multi-value query form if a caller ever passes a
  // title that isn't a recognized label.
  const categoryHref = categorySlugs[title]
    ? `/collections/${categorySlugs[title]}`
    : `/shop?category=${encodeURIComponent(categories.join('|'))}`

  return (
    <section className="container-x py-10">
      <SectionHeader title={title} to={categoryHref} />
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} flat collectionSlug={categorySlugs[title]} />
        ))}
      </div>
      {(matched.length > initialCount || hasMore) && (
        <div className="mt-6 flex justify-center">
          <Link
            to={categoryHref}
            className="rounded-md bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Load More Products
          </Link>
        </div>
      )}
    </section>
  )
}
