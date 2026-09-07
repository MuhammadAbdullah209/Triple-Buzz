import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchBlogById, ApiError } from '../lib/api'
import AreasServed from '../components/AreasServed'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setPost(null)
    setError('')
    fetchBlogById(id)
      .then((data) => {
        if (!cancelled) setPost(data.blog)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load this post.')
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return (
      <section className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Post not found</h1>
        <p className="mt-2 text-sm text-neutral-500">{error}</p>
        <Link to="/blog" className="mt-4 inline-block text-sm font-semibold text-ink hover:text-brand-gold">
          &larr; Back to Blog
        </Link>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="container-x py-20 text-center">
        <p className="text-sm text-neutral-500">Loading post…</p>
      </section>
    )
  }

  const authorName = [post.author?.firstname, post.author?.lastname].filter(Boolean).join(' ')

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/blog" className="hover:text-ink">Blog</Link>
          <span>&rsaquo;</span>
          <span className="font-semibold text-ink">{post.title}</span>
        </nav>
      </section>

      <section className="container-x py-10">
        <div className="mx-auto max-w-3xl">
          {post.category && (
            <span className="inline-block rounded bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-goldDark">
              {post.category}
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-neutral-500">
            {formatDate(post.createdAt)}
            {authorName && <> &bull; {authorName}</>}
          </p>

          {post.image?.url && (
            <img
              src={post.image.url}
              alt={post.title}
              className="mt-6 h-72 w-full rounded-xl object-cover sm:h-96"
            />
          )}

          <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-neutral-700">
            {post.content}
          </div>

          <Link
            to="/blog"
            className="mt-10 inline-block text-sm font-semibold text-ink hover:text-brand-gold"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </section>

      <AreasServed />
    </>
  )
}
