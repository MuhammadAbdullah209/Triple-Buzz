import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BrandBadge from '../components/BrandBadge'
import AreasServed from '../components/AreasServed'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../lib/api'

function maskIdentifier(value) {
  if (!value) return ''
  if (value.length <= 5) return value
  return `${value.slice(0, 2)}${'*'.repeat(7)}${value.slice(-3)}`
}

const RESEND_SECONDS = 30
// The backend's OTP generator (utils/OTP_Generator.js) produces a variable
// 6-8 digit code, not a fixed length — 8 boxes covers the longest case, and
// a shorter code just leaves the trailing boxes empty.
const CODE_LENGTH = 8

export default function VerifyOtp() {
  const location = useLocation()
  const navigate = useNavigate()
  const { verify, resendOtp } = useAuth()
  const identifier = location.state?.identifier

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [resendMsg, setResendMsg] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])
  const code = digits.join('')

  const focusBox = (index) => inputRefs.current[index]?.focus()

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((d) => {
      const next = [...d]
      next[index] = digit
      return next
    })
    if (digit && index < CODE_LENGTH - 1) focusBox(index + 1)
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusBox(index - 1)
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return
    e.preventDefault()
    setDigits(Array.from({ length: CODE_LENGTH }, (_, i) => pasted[i] ?? ''))
    focusBox(Math.min(pasted.length, CODE_LENGTH - 1))
  }

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await verify(identifier, code)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not verify your code.')
    } finally {
      setSubmitting(false)
    }
  }

  const resend = async () => {
    setResendMsg('')
    setError('')
    try {
      await resendOtp(identifier)
      setResendMsg('A new code has been sent.')
      setSecondsLeft(RESEND_SECONDS)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not resend the code.')
    }
  }

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
                  We sent a verification code to{' '}
                  <span className="font-semibold text-brand-goldDark">
                    {maskIdentifier(identifier)}
                  </span>
                </p>

                <form onSubmit={onSubmit} noValidate>
                  {error && (
                    <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <div className="mt-6 flex justify-center gap-2">
                    {digits.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        autoFocus={i === 0}
                        value={d}
                        onChange={(e) => handleDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${i + 1}`}
                        className="h-14 w-10 rounded-md border border-neutral-300 text-center text-xl font-semibold text-ink outline-none focus:ring-2 focus:ring-brand-gold/40"
                      />
                    ))}
                  </div>

                  <p className="mt-6 text-sm text-neutral-600">
                    {secondsLeft > 0 ? (
                      <>
                        Resend code in {mm}:{ss}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={resend}
                        className="font-semibold text-ink hover:text-brand-gold"
                      >
                        Resend code
                      </button>
                    )}
                  </p>
                  {resendMsg && <p className="mt-1 text-xs text-brand-goldDark">{resendMsg}</p>}

                  <button
                    type="submit"
                    disabled={submitting || !code}
                    className="mt-6 w-full rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {submitting ? 'Verifying…' : 'Verify'}
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
