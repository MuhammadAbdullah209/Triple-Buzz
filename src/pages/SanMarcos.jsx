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
    q: 'What types of vape products do you offer to customers in San Marcos?',
    a: 'We carry disposable vapes, vape mods, coils, pods, and a wide range of e-juices from trusted brands — everything San Marcos vapers need, whether you shop in person or browse online.',
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
    q: 'Do you serve areas in Central Texas outside of San Marcos?',
    a: 'Absolutely. Along with San Marcos, we proudly serve Pflugerville, Round Rock, Georgetown, Cedar Park, Hutto, Kyle Buda, Waco, and Taylor.',
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

export default function SanMarcos() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">San Marcos</span>
        </nav>
      </section>

      <section className="relative mt-6 h-[360px] w-full overflow-hidden bg-ink sm:h-[440px] lg:h-[500px]">
        <img src={vapeDevices} alt="San Marcos smoke and vape shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            San Marcos&rsquo; Go-To Smoke &amp; Vape Shop
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 sm:text-base">
            Looking for a reliable smoke shop serving San Marcos? Triple Buzz Smoke brings premium vapes,
            high-quality glassware, top-tier pre-rolls, and essential hardware straight to the local
            community. Whether you&rsquo;re near Texas State University or commuting down I-35, our team is
            dedicated to providing San Marcos residents with the absolute best selection, fair pricing, and
            expert knowledge for all your smoke and vape needs.
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
              alt="Aerial view of the San Marcos area"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Your Premium Selection For Vapes, E-Juice, And Hardware
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Finding the perfect setup shouldn&rsquo;t feel like a guessing game. At Triple Buzz Smoke, we
              supply San Marcos vapers with an extensive inventory of top-shelf vape juices, disposable vapes,
              and the latest coils and pods. We understand that hardware needs to be reliable, which is why we
              stock trusted brands that keep your device running perfectly. From smooth salt nics to
              cloud-chasing freebase flavors, our selection is curated to cater to both beginners looking to
              switch and experienced vapers searching for the newest hardware upgrades in Hays County.
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
              seamless session. We pride ourselves on offering San Marcos residents safe, high-quality options,
              ensuring you never have to settle for sub-par accessories or sketchy gas station alternatives
              again.
            </p>
          </div>
          <div className="order-1 h-64 overflow-hidden rounded-md border border-neutral-200 lg:order-2 lg:h-80">
            <img
              src={areasServePhoto}
              alt="Aerial view of the San Marcos area"
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
