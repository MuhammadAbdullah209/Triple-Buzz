import flum from '../assets/images/brand-flum.png'
import whipit from '../assets/images/brand-whipit.png'
import swftmod from '../assets/images/brand-swftmod.png'
import storzbickel from '../assets/images/brand-storzbickel.png'
import puffco from '../assets/images/brand-puffco.png'
import drdabber from '../assets/images/brand-drdabber.png'

const brands = [
  { name: 'Flum', logo: flum },
  { name: 'Whip-It!', logo: whipit },
  { name: 'Swft Mod', logo: swftmod },
  { name: 'Storz & Bickel', logo: storzbickel },
  { name: 'Puffco', logo: puffco },
  { name: 'Dr. Dabber', logo: drdabber },
]

export default function BrandsSection() {
  return (
    <section className="container-x py-10">
      <h2 className="section-title mb-6">Featured Brands</h2>
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
        {brands.map((b) => (
          <div key={b.name} className="flex h-24 items-center justify-center px-6">
            <img src={b.logo} alt={b.name} className="max-h-9 w-auto object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}
