import { useEffect, useState } from 'react'
import { SocialIcon } from './Icons'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d="M9.5 14.5l5-5M8 17l-1.5 1.5a3.5 3.5 0 0 1-5-5L3 12M16 7l1.5-1.5a3.5 3.5 0 0 1 5 5L21 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function shareLink({ platform, url, text }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'x':
      return `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    default:
      return null
  }
}

const PLATFORMS = [
  { id: 'facebook', label: 'Facebook', icon: 'facebook', bg: '#1877F2' },
  { id: 'x', label: 'X', icon: 'twitter', bg: '#000000' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', bg: '#25D366' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', bg: '#E1306C' },
]

export default function ShareModal({ open, onClose, url, title }) {
  const [copied, setCopied] = useState(false)
  const [instagramHint, setInstagramHint] = useState(false)

  useEffect(() => {
    if (!open) {
      setCopied(false)
      setInstagramHint(false)
    }
  }, [open])

  if (!open) return null

  const shareText = title || 'Check this out from Triple Buzz Smoke & Vape'

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePlatformClick = (platform) => {
    if (platform === 'instagram') {
      // Instagram has no web share-intent URL — copy the link instead so the
      // user can paste it into their bio, a story, or a DM.
      copyLink()
      setInstagramHint(true)
      setTimeout(() => setInstagramHint(false), 4000)
      return
    }
    const href = shareLink({ platform, url, text: shareText })
    if (href) window.open(href, '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Share this product</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 hover:bg-black/5 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-4">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePlatformClick(p.id)}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-full text-white transition hover:opacity-85"
                style={{ backgroundColor: p.bg }}
              >
                <SocialIcon type={p.icon} className="h-5 w-5" />
              </span>
              <span className="text-[11px] text-neutral-500">{p.label}</span>
            </button>
          ))}
        </div>

        {instagramHint && (
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-brand-goldDark">
            Instagram doesn&rsquo;t support direct link sharing &mdash; the link is copied, paste it
            into your bio, story, or a DM.
          </p>
        )}

        <div className="mt-5">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Or copy link
          </p>
          <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-1.5 pl-3">
            <LinkIcon className="shrink-0 text-neutral-400" />
            <input
              type="text"
              readOnly
              value={url}
              onFocus={(e) => e.target.select()}
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-600 outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
                copied ? 'bg-brand-gold text-ink' : 'bg-ink text-white hover:bg-black'
              }`}
            >
              {copied ? <CheckIcon /> : null}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
