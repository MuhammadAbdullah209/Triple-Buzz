import vapeDevices from '../assets/images/hero-slide-2.png'

export default function AboutSection() {
  return (
    <section className="bg-white py-14">
      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title mb-4">Start Your Vaping Journey With Triple Buzz Smoke Shop</h2>
          <p className="text-sm leading-relaxed text-neutral-600">
            Triple Buzz Smoke and Vape Dispensary is a trusted vape and tobacco store located in Pflugerville, TX.
            We're committed to providing the broadest selection of vapes along with e-liquids. Glass, disposable
            hookahs, and vape pipes, as well as CBD products, are available in Pflugerville, TX. Located close to
            Austin, we're your welcoming neighborhood hub. Whether you're just beginning to learn about vaping or
            you're an experienced enthusiast, we're here to help you find the right item. Stop by to say hi — we
            can't wait to get to know you!
          </p>
          <button type="button" className="btn-gold mt-6">
            Shop Now
          </button>
        </div>
        <div className="flex justify-center">
          <img src={vapeDevices} alt="Vape products" className="w-full max-w-md rounded-md object-cover" />
        </div>
      </div>
    </section>
  )
}
