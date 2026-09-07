import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { fetchWishlist, addToWishlistRequest, removeFromWishlistRequest } from '../lib/api'
import { normalizeProduct } from './ProductsContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { isLoggedIn, ready } = useAuth()
  const [items, setItems] = useState([])
  const [pending, setPending] = useState(new Set())

  useEffect(() => {
    if (!ready) return
    if (!isLoggedIn) {
      setItems([])
      return
    }
    let cancelled = false
    fetchWishlist()
      .then((data) => {
        if (!cancelled) setItems((data.products ?? []).map(normalizeProduct))
      })
      .catch(() => {
        if (!cancelled) setItems([])
      })
    return () => {
      cancelled = true
    }
  }, [isLoggedIn, ready])

  const isWishlisted = (backendId) => items.some((i) => i.backendId === backendId)

  const addItem = async (product) => {
    if (!isLoggedIn || !product.backendId) return
    setPending((s) => new Set(s).add(product.backendId))
    try {
      await addToWishlistRequest(product.backendId)
      setItems((prev) =>
        prev.some((i) => i.backendId === product.backendId) ? prev : [product, ...prev]
      )
    } finally {
      setPending((s) => {
        const next = new Set(s)
        next.delete(product.backendId)
        return next
      })
    }
  }

  const removeItem = async (backendId) => {
    if (!isLoggedIn) return
    setPending((s) => new Set(s).add(backendId))
    try {
      await removeFromWishlistRequest(backendId)
      setItems((prev) => prev.filter((i) => i.backendId !== backendId))
    } finally {
      setPending((s) => {
        const next = new Set(s)
        next.delete(backendId)
        return next
      })
    }
  }

  const toggleItem = (product) => {
    if (!product.backendId) return
    if (isWishlisted(product.backendId)) return removeItem(product.backendId)
    return addItem(product)
  }

  const clearWishlist = async () => {
    await Promise.all(items.map((i) => removeFromWishlistRequest(i.backendId).catch(() => {})))
    setItems([])
  }

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isWishlisted: (slugOrId) => items.some((i) => i.backendId === slugOrId || i.slug === slugOrId),
    clearWishlist,
    isPending: (backendId) => pending.has(backendId),
    requiresAuth: !isLoggedIn,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
