import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { subscribeNewsletter, ApiError } from '../lib/api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)
    try {
      const data = await subscribeNewsletter(email)
      setMessage(data.message || "You're on the list!")
      setEmail('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not subscribe. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="border-b border-neutral-400 bg-ink py-16">
      <div className="container-x flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <h2 className="text-center font-display text-3xl italic leading-tight text-white sm:text-4xl lg:text-left">
          Stay In The Know
          <br />
          With Our Newsletter
        </h2>

        <div className="flex w-full max-w-xl flex-col gap-2">
          <form
            className="flex w-full items-center gap-2 rounded-full bg-neutral-100 p-1.5 pl-6"
            onSubmit={onSubmit}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full bg-transparent text-sm text-ink placeholder:text-neutral-500 outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-goldDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Subscribing…' : 'Subscribe'} <FiArrowRight />
            </button>
          </form>
          {message && <p className="text-center text-sm text-brand-gold lg:text-left">{message}</p>}
          {error && <p className="text-center text-sm text-red-400 lg:text-left">{error}</p>}
        </div>
      </div>
    </section>
  )
}
