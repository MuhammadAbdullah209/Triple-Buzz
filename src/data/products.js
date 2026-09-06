// Prices below are estimates for layout purposes where the real price wasn't provided.
// Swap them once real pricing is confirmed.

import cocoNaraCharcoal from './../assets/images/products/coco-nara-charcoal.jpg'
import threeKingsCharcoal from './../assets/images/products/three-kings-charcoal.jpg'
import alFakherLemonMint from './../assets/images/products/al-fakher-lemon-mint.jpg'
import alFakherOrangeMint from './../assets/images/products/al-fakher-orange-mint.jpg'
import alFakherGumMint from './../assets/images/products/al-fakher-gum-mint.jpg'
import alFakherMelon from './../assets/images/products/al-fakher-melon.jpg'
import casinoGlassAshtrays from './../assets/images/products/casino-glass-ashtrays.png'
import geekNextX50000 from './../assets/images/products/geek-next-x50000.jpg'
import disposableVape60k from './../assets/images/products/disposable-vape-60k.png'
import fvkdIceCreamCake from './../assets/images/products/fvkd-ice-cream-cake.jpg'
import smokMCoil from './../assets/images/products/smok-m-coil.png'
import wyldGummies from './../assets/images/products/wyld-huckleberry-gummies.png'
import torchSeltzer from './../assets/images/products/torch-seltzer-pineapple-twist.jpg'
import qcarboDetox from './../assets/images/products/qcarbo-detox-tropical.jpg'
import muskyZeinaPerfume from './../assets/images/products/musky-zeina-perfume.png'
import aleafGrinder from './../assets/images/products/aleaf-grinder.jpg'
import quartzBanger from './../assets/images/products/quartz-banger.jpg'
import torchPhoto from '../assets/images/hero-slide-4.png'

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const CATEGORIES = [
  'Shisha Hookah',
  'THC Vapes',
  'Torches & Lighters',
  'Ashtrays & Trays',
  'THC Gummies',
  'THC Drinks',
  'Detox',
  'Perfumes',
  'Smoking Accessories',
]

const shisha = [
  {
    name: 'Coco Nara Natural Coconut Charcoal',
    brand: 'COCO NARA',
    meta: 'Coconut Charcoal',
    price: '14.99',
    image: cocoNaraCharcoal,
  },
  {
    name: 'Three Kings Charcoal Briquettes',
    brand: 'THREE KINGS',
    meta: 'Large Size',
    price: '8.99',
    image: threeKingsCharcoal,
  },
  {
    name: 'Al Fakher Lemon with Mint Shisha',
    brand: 'AL FAKHER',
    meta: '50g',
    price: '6.99',
    image: alFakherLemonMint,
  },
  {
    name: 'Al Fakher Orange with Mint Shisha',
    brand: 'AL FAKHER',
    meta: '250g',
    price: '21.99',
    image: alFakherOrangeMint,
  },
  {
    name: 'Al Fakher Gum with Mint Shisha',
    brand: 'AL FAKHER',
    meta: '50g',
    price: '6.99',
    image: alFakherGumMint,
    soldOut: true,
  },
  {
    name: 'Al Fakher Melon Shisha',
    brand: 'AL FAKHER',
    meta: 'Authentic Hookah Tobacco',
    price: '21.99',
    image: alFakherMelon,
  },
]

const vapes = [
  {
    name: 'Destroyer THC-A Live Rosin Badder Panama Red Sativa',
    brand: 'DESTROYER',
    price: '439.99',
    image: geekNextX50000,
  },
  {
    name: 'Destroyer THC-A Diamond Blue Dream Hybrid',
    brand: 'DESTROYER',
    price: '439.99',
    image: disposableVape60k,
  },
  {
    name: 'Geek Next X50000 Disposable Vape - Miami Mint',
    brand: 'GEEK NEXT',
    meta: '50000 Puffs',
    price: '34.99',
    image: geekNextX50000,
  },
  {
    name: 'Puffco Proxy Vaporizer',
    brand: 'PUFFCO',
    price: '299.99',
    image: fvkdIceCreamCake,
  },
  {
    name: '60K Puffs Disposable Vape',
    brand: null,
    meta: '60000 Puffs',
    price: '29.99',
    image: disposableVape60k,
  },
  {
    name: 'Dr. Dabber Switch Vaporizer',
    brand: 'DR. DABBER',
    price: '349.99',
    image: smokMCoil,
  },
  {
    name: 'FVKD Premium Disposable - Ice Cream Cake',
    brand: 'FVKD',
    meta: '3.5g THCA Badder',
    price: '44.99',
    image: fvkdIceCreamCake,
    soldOut: true,
  },
  {
    name: 'Smok M-Coil Replacement Coils (5-Pack)',
    brand: 'SMOK',
    meta: '0.6Ω',
    price: '12.99',
    image: smokMCoil,
  },
]

const torches = [
  {
    name: 'Bic Classic Lighter',
    brand: 'BIC',
    price: '2.99',
    image: torchPhoto,
  },
  {
    name: 'Blazer Big Buddy Torch',
    brand: 'BLAZER',
    price: '54.99',
    image: torchPhoto,
  },
  {
    name: 'Whip-It Vector Torch',
    brand: 'WHIP-IT!',
    price: '39.99',
    image: torchPhoto,
  },
  {
    name: 'Zico Butane Torch Lighter',
    brand: 'ZICO',
    price: '24.99',
    image: torchPhoto,
  },
]

const ashtrays = [
  {
    name: 'Wood Rolling Tray - Large',
    brand: null,
    price: '16.99',
    image: casinoGlassAshtrays,
  },
  {
    name: 'Ceramic Ashtray - Round',
    brand: null,
    price: '9.99',
    image: casinoGlassAshtrays,
  },
  {
    name: 'Casino Royal Glass Ashtray',
    brand: null,
    meta: 'Assorted Designs',
    price: '14.99',
    image: casinoGlassAshtrays,
  },
  {
    name: 'Metal Skull Ashtray',
    brand: null,
    price: '14.99',
    image: casinoGlassAshtrays,
  },
]

const gummies = [
  {
    name: 'Wyld Huckleberry Gummies',
    brand: 'WYLD',
    meta: '10ct, 10mg THC each',
    price: '18.99',
    image: wyldGummies,
  },
]

const drinks = [
  {
    name: 'Torch THC Seltzer - Pineapple Twist',
    brand: 'TORCH',
    meta: '60mg THC, 12 FL OZ',
    price: '9.99',
    image: torchSeltzer,
  },
]

const detox = [
  {
    name: 'Herbal Clean Q Carbo 16 Detox - Tropical',
    brand: 'HERBAL CLEAN',
    meta: 'Same-Day Detox, 16oz',
    price: '34.99',
    image: qcarboDetox,
  },
]

const fragrance = [
  {
    name: 'Musky Zeina Concentrated Perfume Oil',
    brand: 'MUSKY',
    meta: '6ml',
    price: '12.99',
    image: muskyZeinaPerfume,
  },
]

const accessories = [
  {
    name: 'aLeaf 2-Piece Herb Grinder',
    brand: 'ALEAF',
    meta: '2-Piece',
    price: '16.99',
    image: aleafGrinder,
  },
  {
    name: 'Quartz Banger Nail',
    brand: null,
    price: '19.99',
    image: quartzBanger,
  },
]

function withCategory(list, category) {
  return list.map((p) => ({ ...p, category, slug: slugify(p.name) }))
}

export const SHISHA_PRODUCTS = withCategory(shisha, 'Shisha Hookah')
export const VAPE_PRODUCTS = withCategory(vapes, 'THC Vapes')
export const TORCH_PRODUCTS = withCategory(torches, 'Torches & Lighters')
export const ASHTRAY_PRODUCTS = withCategory(ashtrays, 'Ashtrays & Trays')
export const GUMMY_PRODUCTS = withCategory(gummies, 'THC Gummies')
export const DRINK_PRODUCTS = withCategory(drinks, 'THC Drinks')
export const DETOX_PRODUCTS = withCategory(detox, 'Detox')
export const FRAGRANCE_PRODUCTS = withCategory(fragrance, 'Perfumes')
export const ACCESSORY_PRODUCTS = withCategory(accessories, 'Smoking Accessories')

export const ALL_PRODUCTS = [
  ...SHISHA_PRODUCTS,
  ...VAPE_PRODUCTS,
  ...TORCH_PRODUCTS,
  ...ASHTRAY_PRODUCTS,
  ...GUMMY_PRODUCTS,
  ...DRINK_PRODUCTS,
  ...DETOX_PRODUCTS,
  ...FRAGRANCE_PRODUCTS,
  ...ACCESSORY_PRODUCTS,
]

export function findProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}
