// All content below is placeholder/dummy data for layout purposes.
// Swap prices, images, and copy once real product info is provided.

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const CATEGORIES = ['Shisha Hookah', 'THC Vapes', 'Torches & Lighters', 'Ashtrays & Trays']

const shisha = [
  {
    name: 'Coca Nara Hookah',
    brand: 'COCA NARA',
    meta: '20 PC',
    price: '439.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=Coca+Nara',
  },
  {
    name: 'Starbuzz Carbine Hookah',
    brand: 'STARBUZZ',
    meta: '2 Hose',
    price: '389.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=Starbuzz',
  },
  {
    name: 'Khalil Mamoon Egyptian Hookah',
    brand: 'KHALIL MAMOON',
    meta: 'Handmade',
    price: '459.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=Khalil+Mamoon',
  },
  {
    name: 'MYA Saray Hookah',
    brand: 'MYA',
    meta: 'Single Hose',
    price: '229.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=MYA+Saray',
  },
  {
    name: 'Amira Glass Hookah',
    brand: 'AMIRA',
    meta: 'Glass Base',
    price: '199.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=Amira+Glass',
    soldOut: true,
  },
  {
    name: 'Fumari Shisha Flavor Pack',
    brand: 'FUMARI',
    meta: '250g',
    price: '19.99',
    image: 'https://placehold.co/280x280/163a24/ffffff?text=Fumari+Pack',
  },
]

const vapes = [
  {
    name: 'Destroyer THC-A Live Rosin Badder Panama Red Sativa',
    brand: 'DESTROYER',
    price: '439.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=THC+Vape+1',
  },
  {
    name: 'Destroyer THC-A Diamond Blue Dream Hybrid',
    brand: 'DESTROYER',
    price: '439.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=THC+Vape+2',
  },
  {
    name: 'Flum Pebble Disposable Vape',
    brand: 'FLUM',
    price: '18.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Flum+Pebble',
  },
  {
    name: 'Puffco Proxy Vaporizer',
    brand: 'PUFFCO',
    price: '299.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Puffco+Proxy',
  },
  {
    name: 'Whip-It Torch Vape Bundle',
    brand: 'WHIP-IT!',
    price: '89.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Whip-It+Bundle',
  },
  {
    name: 'Dr. Dabber Switch Vaporizer',
    brand: 'DR. DABBER',
    price: '349.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Dr+Dabber+Switch',
  },
  {
    name: 'Storz & Bickel Mighty+ Vaporizer',
    brand: 'STORZ & BICKEL',
    price: '399.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Mighty+Plus',
    soldOut: true,
  },
  {
    name: 'Swft Mod Live Resin Cartridge',
    brand: 'SWFT MOD',
    price: '44.99',
    image: 'https://placehold.co/280x280/2a1414/ffffff?text=Swft+Mod',
  },
]

const torches = [
  {
    name: 'Bic Classic Lighter',
    brand: 'BIC',
    price: '2.99',
    image: 'https://placehold.co/280x280/1a1a1a/ffffff?text=BIC+Lighter',
  },
  {
    name: 'Blazer Big Buddy Torch',
    brand: 'BLAZER',
    price: '54.99',
    image: 'https://placehold.co/280x280/1a1a1a/ffffff?text=Blazer+Torch',
  },
  {
    name: 'Whip-It Vector Torch',
    brand: 'WHIP-IT!',
    price: '39.99',
    image: 'https://placehold.co/280x280/1a1a1a/ffffff?text=Vector+Torch',
  },
  {
    name: 'Zico Butane Torch Lighter',
    brand: 'ZICO',
    price: '24.99',
    image: 'https://placehold.co/280x280/1a1a1a/ffffff?text=Zico+Torch',
  },
]

const ashtrays = [
  {
    name: 'Wood Rolling Tray - Large',
    brand: null,
    price: '16.99',
    image: 'https://placehold.co/280x280/3a3a3a/ffffff?text=Rolling+Tray',
  },
  {
    name: 'Ceramic Ashtray - Round',
    brand: null,
    price: '9.99',
    image: 'https://placehold.co/280x280/3a3a3a/ffffff?text=Ceramic+Ashtray',
  },
  {
    name: 'Glass Ashtray - Smoke',
    brand: null,
    price: '12.99',
    image: 'https://placehold.co/280x280/3a3a3a/ffffff?text=Glass+Ashtray',
  },
  {
    name: 'Metal Skull Ashtray',
    brand: null,
    price: '14.99',
    image: 'https://placehold.co/280x280/3a3a3a/ffffff?text=Skull+Ashtray',
  },
]

function withCategory(list, category) {
  return list.map((p) => ({ ...p, category, slug: slugify(p.name) }))
}

export const SHISHA_PRODUCTS = withCategory(shisha, 'Shisha Hookah')
export const VAPE_PRODUCTS = withCategory(vapes, 'THC Vapes')
export const TORCH_PRODUCTS = withCategory(torches, 'Torches & Lighters')
export const ASHTRAY_PRODUCTS = withCategory(ashtrays, 'Ashtrays & Trays')

export const ALL_PRODUCTS = [
  ...SHISHA_PRODUCTS,
  ...VAPE_PRODUCTS,
  ...TORCH_PRODUCTS,
  ...ASHTRAY_PRODUCTS,
]

export function findProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}
