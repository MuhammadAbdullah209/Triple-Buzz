import { useCallback, useEffect, useRef, useState } from 'react'
import { FiBluetooth, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { heroSlides } from '../data/heroSlides'

const AUTOPLAY_MS = 5500

export default function Hero() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const goTo = useCallback((index) => {
    setActive((index + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => {
    pause()
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length)
    }, AUTOPLAY_MS)
  }

  return (
    <section
      className="relative h-[420px] w-full overflow-hidden bg-ink sm:h-[480px] lg:h-[600px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={slide.img}
            alt={slide.baked ? 'The New Proxy — A Pro Experience' : slide.title}
            className="h-full w-full object-cover"
          />
          {!slide.baked && <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />}

          <div className="absolute left-6 top-1/2 max-w-md -translate-y-1/2 sm:left-12">
            {!slide.baked && (
              <>
                <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.4em] text-brand-gold">
                  {slide.eyebrow}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                  {slide.title}
                </h2>
                <p className="mt-3 text-base text-neutral-200">{slide.subtitle}</p>
              </>
            )}
            {!slide.baked && (
              <button type="button" className="btn-gold mt-6">
                Shop Now
              </button>
            )}
          </div>

          {slide.baked && (
            <span className="absolute bottom-[9%] right-[3%] flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <FiBluetooth /> Bluetooth
            </span>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
      >
        <FiChevronLeft className="text-lg" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
      >
        <FiChevronRight className="text-lg" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? 'w-6 bg-brand-gold' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
