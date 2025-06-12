'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const words = ['Welcome', 'to', 'my', 'portfolio']
const baseTitle = '1337 - 1337'

export default function AnimatedTitle() {
  const pathname = usePathname()

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(interval)
        return
      }
      
      const newTitle = words.slice(0, currentIndex + 1).join(' ') + ' | ' + baseTitle
      document.title = newTitle
      currentIndex++
    }, 900) // Change word every 900ms

    // Cleanup
    return () => {
      clearInterval(interval)
      document.title = baseTitle // Reset title on unmount
    }
  }, [pathname]) // Re-run animation when path changes

  return null // This component doesn't render anything
} 