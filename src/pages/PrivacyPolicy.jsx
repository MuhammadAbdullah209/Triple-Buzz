import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteData'

export default function PrivacyPolicy() {
  return (
    <>
      <section className="container-x pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Privacy Policy</span>
        </nav>
      </section>

      <section className="container-x py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-sm leading-relaxed text-ink">
          <p>
            Triple Buzz Smoke and Vape respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and share your information.
          </p>
          <p>
            1. <span className="font-bold">Information Collection</span>: We collect information when you visit
            our website, make purchases, or contact us. This may include your name, address, email, phone
            number, and payment information.
          </p>
          <p>
            2. <span className="font-bold">Use of Information</span>: We use your information to process
            orders, provide customer support, and communicate updates and promotions. Your data is only shared
            with third-party services necessary for order fulfillment.
          </p>
          <p>
            3. <span className="font-bold">Data Security</span>: We take reasonable steps to protect your
            personal information. While we use encryption and other security measures, no method of
            transmission over the internet is completely secure.
          </p>
          <p>
            4. <span className="font-bold">Cookies</span>: Our website may use cookies to enhance your browsing
            experience. You may opt to disable cookies in your browser settings, but this may affect site
            functionality.
          </p>
          <p>
            5. <span className="font-bold">Your Rights</span>: You have the right to access, correct, or delete
            your personal information. To exercise your rights, contact us at{' '}
            <a href={`tel:${siteConfig.phone}`} className="hover:underline">
              {siteConfig.phone}
            </a>
            .
          </p>
          <p>By using our site, you consent to our Privacy Policy.</p>
        </div>
      </section>
    </>
  )
}
