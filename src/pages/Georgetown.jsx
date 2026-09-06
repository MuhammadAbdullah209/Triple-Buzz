import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import vapeDevices from '../assets/images/hero-slide-2.png'
import areasServePhoto from '../assets/images/areas-we-serve.png'
import CategoryGrid from '../components/CategoryGrid'
import BlogSection from '../components/BlogSection'

const FAQS = [
  {
    q: 'What kinds of vape gear and e-liquids do you supply to Georgetown residents?',
    a: 'Triple Buzz Smoke Shop #2 stocks disposable vapes, mods, coils, pods, and a wide range of salt nic and freebase e-liquids — the same trusted brands carried at our original Pflugerville location.',
  },
  {
    q: 'Do you carry traditional smoking accessories like glass and torches in Georgetown?',
    a: 'Yes — hand-picked glass pieces, water pipes, pre-rolls, and heavy-duty torches and lighters are all in stock, chosen for quality that holds up session after session.',
  },
  {
    q: 'How can I check if a specific vape flavor or pre-roll is available right now?',
    a: 'Give the Georgetown shop a call or stop by in person — our team can check current stock for any specific flavor, coil, or accessory before you make the trip.',
  },
  {
    q: 'What other Central Texas regions do you serve besides Georgetown?',
    a: 'Along with our Georgetown location, Triple Buzz serves Pflugerville, Round Rock, Cedar Park, Hutto, Kyle Buda, San Marcos, Waco, and Taylor.',
  },
  {
    q: "Can your staff help me find a replacement pod or coil if I don't know the exact size?",
    a: "Absolutely — bring in your device (or a photo of it) and our team will help match it to the right pod, coil, or battery in stock.",
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

export default function Georgetown() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Georgetown</span>
        </nav>
      </section>

      <section className="relative mt-6 h-[360px] w-full overflow-hidden bg-ink sm:h-[440px] lg:h-[500px]">
        <img src={vapeDevices} alt="Georgetown smoke and vape shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Georgetown&rsquo;s Local Smoke &amp; Vape Shop
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-200 sm:text-base">
            Georgetown finally has a smoke shop built just for it. Triple Buzz Smoke Shop #2, located at 700
            High Tech Dr #230, stocks everything from premium vapes and top-shelf pre-rolls to custom glass,
            kratom, hookah, and every accessory in between, all under one roof, right in the neighborhood.
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
              alt="Aerial view of the Georgetown area"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Smoke Shop Georgetown TX — Your Neighborhood Vape &amp; Hardware Headquarters
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              As a trusted smoke shop Georgetown TX residents can count on, Triple Buzz Smoke Shop #2 carries
              the same quality that made Triple Buzz a name people know across Central Texas. Shelves stay
              loaded with disposable vapes, premium e-juices, and the exact coils and pods your device needs.
              Whether smooth salt nic or bold freebase e-liquid is your thing, it&rsquo;s on the shelf, no more
              driving out of town for it.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Premium Glass, Pre-Rolls &amp; Torches At Our Georgetown Smoke Shop
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Beyond vapes, our smoke shop in Georgetown TX also carries hand-picked glass pieces,
              slow-burning pre-rolls, and heavy-duty torches built to last. From sleek hand pipes to
              statement water pieces, every item is chosen for quality that holds up session after session.
              Gas-station quality doesn&rsquo;t cut it, Georgetown customers get the same premium standard
              Triple Buzz is known for, backed by a team that actually knows the products.
            </p>
          </div>
          <div className="order-1 h-64 overflow-hidden rounded-md border border-neutral-200 lg:order-2 lg:h-80">
            <img
              src={areasServePhoto}
              alt="Aerial view of the Georgetown area"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CategoryGrid />

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
