import { useEffect, useState } from 'react'
import { siteConfig } from '../data/siteData'
import { fetchRibbonCoupon } from '../lib/api'

export default function AnnouncementBar() {
  const [ribbonText, setRibbonText] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchRibbonCoupon('triplebuzz')
      .then((data) => {
        if (!cancelled) setRibbonText(data?.coupon?.ribbonText || null)
      })
      .catch(() => {
        // No active/featured coupon (or the request failed) — fall back to
        // the default free-shipping note below rather than showing nothing.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="w-full border-b border-black/30 bg-ink py-2.5 text-center text-[13px] font-semibold text-white">
      {ribbonText || siteConfig.freeShippingNote}
    </div>
  )
}
