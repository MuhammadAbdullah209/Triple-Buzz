import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, flat = false }) {
  const { addItem, openCart } = useCart()

  return (
    <div className={`group flex flex-col bg-white ${flat ? '' : 'overflow-hidden rounded-md border border-neutral-200 card-shadow'}`}>
      <Link to={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.soldOut && (
          <span className="absolute left-2 top-2  bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Sold Out
          </span>
        )}
      </Link>
      <div className={`flex flex-1 flex-col gap-1 ${flat ? 'px-2.5 pt-2.5 pb-1.5' : 'px-3 pt-3 pb-2'}`}>
        {product.brand && (
          <p className={`font-medium uppercase tracking-wide text-neutral-400 ${flat ? 'text-[10px]' : 'text-[11px]'}`}>
            {product.brand}
          </p>
        )}
        <Link
          to={`/shop/${product.slug}`}
          className={`line-clamp-2 font-semibold leading-tight text-ink hover:text-brand-goldDark ${
            flat ? 'min-h-[2rem] text-xs' : 'min-h-[2.5rem] text-sm'
          }`}
        >
          {product.name}
        </Link>
        {product.meta && <p className={`text-ink ${flat ? 'text-xs' : 'text-sm'}`}>{product.meta}</p>}
        <p className={`mt-1 font-semibold text-ink ${flat ? 'text-sm' : 'text-base'}`}>${product.price}</p>
      </div>
      <button
        type="button"
        disabled={product.soldOut}
        onClick={() => {
          addItem(product, 1)
          openCart()
        }}
        className={`btn-dark disabled:cursor-not-allowed disabled:opacity-40 !rounded-none ${
          flat ? 'py-2 text-[11px]' : ''
        }`}
      >
        {product.soldOut ? 'Sold Out' : 'Add to cart'}
      </button>
    </div>
  )
}
