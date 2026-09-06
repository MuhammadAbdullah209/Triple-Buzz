import { FiStar, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { testimonials, googleRating } from '../data/siteData'

function GoogleBadge() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold shadow">
      <span className="text-[#4285F4]">G</span>
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className="relative container-x py-14">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">Straight From The Source.</h2>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-neutral-500">
          <GoogleBadge />
          <span className="font-semibold text-ink">{googleRating.value}</span>
          <FiStar className="text-brand-gold" />
          <span>&middot; {googleRating.count} Google reviews</span>
        </p>
      </div>

      <button
        type="button"
        aria-label="Previous review"
        className="absolute left-0 top-[58%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-ink md:flex"
      >
        <FiChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next review"
        className="absolute right-0 top-[58%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-ink md:flex"
      >
        <FiChevronRight />
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <div key={t.id} className="flex flex-col rounded-md bg-neutral-100 p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                {t.initial ? (
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: t.avatarColor }}
                  >
                    {t.initial}
                  </span>
                ) : (
                  <span className="h-10 w-10 shrink-0 rounded-full bg-neutral-300" />
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-neutral-400">{t.timeAgo}</p>
                </div>
              </div>
              <GoogleBadge />
            </div>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <FiStar key={i} className="text-brand-gold" />
              ))}
            </div>
            <p className="flex-1 text-sm text-neutral-600">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://www.google.com/maps/place/Triple+Buzz+Smoke+Shop/@30.435557,-97.655932,15z/data=!3m1!5s0x8644cefde3fca73f:0xb99d102ba4e00a12!4m8!3m7!1s0x8644cf7ff25a6ab1:0x75cfcd480193d5ad!8m2!3d30.4355575!4d-97.6559325!9m1!1b1!16s%2Fg%2F11vwd98dff?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Leave a Review <FiArrowRight />
        </a>
      </div>
    </section>
  )
}
