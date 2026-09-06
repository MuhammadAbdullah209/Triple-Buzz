import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug)
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: parseFloat(product.price),
          image: product.image,
          category: product.category,
          qty,
          protection: false,
        },
      ]
    })
  }

  const updateQty = (slug, qty) => {
    setItems((prev) => {
      if (qty < 1) return prev.filter((i) => i.slug !== slug)
      return prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    })
  }

  const removeItem = (slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const toggleProtection = (slug) => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, protection: !i.protection } : i))
    )
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])
  const protectionTotal = useMemo(
    () => items.reduce((s, i) => s + (i.protection ? i.qty * 1 : 0), 0),
    [items]
  )

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    toggleProtection,
    clearCart,
    subtotal,
    protectionTotal,
    isCartOpen,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
