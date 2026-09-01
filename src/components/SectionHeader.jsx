import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function SectionHeader({ title, showViewAll = true, to = '/shop' }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="section-title">{title}</h2>
      {showViewAll && (
        <Link to={to} className="flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-gold">
          View All <FiArrowRight className="text-xs" />
        </Link>
      )}
    </div>
  )
}
