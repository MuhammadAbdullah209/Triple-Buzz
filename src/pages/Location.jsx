import { Link } from 'react-router-dom'
import vapeDevices from '../assets/images/hero-slide-2.png'
import { siteConfig } from '../data/siteData'

const HOURS = [
  { day: 'Sunday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Monday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Tuesday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Wednesday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Thursday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Friday', hours: '8:00 AM – 12:00 AM' },
  { day: 'Saturday', hours: '8:00 AM – 12:00 AM' },
]

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${siteConfig.name} Smoke Shop, ${siteConfig.address}`
  )}&output=embed`

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Location</span>
        </nav>
      </section>

      <section className="relative mt-6 h-[280px] w-full overflow-hidden bg-ink sm:h-[360px] lg:h-[440px]">
        <img src={vapeDevices} alt="Triple Buzz Smoke Shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 grid place-items-center">
          <Link
            to="/shop"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-lg transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink">Address</h2>
            <p className="mt-2 text-brand-goldDark">{siteConfig.address}, TX 78660</p>

            <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-ink">Open Daily</h2>
            <div className="mt-2 flex flex-col gap-1.5">
              {HOURS.map((h) => (
                <p key={h.day} className="text-sm text-neutral-600">
                  <span className="font-semibold text-brand-goldDark">{h.day}</span> {h.hours}
                </p>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-ink">Call Us</h2>
            <a href={`tel:${siteConfig.phone}`} className="mt-2 block text-brand-goldDark hover:underline">
              {siteConfig.phone}
            </a>
          </div>

          <div className="h-[320px] overflow-hidden rounded-md border border-neutral-200 lg:h-full lg:min-h-[360px]">
            <iframe
              title="Triple Buzz Smoke Shop location"
              src={mapSrc}
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
