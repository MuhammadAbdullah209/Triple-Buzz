import { siteConfig } from '../data/siteData'

export default function AnnouncementBar() {
  return (
    <div className="w-full border-b border-black/30 bg-ink py-2.5 text-center text-[13px] font-semibold text-white">
      {siteConfig.freeShippingNote}
    </div>
  )
}
