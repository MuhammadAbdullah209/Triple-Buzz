// Maps each product's local `slug` to its real MongoDB _id in the shared
// backend, once E:\E-com-Backend\Backend\scripts\seedTripleBuzzProducts.js
// has been run. Empty until then — Cart/Wishlist/Reviews fall back to a
// friendly "not linked to the store yet" message for any product missing
// from this map, rather than breaking.
export const BACKEND_PRODUCT_IDS = {}
