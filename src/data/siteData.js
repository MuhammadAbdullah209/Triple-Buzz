// All content below is placeholder/dummy data for layout purposes.
// Swap the logo, images, and copy once real client assets are provided.

import {
  SHISHA_PRODUCTS,
  VAPE_PRODUCTS,
  TORCH_PRODUCTS,
  ASHTRAY_PRODUCTS,
  GUMMY_PRODUCTS,
  DRINK_PRODUCTS,
  DETOX_PRODUCTS,
  FRAGRANCE_PRODUCTS,
  ACCESSORY_PRODUCTS,
} from './products'

export const siteConfig = {
  name: 'Triple Buzz',
  tagline: 'Smoke & Vape Shop',
  phone: '+1 512-297-2131',
  email: 'triplebuzzsmokeandvape@gmail.com',
  address: '801 Wells Branch Pkwy #115, Pflugerville',
  freeShippingNote: 'FREE SHIPPING ON ORDERS OVER $50 (CONTINENTAL U.S. ONLY)',
}

export const navLinks = [
  { label: 'Home', columns: null },
  { label: 'About', columns: null },
  { label: 'Shop', columns: null },
  { label: 'Contact Us', columns: null },
]

// Mirrors the live triplebuzzsmokeshop.com category structure, shown in the
// "Shop" mega menu as a wrapping grid of category columns.
export const shopCategories = [
  {
    label: 'Vaping',
    subcategories: ['Batteries', 'Coils and Pods', 'Disposable Vapes', 'Vape Juice', 'Vape Mods', 'Vaporizers'],
  },
  {
    label: 'Smoking Accessories',
    subcategories: [
      'Ashtrays and Trays',
      'Bangers',
      'Cigarillos',
      'Glass',
      'Grinder',
      'Oil Burners',
      'Papers and Cones',
      'Torches, Lighters and Butane',
    ],
  },
  {
    label: 'Hookah',
    subcategories: ['Hookah and Accessories', 'Shisha and Coal'],
  },
  {
    label: 'THC',
    subcategories: ['Flower', 'Gummies', 'Pre-Rolls', 'THC Drinks', 'THC Vapes'],
  },
  {
    label: 'Wellness',
    subcategories: ['Detox', 'Hydroxy and Kratom', 'Sex Pills'],
  },
  {
    label: 'Fragrance',
    subcategories: ['Air Fresheners, Incense and Candles', 'Perfumes'],
  },
  {
    label: 'Bags & Scales',
    subcategories: ['Bags', 'Pouches', 'Scale'],
  },
  {
    label: 'Novelty',
    subcategories: ['Drinks', 'Exotic', 'General', 'Gift Kit', 'Snacks'],
  },
  {
    label: 'Whip It',
    subcategories: [],
  },
]

// The mega-menu mirrors the full taxonomy of the live site, but we only carry
// product data for the categories below. This maps every top-level/sub label
// used in the "Shop" dropdown to the real category (or categories) it should
// filter to. Labels with no mapping fall through unmapped on purpose, so they
// honestly show "no products match" instead of silently showing everything.
export const categoryFilterMap = {
  // top-level
  Vaping: ['THC Vapes'],
  'Smoking Accessories': ['Smoking Accessories', 'Torches & Lighters', 'Ashtrays & Trays'],
  Hookah: ['Shisha Hookah'],
  THC: ['THC Vapes', 'THC Gummies', 'THC Drinks'],
  Wellness: ['Detox'],
  Fragrance: ['Perfumes'],
  // subcategories
  Batteries: ['THC Vapes'],
  'Coils and Pods': ['THC Vapes'],
  'Disposable Vapes': ['THC Vapes'],
  'Vape Juice': ['THC Vapes'],
  'Vape Mods': ['THC Vapes'],
  Vaporizers: ['THC Vapes'],
  'Ashtrays and Trays': ['Ashtrays & Trays'],
  Bangers: ['Smoking Accessories'],
  Grinder: ['Smoking Accessories'],
  'Torches, Lighters and Butane': ['Torches & Lighters'],
  'Hookah and Accessories': ['Shisha Hookah'],
  'Shisha and Coal': ['Shisha Hookah'],
  Gummies: ['THC Gummies'],
  'THC Drinks': ['THC Drinks'],
  'THC Vapes': ['THC Vapes'],
  Detox: ['Detox'],
  Perfumes: ['Perfumes'],
}

export const categories = [
  { id: 1, name: 'Shisha Hookah', count: SHISHA_PRODUCTS.length, img: SHISHA_PRODUCTS[0].image },
  { id: 2, name: 'THC Vapes', count: VAPE_PRODUCTS.length, img: VAPE_PRODUCTS[0].image },
  { id: 3, name: 'Torches & Lighters', count: TORCH_PRODUCTS.length, img: TORCH_PRODUCTS[0].image },
  { id: 4, name: 'Ashtrays & Trays', count: ASHTRAY_PRODUCTS.length, img: ASHTRAY_PRODUCTS[0].image },
  { id: 5, name: 'THC Gummies', count: GUMMY_PRODUCTS.length, img: GUMMY_PRODUCTS[0].image },
  { id: 6, name: 'THC Drinks', count: DRINK_PRODUCTS.length, img: DRINK_PRODUCTS[0].image },
  { id: 7, name: 'Detox', count: DETOX_PRODUCTS.length, img: DETOX_PRODUCTS[0].image },
  { id: 8, name: 'Perfumes', count: FRAGRANCE_PRODUCTS.length, img: FRAGRANCE_PRODUCTS[0].image },
  { id: 9, name: 'Smoking Accessories', count: ACCESSORY_PRODUCTS.length, img: ACCESSORY_PRODUCTS[0].image },
]

export const blogPosts = [
  { id: 1, title: 'Kick Back with the Best Shisha in Pflugerville at Triple Buzz Smoke Shop', badge: null },
  { id: 2, title: 'THC Vape Buying Guide: Pods, Disposables & Batteries Explained', badge: 'NEW' },
  { id: 3, title: '5 Torch Lighter Safety Tips Every Dab Rig Owner Should Know', badge: null },
]

// Real reviews pulled from the shop's live Google Business listing (snapshot
// taken 2026-09-07). Not a live feed — see the note where `testimonials` is
// used if you want to refresh this later.
export const googleRating = { value: 4.8, count: 597 }

export const testimonials = [
  { id: 1, name: 'Celeste Gonzales', timeAgo: 'a month ago', initial: 'C', avatarColor: '#2b8a3e', rating: 5, text: 'My partner and I have been wanting to visit this smoke shop and finally stopped by. The owner took good care of us and was so helpful with my basic/simple questions. We will definitely be back! 10/10' },
  { id: 2, name: 'Bola Omoniyi', timeAgo: '2 months ago', initial: 'B', avatarColor: '#e8590c', rating: 5, text: 'Sabre was awesome. His customer service was top notch. This place also has variety of things you’re looking for. Highly recommend' },
  { id: 3, name: 'Ms. Altonia', timeAgo: 'a month ago', initial: 'A', avatarColor: '#d6336c', rating: 5, text: 'Had a great time shopping here. The staff was super helpful!! Definitely coming back!' },
  { id: 4, name: 'Desiree Wilson', timeAgo: '3 months ago', initial: 'D', avatarColor: '#495057', rating: 5, text: 'Mohammad was extremely knowledgeable and friendly. As a first time customer he was very welcoming and answered all my questions. 10/10 experience and I will be back!' },
  { id: 5, name: 'Jessica Hawkins-Washington', timeAgo: '3 months ago', initial: 'J', avatarColor: '#1971c2', rating: 5, text: 'Mohammed was so awesome. Great service, had exactly what I needed, friendly and well stocked! Definitely recommend.' },
  { id: 6, name: 'William Anderson', timeAgo: '2 months ago', initial: 'W', avatarColor: '#9c36b5', rating: 5, text: 'Best deals in the city, come tap in with my friend.' },
]

export const areas = [
  {
    title: 'Central & North Austin',
    places: ['North Lamar', 'The Domain', 'North Burnet', 'Allandale', 'Crestview', 'Hyde Park', 'Brentwood', 'Georgian Acres', 'Walnut Creek', 'Tech Ridge'],
  },
  {
    title: 'North & Northwest',
    places: ['Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Wells Branch', 'Jollyville'],
  },
]
