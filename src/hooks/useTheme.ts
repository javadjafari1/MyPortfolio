'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  // Use .light / .dark classes — dark is the default (:root) so we only
  // need to add .light when switching away from dark.
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.classList.toggle('dark-explicit', theme === 'dark')
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  // Default: dark regardless of system preference
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  return { theme, toggle, isDark: theme === 'dark' }
}
