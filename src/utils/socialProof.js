// Products synced in from the POS arrive with no sales or review history, so a
// freshly imported catalogue reads as dead stock with zero social proof. These
// helpers backfill display-only "sold" counts and reviews, seeded off the
// product's own id so the same product always shows the same numbers instead
// of re-rolling on every render/reload. None of this is persisted or sent
// anywhere — it only ever affects what's rendered.

function hashSeed(input) {
  const str = String(input || '')
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededRandom(seed) {
  let t = (seed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function randInRange(seed, min, max) {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min
}

function productKey(product) {
  return product?.backendId || product?._id || product?.slug || product?.name || 'product'
}

export function getDisplaySold(product) {
  if (product?.sold > 0) return product.sold
  return randInRange(hashSeed(`${productKey(product)}:sold`), 14, 165)
}

export function getDisplayRating(product) {
  if (product?.reviewCount > 0 && product?.rating) return product.rating
  const seed = hashSeed(`${productKey(product)}:rating`)
  return Math.round((4.3 + seededRandom(seed) * 0.7) * 10) / 10
}

export function getDisplayReviewCount(product) {
  if (product?.reviewCount > 0) return product.reviewCount
  return randInRange(hashSeed(`${productKey(product)}:reviewCount`), 6, 48)
}

// Distributes a fake total across 5/4/3/2/1-star buckets, weighted heavily
// toward 5 and 4 stars like the real breakdown for a well-reviewed product.
export function getDisplayBreakdown(product, total) {
  const seed = hashSeed(`${productKey(product)}:breakdown`)
  const weights = [0.62, 0.24, 0.08, 0.04, 0.02]
  const jittered = weights.map((w, i) => w + (seededRandom(seed + i) - 0.5) * 0.05)
  const sum = jittered.reduce((a, b) => a + b, 0)
  const counts = jittered.map((w) => Math.round((w / sum) * total))
  const diff = total - counts.reduce((a, b) => a + b, 0)
  counts[0] += diff
  return { 5: counts[0], 4: counts[1], 3: counts[2], 2: counts[3], 1: counts[4] }
}

const REVIEWER_NAMES = [
  'Jordan M', 'Taylor R', 'Casey B', 'Morgan L', 'Riley K', 'Sam T',
  'Alex P', 'Jamie C', 'Drew H', 'Cameron W', 'Avery S', 'Peyton G',
  'Quinn D', 'Reese F', 'Skyler N',
]

const REVIEW_COMMENTS = [
  'Exactly what I was looking for and the price was fair. Will buy again.',
  'Good quality, no complaints. Staff also helped me pick it out in store.',
  'Solid product, works as described. Pickup was quick and easy.',
  'Been buying this every month now, never disappoints.',
  'Great value for the price, better than other shops around Austin.',
  'Really happy with this one, exactly as pictured on the site.',
  'Quick pickup, product was fresh and packaged well.',
  'My go-to now, consistent quality every time I grab one.',
  'Better than expected, glad I gave it a shot.',
  'Friendly staff and the product itself is top notch.',
]

const RELATIVE_TIMES = [
  '3 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago',
  '2 months ago', '3 months ago',
]

export function getFakeReviews(product, count = 4) {
  const key = productKey(product)
  const seed = hashSeed(`${key}:reviews`)
  // Offsetting each product's walk through the pools (rather than picking
  // independently per slot) keeps names/comments from repeating within the
  // same product's review list, as long as count stays under each pool size.
  const nameStart = Math.floor(seededRandom(seed) * REVIEWER_NAMES.length)
  const commentStart = Math.floor(seededRandom(seed + 1) * REVIEW_COMMENTS.length)
  return Array.from({ length: count }, (_, i) => {
    const slotSeed = seed + i * 101
    return {
      _id: `fake-${key}-${i}`,
      name: REVIEWER_NAMES[(nameStart + i) % REVIEWER_NAMES.length],
      comment: REVIEW_COMMENTS[(commentStart + i) % REVIEW_COMMENTS.length],
      time: RELATIVE_TIMES[Math.floor(seededRandom(slotSeed) * RELATIVE_TIMES.length)],
      rating: randInRange(slotSeed + 1, 4, 5),
    }
  })
}
