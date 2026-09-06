import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import vapeDevices from '../assets/images/hero-slide-2.png'
import areasServePhoto from '../assets/images/areas-we-serve.png'
import CategoryGrid from '../components/CategoryGrid'
import Testimonials from '../components/Testimonials'
import BlogSection from '../components/BlogSection'

const FAQS = [
  {
    q: 'What types of vape products do you offer to customers in Kyle and Buda?',
    a: 'We carry disposable vapes, vape mods, coils, pods, and a wide range of e-juices from trusted brands — everything Kyle and Buda vapers need, whether you shop in person or browse online.',
  },
  {
    q: 'Do you stock smoking accessories like torches and glass pieces?',
    a: 'Yes — durable glassware, water pipes, butane torches, lighters, grinders, and ashtrays are all in stock, chosen for quality that lasts.',
  },
  {
    q: 'How can I check if a specific pre-roll or e-juice flavor is currently in stock?',
    a: 'The quickest way is to give us a call or browse our shop page — availability updates as inventory changes, and our team is happy to check specific products for you.',
  },
  {
    q: 'Do you serve areas in Central Texas outside of Kyle and Buda?',
    a: 'Absolutely. Along with Kyle and Buda, we proudly serve Pflugerville, Round Rock, Georgetown, Cedar Park, Hutto, San Marcos, Waco, and Taylor.',
  },
  {
    q: 'Can your team help me figure out which coil or pod fits my vape model?',
    a: "Definitely — bring in your device (or a photo of it) and our team will help match it to the right coil, pod, or battery in stock.",
  },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold text-ink">{item.q}</span>
        <span className="shrink-0 text-brand-goldDark">{open ? <FiMinus /> : <FiPlus />}</span>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.a}</p>}
    </div>
  )
}

export default function KyleBuda() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Kyle &amp; Buda</span>
        </nav>
      </section>

      <section className="relative mt-6 h-[360px] w-full overflow-hidden bg-ink sm:h-[440px] lg:h-[500px]">
        <img src={vapeDevices} alt="Kyle and Buda smoke and vape shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            The Top Smoke &amp; Vape Hub for Kyle &amp; Buda
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 sm:text-base">
            Looking for a trusted, high-quality smoke shop serving the growing Kyle and Buda areas? Triple Buzz
            Smoke is proud to bring our neighbors an elite selection of premium vapes, top-shelf pre-rolls,
            custom glass, and all your essential hardware. Whether you&rsquo;re living near downtown Buda,
            shopping in Kyle, or commuting along the busy I-35 corridor, our mission is to provide the entire
            community with unmatched product variety, competitive pricing, and friendly expert knowledge for
            every single session.
          </p>
          <Link
            to="/shop"
            className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-lg transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="h-64 overflow-hidden rounded-md border border-neutral-200 lg:h-80">
            <img
              src={areasServePhoto}
              alt="Aerial view of the Kyle and Buda area"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Your Premium Selection For Vapes, E-Juice, And Hardware
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Finding the perfect setup shouldn&rsquo;t feel like a guessing game. At Triple Buzz Smoke, we
              supply Kyle and Buda vapers with an extensive inventory of top-shelf vape juices, disposable
              vapes, and the latest coils and pods. We understand that hardware needs to be reliable, which is
              why we stock trusted brands that keep your device running perfectly. From smooth salt nics to
              cloud-chasing freebase flavors, our selection is curated to suit both beginners and experienced
              vapers searching for the newest hardware upgrades in Hays County.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Elevate Every Session With Premium Pre-Rolls, Fine Glass, And Rugged Torches
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              For enthusiasts who appreciate classic methods and exceptional craftsmanship, we offer an
              impressive lineup of highly durable glassware, premium pre-rolls, and heavy-duty torches and
              lighters. We know that a good glass piece is a personal investment, which is why we carry an
              inventory that prioritizes thick, durable construction and sleek functionality. Paired with our
              smooth, slow-burning pre-rolls and dependable torches that strike perfectly every single time, we
              provide the complete setup. Kyle and Buda locals can skip the low-grade gas station novelties and
              step up to a genuinely premium smoke shop experience.
            </p>
          </div>
          <div className="order-1 h-64 overflow-hidden rounded-md border border-neutral-200 lg:order-2 lg:h-80">
            <img
              src={areasServePhoto}
              alt="Aerial view of the Kyle and Buda area"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CategoryGrid />
      <Testimonials />

      <section className="container-x py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-8 max-w-2xl">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      <BlogSection />
    </>
  )
}
