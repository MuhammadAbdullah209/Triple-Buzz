import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../lib/api'

const ProductsContext = createContext(null)

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Shared shape used everywhere in the app (ProductCard, Cart, Wishlist,
// ProductDetail) — `backendId` is the real MongoDB _id, `slug` is derived
// client-side from the name so /shop/:slug URLs keep working without the
// backend needing a slug field of its own.
export function normalizeProduct(p) {
  return {
    backendId: p._id,
    slug: slugify(p.name),
    name: p.name,
    brand: p.brand || null,
    meta: null,
    price: String(p.price),
    image: p.image?.[0]?.url,
    images: p.image?.map((i) => i.url) ?? [],
    category: p.category,
    soldOut: (p.stock ?? 0) <= 0,
    stock: p.stock,
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchProducts(1, 'triplebuzz', 100)
      .then((data) => {
        if (!cancelled) setProducts((data.products ?? []).map(normalizeProduct))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load products.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    const byName = new Map()
    for (const p of products) {
      if (!byName.has(p.category)) {
        byName.set(p.category, { name: p.category, count: 0, image: p.image })
      }
      byName.get(p.category).count += 1
    }
    return Array.from(byName.values())
  }, [products])

  const value = {
    products,
    loading,
    error,
    categories,
    categoryNames: categories.map((c) => c.name),
    findBySlug: (slug) => products.find((p) => p.slug === slug),
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider')
  return ctx
}
