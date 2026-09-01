import { FiNavigation } from 'react-icons/fi'
import { areas } from '../data/siteData'

export default function AreasServed() {
  return (
    <section className="bg-white py-14">
      <div className="container-x">
        <div className="mb-10 text-center">
          <h2 className="section-title">Areas We Serve</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600">
            Proudly serving the greater Austin area with premium smoke shop products and exceptional service.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {areas.map((area) => (
            <div key={area.title} className="text-center">
              <h3 className="mb-5 text-base font-bold text-ink">{area.title}</h3>
              <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
                {area.places.map((place, i) => (
                  <span key={place} className="flex items-center">
                    {i > 0 && <span className="mx-3 h-4 w-px bg-neutral-200" />}
                    <span className="flex items-center gap-2 text-sm text-neutral-500">
                      <FiNavigation className="text-brand-gold" />
                      {place}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {areas.map((area) => (
            <div
              key={area.title}
              className="h-56 w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-200"
            >
              <img
                src={`https://placehold.co/640x300/e5e5e5/666666?text=Map+-+${encodeURIComponent(area.title)}`}
                alt={`Map of ${area.title}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
