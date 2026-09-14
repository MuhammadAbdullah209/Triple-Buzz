import { useEffect, useRef, useState } from 'react'
import { useProducts } from '../context/ProductsContext'

// Social proof popup — there's no real recent-orders feed to draw from, so
// the "someone just bought this" framing (location, timing) is simulated,
// but the product itself is real: a random pick from the actual POS-synced
// catalogue already loaded in ProductsContext, with its real name and photo.
const LOCATIONS = [
  'Austin, TX',
  'Pflugerville, TX',
  'Round Rock, TX',
  'Georgetown, TX',
  'Cedar Park, TX',
  'Hutto, TX',
  'Kyle, TX',
  'Buda, TX',
  'San Marcos, TX',
  'Waco, TX',
  'Taylor, TX',
]

const DISPLAY_MS = 6000
const INTERVAL_MIN_MS = 20000
const INTERVAL_MAX_MS = 25000

function randomInterval() {
  return INTERVAL_MIN_MS + Math.random() * (INTERVAL_MAX_MS - INTERVAL_MIN_MS)
}

function randomMinutesAgo() {
  return Math.floor(Math.random() * 45) + 2
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function RecentPurchasePopup() {
  const { products } = useProducts()
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)
  const poolRef = useRef([])

  // Only products with a real photo, so the popup never shows a blank
  // placeholder image.
  useEffect(() => {
    poolRef.current = products.filter((p) => p.image)
  }, [products])

  useEffect(() => {
    if (products.length === 0) return

    let showTimer
    let hideTimer

    const showNext = () => {
      const pool = poolRef.current
      if (pool.length > 0) {
        const product = pickRandom(pool)
        setCurrent({
          name: product.name,
          image: product.image,
          location: pickRandom(LOCATIONS),
          minutesAgo: randomMinutesAgo(),
        })
        setVisible(true)
        hideTimer = setTimeout(() => setVisible(false), DISPLAY_MS)
      }
      showTimer = setTimeout(showNext, randomInterval())
    }

    showTimer = setTimeout(showNext, 4000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [products.length])

  if (!visible || !current) return null

  return (
    <div className="fixed bottom-5 left-5 z-40 flex w-[320px] items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl">
      <img
        src={current.image}
        alt={current.name}
        className="h-14 w-14 shrink-0 rounded-md bg-neutral-100 object-contain"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-ink">
          Someone recently bought <span className="font-bold">{current.name}</span> in{' '}
          {current.location}
        </p>
        <p className="mt-1 text-xs text-neutral-400">about {current.minutesAgo} minutes ago</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
        className="shrink-0 text-lg leading-none text-neutral-400 hover:text-ink"
      >
        &times;
      </button>
    </div>
  )
}
