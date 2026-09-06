import iconTruck from '../assets/images/icons/icon-fast-delivery.svg'
import iconDelivery from '../assets/images/icons/icon-return-refund.svg'
import iconDiscount from '../assets/images/icons/icon-member-discount.svg'
import iconSupport from '../assets/images/icons/icon-support-24-7.svg'
import hookahProduct from '../assets/images/hookah-product.png'

const trustFeatures = [
  { id: 1, title: 'Fast Delivery', icon: iconTruck },
  { id: 2, title: 'Return & Refund', icon: iconDelivery },
  { id: 3, title: 'Member Discount', icon: iconDiscount },
  { id: 4, title: 'Support 24/7', icon: iconSupport },
]

export default function TrustSection() {
  return (
    <section className="py-14">
      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title mb-2">We deliver Trust</h2>
          <p className="mb-8 text-sm text-neutral-500">
            Fast, reliable service and real support — from checkout to your doorstep.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {trustFeatures.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50">
                  <img src={f.icon} alt="" className="h-6 w-6 object-contain" />
                </span>
                <span className="text-sm font-semibold text-ink">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute h-[280px] w-[340px] rounded-[45%_55%_60%_40%] bg-neutral-100" />
          <img src={hookahProduct} alt="Hookah" className="relative max-h-[320px] w-auto object-contain" />
        </div>
      </div>
    </section>
  )
}
