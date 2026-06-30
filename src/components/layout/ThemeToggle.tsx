'use client'

import { useTheme } from '@/hooks/useTheme'
import { SunIcon, MoonIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      suppressHydrationWarning
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-muted hover:text-foreground',
        className
      )}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
