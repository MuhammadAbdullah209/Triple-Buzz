import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteData'

export default function TermsConditions() {
  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Terms &amp; Conditions</span>
        </nav>
      </section>

      <section className="container-x py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-sm leading-relaxed text-ink">
          <p>
            Welcome to Triple Buzz Smoke and Vape. By using our website and purchasing our products, you agree
            to the following terms and conditions.
          </p>
          <p>
            1. <span className="font-bold">Age Requirement</span>: You must be at least 21 years of age to
            purchase any products from Triple Buzz Smoke and Vape. By accessing this website and making
            purchases, you confirm that you meet the minimum age requirement.
          </p>
          <p>
            2. <span className="font-bold">Product Use</span>: All products available on our website are
            intended for legal use only. We do not condone or encourage illegal usage of any product, and we
            reserve the right to refuse service if we suspect illegal activity.
          </p>
          <p>
            3. <span className="font-bold">Return and Refund Policy</span>: Due to the nature of our products,
            we only accept returns of unopened items within 14 days of purchase. Refunds will be issued once
            the returned item is received and inspected. Shipping costs for returns are the responsibility of
            the customer.
          </p>
          <p>
            4. <span className="font-bold">Shipping Policy</span>: We offer same-day delivery within
            designated areas. Orders are processed promptly, but delivery times may vary. We are not
            responsible for delays caused by shipping carriers or weather conditions.
          </p>
          <p>
            5. <span className="font-bold">Disclaimer of Liability</span>: Triple Buzz Smoke and Vape is not
            liable for any injuries or damages resulting from the use of our products. Please use our products
            responsibly and follow all manufacturer instructions.
          </p>
          <p>
            6. <span className="font-bold">Intellectual Property</span>: All content on this website,
            including product descriptions, images, and logos, is the intellectual property of Triple Buzz
            Smoke and Vape.
          </p>
          <p>
            For questions regarding our terms, please contact us at{' '}
            <a href={`tel:${siteConfig.phone}`} className="hover:underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
