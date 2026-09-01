import lifestylePhoto from '../assets/images/lifestyle-friends-hookah.png'
import { blogPosts } from '../data/siteData'

export default function BlogSection() {
  return (
    <section className="bg-neutral-50 py-14">
      <div className="container-x">
        <h2 className="section-title mb-6">Blog posts</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id}>
              <div className="relative overflow-hidden rounded">
                <img src={lifestylePhoto} alt={post.title} className="h-56 w-full object-cover" />
                {post.badge && (
                  <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {post.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 mb-4 text-base font-semibold leading-snug text-ink">{post.title}</h3>
              <a
                href="#"
                className="inline-flex items-center rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:border-ink hover:text-ink"
              >
                Read Full Blog
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
