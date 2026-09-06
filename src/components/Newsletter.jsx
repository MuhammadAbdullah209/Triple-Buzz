import { FiArrowRight } from 'react-icons/fi'

export default function Newsletter() {
  return (
    <section className="border-b border-neutral-400 bg-ink py-16">
      <div className="container-x flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <h2 className="text-center font-display text-3xl italic leading-tight text-white sm:text-4xl lg:text-left">
          Stay In The Know
          <br />
          With Our Newsletter
        </h2>

        <form
          className="flex w-full max-w-xl items-center gap-2 rounded-full bg-neutral-100 p-1.5 pl-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full bg-transparent text-sm text-ink placeholder:text-neutral-500 outline-none"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-goldDark"
          >
            Subscribe <FiArrowRight />
          </button>
        </form>
      </div>
    </section>
  )
}
