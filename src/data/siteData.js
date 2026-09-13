// All content below is placeholder/dummy data for layout purposes.
// Swap the logo, images, and copy once real client assets are provided.

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
// Two generations of category values coexist in the data: the original
// hand-picked Title-Case names (a couple dozen manually-added products) and
// the real, all-caps names Lightspeed uses for the much larger synced
// catalogue (e.g. "THC Vapes" vs "THC VAPES", or "Ashtrays & Trays" vs
// "ASHTRAYS AND TRAYS" — not just casing, sometimes different wording
// entirely). Every entry below lists both so a category link surfaces
// products from either generation instead of silently matching nothing.
export const categoryFilterMap = {
  // top-level — the union of each subcategory's mapping below
  Vaping: ['THC Vapes', 'BATTERIES', 'COILS AND PODS', 'DISPOSABLE VAPES', 'VAPE JUICE', 'VAPE MODS', 'VAPORIZERS'],
  'Smoking Accessories': [
    'Smoking Accessories', 'Torches & Lighters', 'Ashtrays & Trays',
    'ASHTRAYS AND TRAYS', 'BANGERS', 'CIGARILLOS', 'GLASS', 'GRINDER',
    'OIL BURNERS', 'PAPERS AND CONES', 'TORCHES, LIGHTERS AND BUTANE',
  ],
  Hookah: ['Shisha Hookah', 'HOOKAH AND ACCESORIES', 'SHISHA AND COAL'],
  THC: ['THC Vapes', 'THC Gummies', 'THC Drinks', 'THC', 'FLOWER', 'GUMMIES', 'PRE-ROLLS', 'THC DRINKS', 'THC VAPES'],
  Wellness: ['Detox', 'DETOX', 'HYDROXY AND KRATOM', 'SEX PILLS'],
  Fragrance: ['Perfumes', 'PERFUMES', 'AIR FRESHENERS, INCENSE AND CANDLES'],
  'Bags & Scales': ['BAGS', 'POUCHES', 'SCALE'],
  Novelty: ['DRINKS', 'EXOTIC', 'GENERAL', 'GIFT KIT'],
  'Whip It': ['WHIP IT'],

  // subcategories
  Batteries: ['THC Vapes', 'BATTERIES'],
  'Coils and Pods': ['THC Vapes', 'COILS AND PODS'],
  'Disposable Vapes': ['THC Vapes', 'DISPOSABLE VAPES'],
  'Vape Juice': ['THC Vapes', 'VAPE JUICE'],
  'Vape Mods': ['THC Vapes', 'VAPE MODS'],
  Vaporizers: ['THC Vapes', 'VAPORIZERS'],
  'Ashtrays and Trays': ['Ashtrays & Trays', 'ASHTRAYS AND TRAYS'],
  Bangers: ['Smoking Accessories', 'BANGERS'],
  Cigarillos: ['CIGARILLOS'],
  Glass: ['GLASS'],
  Grinder: ['Smoking Accessories', 'GRINDER'],
  'Oil Burners': ['OIL BURNERS'],
  'Papers and Cones': ['PAPERS AND CONES'],
  'Torches, Lighters and Butane': ['Torches & Lighters', 'TORCHES, LIGHTERS AND BUTANE'],
  'Hookah and Accessories': ['Shisha Hookah', 'HOOKAH AND ACCESORIES'],
  'Shisha and Coal': ['Shisha Hookah', 'SHISHA AND COAL'],
  Flower: ['FLOWER'],
  Gummies: ['THC Gummies', 'GUMMIES'],
  'Pre-Rolls': ['PRE-ROLLS'],
  'THC Drinks': ['THC Drinks', 'THC DRINKS'],
  'THC Vapes': ['THC Vapes', 'THC VAPES'],
  Detox: ['Detox', 'DETOX'],
  'Hydroxy and Kratom': ['HYDROXY AND KRATOM'],
  'Sex Pills': ['SEX PILLS'],
  'Air Fresheners, Incense and Candles': ['AIR FRESHENERS, INCENSE AND CANDLES'],
  Perfumes: ['Perfumes', 'PERFUMES'],
  Bags: ['BAGS'],
  Pouches: ['POUCHES'],
  Scale: ['SCALE'],
  Drinks: ['DRINKS'],
  Exotic: ['EXOTIC'],
  General: ['GENERAL'],
  'Gift Kit': ['GIFT KIT'],
  // Snacks: no Lightspeed category backs this yet — intentionally left
  // unmapped, per the note above, rather than guessing a wrong match.
}

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
