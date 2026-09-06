import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import vapeDevices from '../assets/images/hero-slide-2.png'
import CategoryGrid from '../components/CategoryGrid'
import Testimonials from '../components/Testimonials'
import BlogSection from '../components/BlogSection'

const mapEmbed = (label) =>
  `https://www.google.com/maps?q=${encodeURIComponent(label)}&t=k&z=12&output=embed`

const FAQS = [
  {
    q: 'What types of vape products do you offer to customers in Round Rock?',
    a: 'We carry a wide range of disposable vapes, vape mods, coils, pods, and e-juice from trusted brands — perfect for Round Rock shoppers looking for quality and variety, whether you shop with us in person or browse online.',
  },
  {
    q: 'Do you stock smoking accessories like torches and glass pieces?',
    a: 'Yes — our accessories lineup includes butane torches, lighters, glass pipes, ashtrays, grinders, and more, all sourced for durability and quality.',
  },
  {
    q: 'How can I check if a specific pre-roll or e-juice flavor is currently in stock?',
    a: 'The quickest way is to give us a call or browse our shop page — availability updates as inventory changes, and our team is happy to check specific products for you.',
  },
  {
    q: 'Do you serve areas in Central Texas outside of Round Rock?',
    a: 'Absolutely. Along with Round Rock, we proudly serve Pflugerville, Georgetown, Cedar Park, Hutto, Kyle Buda, San Marcos, Waco, and Taylor.',
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

export default function RoundRock() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Smoke Shop Round Rock, TX | Vapes, Cigars &amp; Kratom</span>
        </nav>
      </section>

      <section className="relative mt-6 h-[360px] w-full overflow-hidden bg-ink sm:h-[440px] lg:h-[500px]">
        <img src={vapeDevices} alt="Round Rock smoke and vape shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Round Rock&rsquo;s Go-To Smoke &amp; Vape Shop
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 sm:text-base">
            Looking for a reliable smoke shop serving Round Rock? Triple Buzz Smoke brings premium vapes,
            high-quality glassware, top-tier pre-rolls, and essential hardware to the local community. Whether
            you&rsquo;re near Dell Diamond or commuting down I-35, our team is dedicated to providing Round Rock
            residents with the absolute best selection, fair pricing, and expert knowledge for all your smoke
            and vape needs.
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
            <iframe
              title="Round Rock, TX aerial view"
              src={mapEmbed('Round Rock, Texas')}
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Your Premium Selection For Vapes, E-Juice, And Hardware
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Finding the perfect setup shouldn&rsquo;t feel like a guessing game. At Triple Buzz Smoke, we
              supply Round Rock vapers with an extensive inventory of top-shelf vape juices, disposable vapes,
              and the latest coils and pods. We understand that hardware needs to be reliable, which is why we
              stock trusted brands that keep your device running perfectly. From smooth salt nics to
              cloud-chasing freebase flavors, our selection is curated to cater to both beginners and
              experienced vapers alike.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Elevate Your Ritual With Quality Glass, Pre-Rolls, And Torches
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              For those who appreciate a more traditional or elevated experience, we offer an impressive
              variety of glass pieces, robust pre-rolls, and heavy-duty torches and lighters. We source
              durable, beautifully crafted glass that serves as both a functional tool and a centerpiece. Pair
              that with our premium pre-rolls and reliable torches, and you have everything required for a
              seamless session. We pride ourselves on offering Round Rock residents safe, high-quality options,
              so you never have to settle for sub-par accessories or sketchy gas station alternatives.
            </p>
          </div>
          <div className="order-1 h-64 overflow-hidden rounded-md border border-neutral-200 lg:order-2 lg:h-80">
            <iframe
              title="Round Rock, TX satellite view"
              src={mapEmbed('Round Rock, Texas Old Settlers Park')}
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
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
