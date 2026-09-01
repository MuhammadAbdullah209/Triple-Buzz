import slide1 from '../assets/images/hero-slide-1.png'
import slide2 from '../assets/images/hero-slide-2.png'
import slide3 from '../assets/images/hero-slide-3.png'
import slide4 from '../assets/images/hero-slide-4.png'

// slide 1 is the fully composed client banner (logo/copy/contact bar baked into the image),
// so it renders with no text overlay. The rest reuse the provided product photography
// with matching overlay copy to keep the slider consistent.
export const heroSlides = [
  {
    id: 1,
    img: slide1,
    baked: true,
  },
  {
    id: 2,
    img: slide2,
    eyebrow: 'The New',
    title: 'THC Vapes',
    subtitle: 'Premium pods & disposables',
  },
  {
    id: 3,
    img: slide3,
    eyebrow: 'The New',
    title: 'Shisha Hookah',
    subtitle: 'Old world flavor, new world style',
  },
  {
    id: 4,
    img: slide4,
    eyebrow: 'The New',
    title: 'Torches & Lighters',
    subtitle: 'Built for the pros',
  },
]
