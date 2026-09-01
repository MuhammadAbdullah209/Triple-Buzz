import Logo from './Logo'

const columns = [
  { heading: 'About', links: ['About Us', 'Our Branches', 'Changelog'] },
  { heading: 'Quick Links', links: ['FAQs', 'Recipes', 'Contact Us'] },
  { heading: 'Help & Support', links: ['Terms of Privacy', 'Privacy Policy', 'Security'] },
  { heading: 'Company', links: ['Blog', 'Contact'] },
  { heading: 'Social', links: ['Facebook', 'Instagram', 'Twitter'] },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink pt-14 text-neutral-300">
      <div className="container-x grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr]">
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
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-400 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-neutral-500">
        Copyright &copy; {year} Triple Buzz Smoke All rights reserved
      </div>
    </footer>
  )
}
