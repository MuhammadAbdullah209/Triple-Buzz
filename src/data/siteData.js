// All content below is placeholder/dummy data for layout purposes.
// Swap the logo, images, and copy once real client assets are provided.

import { SHISHA_PRODUCTS, VAPE_PRODUCTS, TORCH_PRODUCTS, ASHTRAY_PRODUCTS } from './products'

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

export const categories = [
  { id: 1, name: 'Shisha Hookah', count: SHISHA_PRODUCTS.length, img: SHISHA_PRODUCTS[0].image },
  { id: 2, name: 'THC Vapes', count: VAPE_PRODUCTS.length, img: VAPE_PRODUCTS[0].image },
  { id: 3, name: 'Torches & Lighters', count: TORCH_PRODUCTS.length, img: TORCH_PRODUCTS[0].image },
  { id: 4, name: 'Ashtrays & Trays', count: ASHTRAY_PRODUCTS.length, img: ASHTRAY_PRODUCTS[0].image },
]

export const blogPosts = [
  { id: 1, title: 'Kick Back with the Best Shisha in Pflugerville at Triple Buzz Smoke Shop', badge: null },
  { id: 2, title: 'Kick Back with the Best Shisha in Pflugerville at Triple Buzz Smoke Shop', badge: 'NEW' },
  { id: 3, title: 'Kick Back with the Best Shisha in Pflugerville at Triple Buzz Smoke Shop', badge: null },
]

export const testimonials = [
  { id: 1, name: 'Quana Mckinney', timeAgo: '10 months ago', initial: null, avatarColor: null, text: '1st time here, the music is amazing and staff are very helpful, I plan on coming back soon!', hasPhotos: true },
  { id: 2, name: 'Zachary Daniels', timeAgo: '10 months ago', initial: 'Z', avatarColor: '#e8590c', text: 'Great service and very helpful. Haley was fantastic — definitely will come again. I recommend you visit.', hasPhotos: false },
  { id: 3, name: 'Eric Ybarra', timeAgo: '10 months ago', initial: 'E', avatarColor: '#d6336c', text: 'Haley was great. She really helped me find something good.', hasPhotos: false },
  { id: 4, name: 'Lilly Caballero', timeAgo: '10 months ago', initial: 'L', avatarColor: '#495057', text: 'Staff very friendly and informative!', hasPhotos: false },
]

export const areas = [
  {
    title: 'Central & North Austin',
    places: ['North Lamar', 'The Domain', 'North Burnet', 'Allandale', 'Crestview', 'Hyde Park', 'Brentwood', 'Georgian Acres', 'Walnut Creek', 'Tech Ridge'],
  },
  {
    title: 'North & Northwest',
    places: ['North Lamar', 'The Domain', 'North Burnet', 'Allandale', 'Crestview', 'Hyde Park'],
  },
]
