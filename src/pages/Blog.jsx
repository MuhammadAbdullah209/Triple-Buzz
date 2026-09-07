import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBlogs, ApiError } from '../lib/api'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Blog() {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchBlogs(1)
      .then((data) => {
        if (!cancelled) setPosts(data.blogs ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load blog posts.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Blog</span>
        </nav>
      </section>

      <section className="container-x py-10">
        <h1 className="section-title mb-8">Blog</h1>

        {!posts && !error && <p className="text-sm text-neutral-500">Loading posts…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {posts && posts.length === 0 && (
          <p className="text-sm text-neutral-500">No blog posts yet — check back soon.</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <article key={post._id}>
              <Link to={`/blog/${post._id}`} className="relative block overflow-hidden rounded">
                {post.image?.url && (
                  <img
                    src={post.image.url}
                    alt={post.title}
                    className="h-56 w-full object-cover"
                  />
                )}
                {post.category && (
                  <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {post.category}
                  </span>
                )}
              </Link>
              <p className="mt-3 text-xs text-neutral-400">{formatDate(post.createdAt)}</p>
              <h2 className="mt-1 mb-4 text-base font-semibold leading-snug text-ink">
                <Link to={`/blog/${post._id}`} className="hover:text-brand-goldDark">
                  {post.title}
                </Link>
              </h2>
              <Link
                to={`/blog/${post._id}`}
                className="inline-flex items-center rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:border-ink hover:text-ink"
              >
                Read Full Blog
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
