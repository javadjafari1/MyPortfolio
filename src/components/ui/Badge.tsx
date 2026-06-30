import { cn } from '@/lib/utils'

type Variant = 'default' | 'outline' | 'accent'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const variants: Record<Variant, string> = {
  default: 'bg-muted text-muted-fg',
  outline: 'border border-border text-muted-fg',
  accent: 'bg-accent/10 text-accent border border-accent/20',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
