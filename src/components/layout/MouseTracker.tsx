'use client'

import { useEffect } from 'react'

// Updates --mouse-x and --mouse-y on :root so CSS can use them
// for the dot-grid spotlight and accent glow in globals.css.
export function MouseTracker() {
  useEffect(() => {
    let rafId: number

    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const x = ((e.clientX / window.innerWidth) * 100).toFixed(2) + '%'
        const y = ((e.clientY / window.innerHeight) * 100).toFixed(2) + '%'
        document.documentElement.style.setProperty('--mouse-x', x)
        document.documentElement.style.setProperty('--mouse-y', y)
      })
    }

    window.addEventListener('mousemove', handler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
