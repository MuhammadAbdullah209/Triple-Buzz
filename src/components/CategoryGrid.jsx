import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { categories } from '../data/siteData'

export default function CategoryGrid() {
  return (
    <section className="container-x py-10">
      <SectionHeader title="Shop By Categories" to="/shop" />
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 sm:grid-cols-4 sm:divide-y-0">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group flex flex-col gap-3 p-5 transition-colors hover:bg-neutral-50"
          >
            <div className="aspect-square overflow-hidden rounded bg-black">
              <img
                src={cat.img}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
              {cat.count} Products
            </p>
            <p className="text-sm font-semibold text-ink">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
