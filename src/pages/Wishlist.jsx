import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import AreasServed from '../components/AreasServed'

export default function Wishlist() {
  const { items, clearWishlist } = useWishlist()
  const { addItem, openCart } = useCart()

  const addAllToCart = () => {
    items.filter((item) => !item.soldOut).forEach((item) => addItem(item, 1))
    openCart()
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[640px] px-5 py-24 text-center lg:px-10">
        <h1 className="text-2xl font-bold text-ink">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Tap the heart on any product to save it here for later.
        </p>
        <Link to="/shop" className="btn-gold mt-6 inline-flex">
          Browse the Shop
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>&rsaquo;</span>
          <span className="font-semibold text-ink">Wishlist</span>
        </nav>
      </section>

      <section className="container-x py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-ink">
            My Wishlist <span className="text-base font-normal text-neutral-400">({items.length})</span>
          </h1>
          <div className="flex items-center gap-5">
            <button type="button" onClick={addAllToCart} className="btn-gold">
              Add All to Cart
            </button>
            <button
              type="button"
              onClick={clearWishlist}
              className="text-sm font-semibold text-neutral-400 hover:text-red-500"
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <AreasServed />
    </>
  )
}
