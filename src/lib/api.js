// Talks directly to the shared Express backend (also used by Double Apple and
// the admin portal). CORS on that backend already whitelists this dev origin
// (http://localhost:5173), so no local proxy is needed the way the TanStack
// admin portal needs one.
export const API_BASE = 'https://triple-buzz-store-backend-one.vercel.app'

const TOKEN_KEY = 'tb_access_token'

export function getToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (typeof window === 'undefined') return
  if (token) window.localStorage.setItem(TOKEN_KEY, token)
  else window.localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

// The backend rotates the refresh token on every use, so two concurrent 401s
// racing to refresh independently (e.g. a profile fetch and a wishlist fetch
// firing at once on page load) means whichever request loses the race gets a
// permanent failure even though the other one just refreshed fine. Sharing one
// in-flight promise means only one actual refresh call ever goes out.
let refreshPromise = null

async function attemptRefresh() {
  try {
    const res = await fetch(`${API_BASE}/Api/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.accessToken) {
      setToken(data.accessToken)
      return data.accessToken
    }
    return null
  } catch {
    return null
  }
}

function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = attemptRefresh().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

export async function api(path, options = {}) {
  const { method = 'GET', body, auth = false, retry = true } = options
  const headers = {}
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  if (body && !isForm) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  })

  if (res.status === 401 && auth && retry) {
    const fresh = await refreshToken()
    if (fresh) return api(path, { ...options, retry: false })
  }

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { message: text?.slice(0, 200) || `Request failed (${res.status})` }
  }

  if (!res.ok || (data && data.success === false)) {
    throw new ApiError(data?.message ?? `Request failed (${res.status})`, res.status, data)
  }
  return data
}

/* ---------- Auth ---------- */

export function register(fields) {
  return api('/Api/register', { method: 'POST', body: fields })
}

export function login(email, password) {
  return api('/Api/login', { method: 'POST', body: { email, password } })
}

export function verifyOtp(email, otp) {
  return api('/Api/verify', { method: 'POST', body: { email, otp } })
}

export function reverify(email) {
  return api('/Api/reverify', { method: 'POST', body: { email } })
}

export function logoutRequest() {
  return api('/Api/logout', { method: 'POST' })
}

export function fetchMe() {
  return api('/Api/', { auth: true })
}

export function updateProfile(fields) {
  return api('/Api/update', { method: 'PUT', auth: true, body: fields })
}

export async function uploadAvatar(file) {
  const fd = new FormData()
  fd.append('image', file)
  return api('/Api/avatar', { method: 'POST', auth: true, body: fd })
}

export function removeAvatar() {
  return api('/Api/avatar', { method: 'DELETE', auth: true })
}

/* ---------- Products ---------- */

export function fetchProducts(page = 1, site = 'triplebuzz') {
  return api(`/Product/allproducts?page=${page}${site ? `&site=${site}` : ''}`)
}

export function fetchProductById(id) {
  return api(`/Product/${id}`)
}

/* ---------- Wishlist ---------- */

export function fetchWishlist() {
  return api('/Wishlist', { auth: true })
}

export function addToWishlistRequest(productId) {
  return api(`/Wishlist/${productId}`, { method: 'POST', auth: true })
}

export function removeFromWishlistRequest(productId) {
  return api(`/Wishlist/${productId}`, { method: 'DELETE', auth: true })
}

/* ---------- Reviews ---------- */

export function fetchProductReviews(productId, sort) {
  return api(`/Review/${productId}${sort ? `?sort=${sort}` : ''}`, { auth: !!getToken() })
}

export function writeReviewRequest(productId, { rating, comment }) {
  return api(`/Review/${productId}`, {
    method: 'POST',
    auth: true,
    body: { rating, comment, site: 'triplebuzz' },
  })
}

export function deleteReviewRequest(productId) {
  return api(`/Review/${productId}`, { method: 'DELETE', auth: true })
}

export function fetchMyReviews() {
  return api('/Review/mine', { auth: true })
}

/* ---------- Orders ---------- */

export function createOrder(payload) {
  return api('/Order/create', { method: 'POST', auth: !!getToken(), body: payload })
}

export function fetchMyOrders(page = 1) {
  return api(`/Order?page=${page}`, { auth: true })
}

export function fetchOrderById(id) {
  return api(`/Order/${id}`, { auth: true })
}

export function cancelOrderRequest(id) {
  return api(`/Order/${id}`, { method: 'PUT', auth: true })
}

/* ---------- Newsletter ---------- */

export function subscribeNewsletter(email) {
  return api('/Newsletter/subscribe', { method: 'POST', body: { email } })
}

/* ---------- Blog ---------- */

export function fetchBlogs(page = 1, site = 'triplebuzz') {
  return api(`/Blog?page=${page}${site ? `&site=${site}` : ''}`)
}
