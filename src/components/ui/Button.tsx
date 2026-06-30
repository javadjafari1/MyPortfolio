import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-all duration-150 will-change-transform ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:pointer-events-none disabled:opacity-40 select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg ' +
    'hover:opacity-88 hover:-translate-y-0.5 hover:scale-[1.01] ' +
    'active:scale-[0.97] active:translate-y-0',
  secondary:
    'border border-border bg-surface text-foreground ' +
    'hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-0.5 ' +
    'active:scale-[0.97] active:translate-y-0',
  ghost: 'text-muted-fg ' + 'hover:text-foreground hover:bg-muted ' + 'active:scale-[0.97]',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className)

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
