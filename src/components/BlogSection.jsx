import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomeBlogPosts } from '../utils/preloadHome'

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogSection() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let cancelled = false
    // Reuses the fetch preloadHomePage() already kicked off (at app boot, or
    // on hover of a link to "/"), so this resolves instantly instead of
    // starting a fresh request once this section finally scrolls into view.
    getHomeBlogPosts()
      .then((data) => {
        if (!cancelled) setPosts((data.blogs ?? []).slice(0, 3))
      })
      .catch(() => {
        if (!cancelled) setPosts([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="bg-neutral-50 py-14">
      <div className="container-x">
        <h2 className="section-title mb-6">Blog posts</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id}>
              <Link to={`/blog/${slugifyTitle(post.title)}`} className="relative block overflow-hidden rounded">
                {post.image?.url && (
                  <img src={post.image.url} alt={post.title} className="h-56 w-full object-cover" />
                )}
                {post.category && (
                  <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {post.category}
                  </span>
                )}
              </Link>
              <h3 className="mt-4 mb-4 text-base font-semibold leading-snug text-ink">
                <Link to={`/blog/${slugifyTitle(post.title)}`} className="hover:text-brand-goldDark">
                  {post.title}
                </Link>
              </h3>
              <Link
                to={`/blog/${slugifyTitle(post.title)}`}
                className="inline-flex items-center rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:border-ink hover:text-ink"
              >
                Read Full Blog
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
