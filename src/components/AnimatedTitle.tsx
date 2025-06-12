'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const words = ['Welcome', 'to', 'my', 'portfolio']
const baseTitle = '1337 - 1337'

export default function AnimatedTitle() {
  const pathname = usePathname()

  useEffect(() => {
    let currentIndex = 0
    let isReversing = false

    const interval = setInterval(() => {
      // Update title based on current direction
      const newTitle = words.slice(0, currentIndex + 1).join(' ') + ' | ' + baseTitle
      document.title = newTitle

      // Update index based on direction
      if (isReversing) {
        currentIndex--
        if (currentIndex < 0) {
          currentIndex = 0
          isReversing = false
        }
      } else {
        currentIndex++
        if (currentIndex >= words.length) {
          currentIndex = words.length - 1
          isReversing = true
        }
      }
    }, 900) // Change word every 900ms

    // Cleanup
    return () => {
      clearInterval(interval)
      document.title = baseTitle // Reset title on unmount
    }
  }, [pathname]) // Re-run animation when path changes

  return null // This component doesn't render anything
} 