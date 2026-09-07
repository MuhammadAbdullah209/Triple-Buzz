import { Link } from 'react-router-dom'
import vapeDevices from '../assets/images/hero-slide-2.png'
import { siteConfig } from '../data/siteData'

export default function AboutUsBlock() {
  return (
    <>
      <section className="relative h-[280px] w-full overflow-hidden bg-ink sm:h-[360px] lg:h-[440px]">
        <img src={vapeDevices} alt="Vape devices" className="h-full w-full object-cover" />
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
        <h2 className="text-center font-display text-4xl font-bold text-ink sm:text-5xl">About Us</h2>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-6 text-center text-[15px] leading-relaxed text-ink">
          <p>
            Welcome to Triple Buzz Smoke and Vape! We are dedicated to providing Austin and Pflugerville with a
            diverse selection of smoke and vape products, top-notch customer service, and a unique shopping
            experience.
          </p>
          <p>
            We pride ourselves on offering a wide range of products, including vapes, E-Juice, Delta8, CBD, glass
            water pipes, hookahs, and more. Our mission is to cater to the needs of our customers by providing
            customized care and high-quality products.
          </p>
          <p>
            Whether you&rsquo;re a seasoned user or new to the smoke and vape world, our knowledgeable team is here
            to guide you. Thank you for choosing Triple Buzz Smoke and Vape &mdash; a higher standard in smoke and
            vape shopping.
          </p>
          <p>
            Visit us at {siteConfig.address}, TX, or contact us at {siteConfig.phone}.
          </p>
        </div>
      </section>
    </>
  )
}
