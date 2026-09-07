import { useEffect } from 'react'

const AWAY_TITLE = "🔥 Don't forget to come back!"

// Swaps the document title (which is also what shows in the browser tab's
// hover tooltip) whenever the user switches away to another tab, and
// restores the page's real title the moment they come back.
export default function useTabAttention() {
  useEffect(() => {
    const originalTitle = document.title

    const handleVisibilityChange = () => {
      document.title = document.hidden ? AWAY_TITLE : originalTitle
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.title = originalTitle
    }
  }, [])
}
