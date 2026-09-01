import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import BrandBadge from '../components/BrandBadge'
import AreasServed from '../components/AreasServed'

function maskIdentifier(value) {
  if (!value) return ''
  if (value.length <= 5) return value
  return `${value.slice(0, 2)}${'*'.repeat(7)}${value.slice(-3)}`
}

const CODE_LENGTH = 4
const RESEND_SECONDS = 30

export default function VerifyOtp() {
  const location = useLocation()
  const navigate = useNavigate()
  const identifier = location.state?.identifier

  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { digits: Array(CODE_LENGTH).fill('') } })

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [secondsLeft])

  useEffect(() => {
    if (!submitted) return
    const t = setTimeout(() => navigate('/sign-in'), 1200)
    return () => clearTimeout(t)
  }, [submitted, navigate])

  const mm = String(Math.floor(Math.max(secondsLeft, 0) / 60)).padStart(2, '0')
  const ss = String(Math.max(secondsLeft, 0) % 60).padStart(2, '0')

  const onSubmit = async (data) => {
    console.log('Verify OTP:', { identifier, code: data.digits.join('') })
    await new Promise((r) => setTimeout(r, 400))
    setSubmitted(true)
  }

  const handleDigitChange = (index, value, onChange) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    onChange(digit)
    if (digit && index < CODE_LENGTH - 1) {
      setFocus(`digits.${index + 1}`)
    }
  }

  const handleKeyDown = (index, e, currentValue) => {
    if (e.key === 'Backspace' && !currentValue && index > 0) {
      setFocus(`digits.${index - 1}`)
    }
  }

  const hasError = errors.digits && Object.values(errors.digits).some(Boolean)

  return (
    <>
      <BrandBadge />

      <section className="container-x pb-14 pt-10">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink">Verification Code</h1>

          {!identifier && (
            <p className="mt-6 text-sm text-neutral-600">
              We couldn&rsquo;t find your email or phone number.{' '}
              <button
                type="button"
                onClick={() => navigate('/create-account')}
                className="font-semibold text-ink hover:text-brand-gold"
              >
                Go back
              </button>{' '}
              and try again.
            </p>
          )}

          {identifier && submitted ? (
            <div className="mt-6 rounded-md border border-brand-gold/40 bg-amber-50 p-4 text-sm text-ink">
              You&rsquo;re verified! Taking you to sign in&hellip;
            </div>
          ) : (
            identifier && (
              <>
                <p className="mt-3 text-sm text-neutral-600">
                  We sent OTP code to{' '}
                  <span className="font-semibold text-brand-goldDark">
                    {maskIdentifier(identifier)}
                  </span>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="mt-6 flex justify-center gap-3">
                    {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                      <Controller
                        key={i}
                        name={`digits.${i}`}
                        control={control}
                        rules={{ required: true, pattern: /^[0-9]$/ }}
                        render={({ field }) => (
                          <input
                            ref={(el) => {
                              field.ref(el)
                              inputRefs.current[i] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={field.value}
                            onChange={(e) => handleDigitChange(i, e.target.value, field.onChange)}
                            onKeyDown={(e) => handleKeyDown(i, e, field.value)}
                            aria-label={`Digit ${i + 1}`}
                            className={`h-16 w-14 rounded-md border text-center text-xl font-semibold text-ink focus:outline-none focus:ring-2 ${
                              hasError
                                ? 'border-red-400 focus:ring-red-200'
                                : 'border-neutral-300 focus:ring-brand-gold/40'
                            }`}
                          />
                        )}
                      />
                    ))}
                  </div>
                  {hasError && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      Enter the 4-digit code we sent you
                    </p>
                  )}

                  <p className="mt-6 text-sm text-neutral-600">
                    {secondsLeft > 0 ? (
                      <>
                        Resend code in {mm}:{ss}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSecondsLeft(RESEND_SECONDS)}
                        className="font-semibold text-ink hover:text-brand-gold"
                      >
                        Resend code
                      </button>
                    )}
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Verifying…' : 'Verify'}
                  </button>
                </form>
              </>
            )
          )}
        </div>
      </section>

      <AreasServed />
    </>
  )
}
