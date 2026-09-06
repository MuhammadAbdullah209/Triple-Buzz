import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tb_age_verified'

export default function AgeVerificationModal() {
  const [status, setStatus] = useState('checking') // checking | prompt | declined | verified
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY) === 'true'
    setStatus(verified ? 'verified' : 'prompt')
  }, [])

  useEffect(() => {
    if (status !== 'declined') return
    if (countdown <= 0) {
      window.location.href = 'https://www.google.com'
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [status, countdown])

  useEffect(() => {
    if (status === 'prompt' || status === 'declined') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [status])

  if (status === 'checking' || status === 'verified') return null

  const handleAccept = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setStatus('verified')
  }

  const handleDecline = () => {
    setCountdown(3)
    setStatus('declined')
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        {status === 'prompt' && (
          <>
            <h2 className="font-display text-3xl font-bold text-ink">Age Verification</h2>
            <p className="mt-4 text-sm text-neutral-600">
              By law, this content is only available to users 21 years or older.
              <br />
              Please confirm your age to proceed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 rounded-lg bg-yellow-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-600"
              >
                Yes, I'm over 21
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 rounded-lg bg-red-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-900"
              >
                No, I'm under 21
              </button>
            </div>
          </>
        )}

        {status === 'declined' && (
          <>
            <h2 className="font-display text-3xl font-bold text-ink">Access Denied</h2>
            <p className="mt-4 text-sm text-neutral-600">
              You must be 21 years or older to view this site.
            </p>
            <p className="mt-6 text-sm font-semibold text-neutral-500">
              Redirecting you in
            </p>
            <p className="mt-1 text-5xl font-bold text-red-800">{countdown}</p>
          </>
        )}
      </div>
    </div>
  )
}
