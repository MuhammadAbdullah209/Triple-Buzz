import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import BrandBadge from '../components/BrandBadge'
import AreasServed from '../components/AreasServed'

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

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error.message}</p>}
    </div>
  )
}

export default function CreateAccount() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: { country: 'United States', agreed: true } })

  const password = watch('password')

  const onSubmit = async (data) => {
    console.log('Create account:', data)
    navigate('/create-account/verify', { state: { identifier: data.email } })
  }

  return (
    <>
      <BrandBadge />

      <section className="container-x pb-14 pt-10">
        <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-8 card-shadow">
          <h1 className="text-2xl font-bold text-ink">Create Account</h1>
          <div className="mt-4 border-b border-neutral-200" />

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  placeholder="Your Email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={`w-full rounded-md border px-4 py-2.5 text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-neutral-200 focus:ring-brand-gold/40'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
              </Field>

              <Field label="Mobile Number" error={errors.mobile}>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  aria-invalid={errors.mobile ? 'true' : 'false'}
                  className={`w-full rounded-md border px-4 py-2.5 text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                    errors.mobile
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-neutral-200 focus:ring-brand-gold/40'
                  }`}
                  {...register('mobile', {
                    pattern: {
                      value: /^[0-9+\-\s()]{7,20}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                />
              </Field>

              <Field label="Password" error={errors.password}>
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
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        message:
                          'Must be at least 8 characters with 1 upper case letter, 1 lower case letter and 1 number',
                      },
                    })}
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
                {!errors.password && (
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Password at least 8 characters and includes at least 1 upper case letter, 1
                    lower case letter and 1 number.
                  </p>
                )}
              </Field>

              <Field label="Confirm Password" error={errors.confirmPassword}>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    className={`w-full rounded-md border px-4 py-2.5 pr-10 text-sm text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-neutral-200 focus:ring-brand-gold/40'
                    }`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match',
                    })}
                  />
                  <button
                    type="button"
                    aria-label="Toggle confirm password visibility"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    <EyeIcon off={showConfirm} />
                  </button>
                </div>
              </Field>

              <Field label="Country or region" error={errors.country}>
                <div className="relative">
                  <select
                    aria-invalid={errors.country ? 'true' : 'false'}
                    className={`w-full appearance-none rounded-md border bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 ${
                      errors.country
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-neutral-200 focus:ring-brand-gold/40'
                    }`}
                    {...register('country', { required: 'Please select a country or region' })}
                  >
                    <option value="">Select a country</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>

              <div>
                <label className="flex items-start gap-3 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brand-gold"
                    {...register('agreed', {
                      required: 'You must agree to the terms to continue',
                    })}
                  />
                  <span>
                    By creating an account, you agree to the{' '}
                    <a href="#" className="text-ink hover:text-brand-gold">
                      Conditions of Use
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-ink hover:text-brand-gold">
                      Privacy Notice
                    </a>
                    .
                  </span>
                </label>
                {errors.agreed && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.agreed.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
              >
                {isSubmitting ? 'Creating Account…' : 'Create Account'}
              </button>

              <p className="text-center text-sm text-neutral-600">
                Already have an account?{' '}
                <Link to="/sign-in" className="font-semibold text-ink hover:text-brand-gold">
                  Sign in
                </Link>
              </p>
            </form>
        </div>
      </section>

      <AreasServed />
    </>
  )
}
