export default function Newsletter() {
  return (
    <section className="bg-neutral-50 py-14">
      <div className="container-x flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-2xl text-ink">Newsletter</h2>
        <p className="text-sm font-semibold uppercase tracking-wide text-ink">
          Sign up and get 5% off your next purchase!
        </p>
        <p className="text-sm text-neutral-500">Gain access to exclusive sales, limited drops and more.</p>
        <form
          className="mt-4 flex w-full max-w-md overflow-hidden rounded border border-neutral-200"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full bg-white px-4 py-3 text-sm text-ink outline-none"
          />
          <button
            type="submit"
            className="whitespace-nowrap bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
