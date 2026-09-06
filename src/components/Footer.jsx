import { Link } from 'react-router-dom'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal, FaGooglePay } from 'react-icons/fa'
import { SiVenmo } from 'react-icons/si'
import Logo from './Logo'

const DISCLAIMERS = [
  {
    title: 'FDA Disclaimer:',
    body: 'The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from health care practitioners. Please consult your health care professional about potential interactions or other possible complications before using any product. The Federal Food, Drug, and Cosmetic Act require this notice.',
  },
  {
    title: 'THC-A Disclaimer:',
    body: 'All products contain less than 0.3% hemp derived Delta 9 THC in compliance with the 2018 Farm Bill. This product is not available for shipment to the following states: Arkansas, Hawaii, Idaho, Kansas, Louisiana, Oklahoma, Oregon, Rhode Island, Utah, Vermont.',
  },
  {
    title: 'Delta-8 Disclaimer:',
    body: 'This product is not available for shipment to the following states: Alaska, Arizona, California, Colorado, Connecticut, Delaware, Hawaii, Idaho, Iowa, Massachusetts, Michigan, Minnesota, Mississippi, Montana, Nevada, New Hampshire, New York, North Dakota, Oregon, Rhode Island, Utah, Vermont, Virginia, Washington, West Virginia.',
  },
  {
    title: 'Delta-9 Disclaimer:',
    body: 'All CBD/Hemp products must be compliant with the 2018 Farm Bill. Hemp is defined under the 2018 Farm Bill to include any cannabis plant, or derivative thereof, that contains not more than 0.3% Delta-9 content. Note: in the states of Idaho, New Hampshire, and South Dakota — zero (0%) Delta-9 content is allowable by law. Products with any amount of Delta-9 content must not be shipped to these states.',
  },
  {
    title: 'Kratom Disclaimer:',
    body: 'This product is not available for shipment to the following states: Alabama, Arkansas, Indiana, Rhode Island, Wisconsin.\n\nOr the following counties / municipalities: Sarasota County (Florida), San Diego (California), Oceanside (California), Alton (Illinois), Jerseyville (Illinois), Edwardsville County (Illinois), Columbus (Mississippi), Union County (Mississippi), Ascension (Louisiana), Franklin (Louisiana), Rapides (Louisiana).',
  },
  {
    title: 'Amanita Muscaria Disclaimer:',
    body: 'Amanita Muscaria is deemed illegal in the state of Louisiana. Products containing Amanita Muscaria must not be shipped to the state of Louisiana.',
  },
]

const PAYMENT_ICONS = [
  { Icon: FaCcDiscover, label: 'Discover' },
  { Icon: FaGooglePay, label: 'Google Pay' },
  { Icon: FaCcAmex, label: 'American Express' },
  { Icon: FaCcMastercard, label: 'Mastercard' },
  { Icon: FaCcPaypal, label: 'PayPal' },
  { Icon: SiVenmo, label: 'Venmo' },
  { Icon: FaCcVisa, label: 'Visa' },
]

const columns = [
  {
    heading: 'Area We Serve',
    links: ['Pflugerville', 'Round Rock', 'Georgetown', 'Cedar Park', 'Hutto', 'Kyle Buda', 'San Marcos', 'Waco', 'Taylor'],
    href: '/shop',
  },
  { heading: 'Quick Links', links: ['About Us', 'Contact Us', 'Blog'] },
  { heading: 'Help & Support', links: ['Terms and Conditions', 'Privacy Policy', 'Locations'] },
  { heading: 'Social', links: ['Facebook', 'Instagram'] },
]

const linkHrefs = {
  'About Us': '/about',
  'Contact Us': '/contact-us',
  Blog: '/blog',
  Locations: '/location',
  'Privacy Policy': '/privacy-policy',
  'Terms and Conditions': '/terms-and-conditions',
  'Round Rock': '/round-rock',
  Georgetown: '/georgetown',
  'Cedar Park': '/cedar-park',
  Hutto: '/hutto',
  'Kyle Buda': '/kyle-buda',
  Waco: '/waco',
  Taylor: '/taylor',
  Pflugerville: '/pflugerville',
  'San Marcos': '/san-marcos',
}

const externalLinks = {
  Facebook: 'https://www.facebook.com/triplebuzzsmokeandvape',
  Instagram: 'https://www.instagram.com/triplebuzzatx',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink pt-14 text-neutral-300">
      <div className="container-x grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            At Triple Buzz Smoke and Vape, we offer handpicked premium products, expert guidance, and a
            customer-first approach, making us the top choice in Austin and Pflugerville.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-4 text-sm font-bold text-white">{col.heading}</h4>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) =>
                externalLinks[link] ? (
                  <li key={link}>
                    <a
                      href={externalLinks[link]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ) : linkHrefs[link] ? (
                  <li key={link}>
                    <Link to={linkHrefs[link]} className="text-neutral-400 hover:text-white">
                      {link}
                    </Link>
                  </li>
                ) : col.href ? (
                  <li key={link}>
                    <Link to={col.href} className="text-neutral-400 hover:text-white">
                      {link}
                    </Link>
                  </li>
                ) : (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-10">
        <div className="container-x mx-auto flex max-w-3xl flex-col gap-6 text-center text-xs leading-relaxed text-neutral-400">
          {DISCLAIMERS.map((d) => (
            <p key={d.title}>
              <span className="block font-bold text-brand-gold">{d.title}</span>
              {d.body.split('\n\n').map((para, i) => (
                <span key={i} className="mt-2 block">
                  {para}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-neutral-500">
            Copyright &copy; {year} Triple Buzz Smoke All rights reserved
          </p>
          <div className="flex items-center gap-3">
            {PAYMENT_ICONS.map(({ Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="grid h-7 w-10 place-items-center rounded bg-white text-ink"
              >
                <Icon className="text-xl" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
