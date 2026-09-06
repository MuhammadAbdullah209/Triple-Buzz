import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMapPin, FiPhone, FiMail, FiArrowRight, FiPlus, FiMinus } from 'react-icons/fi'
import vapeDevices from '../assets/images/hero-slide-2.png'
import { siteConfig } from '../data/siteData'

const FAQS = [
  {
    q: 'How long will shipping take?',
    a: 'Most orders ship within 1-2 business days and arrive within 3-5 business days, depending on your location.',
  },
  {
    q: 'How do I know if my order is confirmed?',
    a: "You'll receive a confirmation email as soon as your order is placed, followed by a shipping notice once it's on its way.",
  },
  {
    q: 'Can I change my shipping address after my order is placed?',
    a: "Contact us as soon as possible after placing your order and we'll do our best to update the address before it ships.",
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
        <span className="shrink-0 text-brand-goldDark">
          {open ? <FiMinus /> : <FiPlus />}
        </span>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.a}</p>}
    </div>
  )
}

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null)
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  const onSubmit = () => {
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 3000)
  }

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
          <span className="font-semibold text-ink">Contact Us</span>
        </nav>
      </section>

      <section className="container-x py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={vapeDevices}
            alt="Vape products"
            className="h-[280px] w-full rounded-md object-cover sm:h-[360px]"
          />
          <div>
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">About Us</h1>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-neutral-600">
              <p>
                Welcome to Triple Buzz Smoke and Vape! We are dedicated to providing Austin and Pflugerville
                with a diverse selection of smoke and vape products, top-notch customer service, and a unique
                shopping experience.
              </p>
              <p>
                We pride ourselves on offering a wide range of products, including vapes, E-Juice, Delta8,
                CBD, glass water pipes, hookahs, and more. Our mission is to cater to the needs of our
                customers by providing customized care and high-quality products.
              </p>
              <p>
                Whether you&rsquo;re a seasoned user or new to the smoke and vape world, our knowledgeable
                team is here to guide you. Thank you for choosing Triple Buzz Smoke and Vape &mdash; a higher
                standard in smoke and vape shopping.
              </p>
              <p>
                Visit us at {siteConfig.address}, or contact us at {siteConfig.phone}.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-neutral-200 pt-10 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-50 text-lg text-brand-goldDark">
              <FiMapPin />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Address</p>
              <p className="mt-1 text-sm text-neutral-500">{siteConfig.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-50 text-lg text-brand-goldDark">
              <FiPhone />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Call Us</p>
              <p className="mt-1 text-sm text-neutral-500">{siteConfig.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-50 text-lg text-brand-goldDark">
              <FiMail />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Email</p>
              <p className="mt-1 text-sm text-neutral-500">{siteConfig.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-14">
        <div className="container-x mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Got Any Questions?</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Use the form below to get in touch with the sales team
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <input
                  {...register('name', {
                    required: 'Please enter your name',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  placeholder="Name *"
                  className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.name ? 'border-red-400' : 'border-neutral-200'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  placeholder="Email *"
                  className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                    errors.email ? 'border-red-400' : 'border-neutral-200'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <input
                {...register('phone', {
                  pattern: {
                    value: /^[0-9+()\-\s]{7,20}$/,
                    message: 'Enter a valid phone number',
                  },
                })}
                placeholder="Phone Number"
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.phone ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <textarea
                {...register('message', {
                  required: 'Please enter a message',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
                rows={5}
                placeholder="Message *"
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brand-gold/40 ${
                  errors.message ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-ink px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black hover:text-white"
              >
                {sent ? 'Sent!' : 'Send'} <FiArrowRight />
              </button>
            </div>
          </form>

          <p className="mt-6 text-xs text-neutral-400">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-ink"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-ink"
            >
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </div>
      </section>

      <section className="h-[320px] w-full sm:h-[400px]">
        <iframe
          title="Triple Buzz Smoke Shop location"
          src={mapSrc}
          className="h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="container-x py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">FAQs</h2>
          <p className="mt-2 text-sm text-neutral-500">Below are some of our common questions</p>
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
    </>
  )
}
