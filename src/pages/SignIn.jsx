import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import BrandBadge from '../components/BrandBadge'
import AreasServed from '../components/AreasServed'
import { siteConfig } from '../data/siteData'

function EyeIcon({ off }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" strokeLinecap="round" />}
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M15.5 12.5h-2v7h-3v-7H9v-2.6h1.5V8.4c0-1.9 1-3 3.2-3h1.9v2.6h-1.3c-.7 0-.9.4-.9.9v1h2.3z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#111" className="h-5 w-5">
      <path d="M16.4 1c.1 1.1-.3 2.2-1 3-.7.8-1.8 1.5-2.9 1.4-.1-1.1.4-2.2 1-2.9.8-.9 2-1.5 2.9-1.5zM20 17.2c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9-1.9 0-2.4.9-3.7.9-1.6 0-2.8-1.6-3.7-3-2.6-3.9-2.9-8.5-1.3-11 1.1-1.8 2.9-2.9 4.6-2.9 1.7 0 2.8.9 4.2.9 1.4 0 2.2-.9 4.2-.9 1.5 0 3 .8 4.1 2.2-3.6 2-3 7.2.5 9z" />
    </svg>
  )
}

export default function SignIn() {
  const [showPw, setShowPw] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: { savePassword: true } })

  const onSubmit = async (data) => {
    console.log('Sign in:', data)
    await new Promise((r) => setTimeout(r, 400))
    setSignedIn(true)
  }

  return (
    <>
      <BrandBadge />

      <section className="container-x pb-14 pt-10">
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 card-shadow">
            <h1 className="text-2xl font-bold text-ink">Sign in</h1>
            <div className="mt-4 border-b border-neutral-200" />

            {signedIn ? (
              <div className="mt-6 rounded-md border border-brand-gold/40 bg-amber-50 p-4 text-sm text-ink">
                You&rsquo;re signed in! Welcome back to {siteConfig.name}.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink">
                    Email or mobile phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Email or Mobile phone Number"
                    aria-invalid={errors.identifier ? 'true' : 'false'}
                    className={`w-full rounded-md border px-4 py-2.5 text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                      errors.identifier
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-neutral-200 focus:ring-brand-gold/40'
                    }`}
                    {...register('identifier', {
                      required: 'Enter your email or mobile phone number',
                      validate: (value) => {
                        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        const isPhone = /^[0-9+\-\s()]{7,20}$/.test(value)
                        return isEmail || isPhone || 'Enter a valid email or phone number'
                      },
                    })}
                  />
                  {errors.identifier && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      placeholder="Password"
                      aria-invalid={errors.password ? 'true' : 'false'}
                      className={`w-full rounded-md border px-4 py-2.5 pr-10 text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-neutral-200 focus:ring-brand-gold/40'
                      }`}
                      {...register('password', { required: 'Password is required' })}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    >
                      <EyeIcon off={showPw} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 shrink-0 accent-brand-gold"
                      {...register('savePassword')}
                    />
                    Save password
                  </label>
                  <a href="#" className="text-sm text-ink hover:text-brand-gold">
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                >
                  {isSubmitting ? 'Signing In…' : 'Sign In'}
                </button>

                <p className="text-sm text-neutral-600">
                  Don&rsquo;t have an account?{' '}
                  <Link to="/create-account" className="font-semibold text-ink hover:text-brand-gold">
                    Register
                  </Link>
                </p>
              </form>
            )}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <p className="shrink-0 text-sm text-neutral-500">Or, continue with</p>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <button
              type="button"
              aria-label="Continue with Google"
              className="flex h-12 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-black/[0.02]"
            >
              <GoogleIcon />
            </button>
            <button
              type="button"
              aria-label="Continue with Facebook"
              className="flex h-12 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-black/[0.02]"
            >
              <FacebookIcon />
            </button>
            <button
              type="button"
              aria-label="Continue with Apple"
              className="flex h-12 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-black/[0.02]"
            >
              <AppleIcon />
            </button>
          </div>
        </div>
      </section>

      <AreasServed />
    </>
  )
}
