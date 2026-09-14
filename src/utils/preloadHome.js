// The home page (src/pages/Home.jsx) has no route-based code-splitting — its
// JS is already in the one app bundle — so the only real gap between "app
// loaded" and "home page fully painted" is the network: static images that
// only start downloading once their <img> mounts during scroll, and the
// blog post fetch that only fires once BlogSection itself mounts near the
// bottom of the page. This warms both ahead of time so a visit to "/" (or a
// hover over a link to it) already has everything in flight or in cache.

import slide2 from '../assets/images/hero-slide-2.png'
import slide3 from '../assets/images/hero-slide-3.png'
import slide4 from '../assets/images/hero-slide-4.png'
import promoShisha from '../assets/images/products/promo-shisha-hookah.jpeg'
import promoAccessories from '../assets/images/products/promo-smoke-accessories.jpeg'
import iconTruck from '../assets/images/icons/icon-fast-delivery.svg'
import iconReturn from '../assets/images/icons/icon-return-refund.svg'
import iconDiscount from '../assets/images/icons/icon-member-discount.svg'
import iconSupport from '../assets/images/icons/icon-support-24-7.svg'
import hookahProduct from '../assets/images/hookah-product.png'
import brandFlum from '../assets/images/brand-flum.png'
import brandWhipit from '../assets/images/brand-whipit.png'
import brandSwftmod from '../assets/images/brand-swftmod.png'
import brandStorzbickel from '../assets/images/brand-storzbickel.png'
import brandPuffco from '../assets/images/brand-puffco.png'
import brandDrdabber from '../assets/images/brand-drdabber.png'
import { fetchBlogs } from '../lib/api'

// Every static image Home renders below the hero (hero slide 1 and the
// header logo are already covered by the browser's normal eager-load of
// whatever's in the very first paint, so they're left out here on purpose).
const HOME_IMAGES = [
  slide2, slide3, slide4, promoShisha, promoAccessories,
  iconTruck, iconReturn, iconDiscount, iconSupport, hookahProduct,
  brandFlum, brandWhipit, brandSwftmod, brandStorzbickel, brandPuffco, brandDrdabber,
]

let imagesWarmed = false
let blogsPromise = null

function warmImageCache() {
  if (imagesWarmed || typeof window === 'undefined') return
  imagesWarmed = true
  for (const src of HOME_IMAGES) {
    const img = new Image()
    img.src = src
  }
}

// BlogSection normally fetches its own posts on mount. Sharing this promise
// means that if preloadHomePage() already ran (app boot, or a hover over a
// link to "/"), BlogSection's own effect gets an already-settled response
// instead of firing a second, redundant request. A failed fetch clears the
// cached promise so the next call gets a real retry rather than repeating
// the same rejection forever.
export function getHomeBlogPosts() {
  if (!blogsPromise) {
    blogsPromise = fetchBlogs(1).catch((err) => {
      blogsPromise = null
      throw err
    })
  }
  return blogsPromise
}

// Call as early as possible: on app boot, and again on hover/focus of any
// link to "/" as a cheap safety net for whichever page the user started on.
// Cheap to call repeatedly — both warmers are idempotent no-ops after the
// first run/settle.
export function preloadHomePage() {
  warmImageCache()
  getHomeBlogPosts()
}
