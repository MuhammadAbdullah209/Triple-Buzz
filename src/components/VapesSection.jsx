import SectionHeader from './SectionHeader'
import ProductCard from './ProductCard'
import { VAPE_PRODUCTS } from '../data/products'

export default function VapesSection() {
  return (
    <section className="container-x py-10">
      <SectionHeader title="THC Vapes" to="/shop?category=THC%20Vapes" />
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
        {VAPE_PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} flat />
        ))}
      </div>
    </section>
  )
}
