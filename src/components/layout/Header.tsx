'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from './ThemeToggle'
import { personal } from '@/content/data'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <Container as="nav" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground transition-opacity duration-150 hover:opacity-60"
            aria-label={`${personal.name} — home`}
          >
            {personal.name}
          </Link>

          <div className="flex items-center gap-1">
            <nav className="hidden items-center sm:flex" aria-label="Site sections">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm text-muted-fg',
                    'transition-colors duration-150 hover:text-foreground',
                    // Underline slide-in on hover
                    'after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px',
                    'after:bg-accent after:scale-x-0 after:origin-left',
                    'after:transition-transform after:duration-200',
                    'hover:after:scale-x-100'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
