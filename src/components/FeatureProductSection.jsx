import ProductCard from './ProductCard'

// Promo tile (image + floating label) beside a flat divided product grid.
// Used for "Shisha/Hookah" and "Torches & Lighter".
export default function FeatureProductSection({ title, promoImg, products, columns = 4 }) {
  return (
    <section className="container-x py-6">
      <h2 className="mb-3 text-base font-semibold text-ink">{title}</h2>
      <div className="flex flex-col overflow-hidden rounded border border-ink/80 lg:flex-row">
        <div className="relative h-[160px] shrink-0 lg:h-auto lg:w-[24%]">
          <img src={promoImg} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded bg-white px-3 py-2 text-xs font-semibold text-ink shadow">
            {title}
          </span>
        </div>
        <div
          className={`grid flex-1 grid-cols-2 divide-x divide-y divide-neutral-200 sm:divide-y-0 ${
            columns === 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-4'
          }`}
          style={{ gridAutoRows: '1fr' }}
        >
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} flat />
          ))}
        </div>
      </div>
    </section>
  )
}
