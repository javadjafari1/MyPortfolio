import { AnimateIn } from '@/components/motion/AnimateIn'
import { cn } from '@/lib/utils'

const metrics = [
  { value: '8M+', label: 'Users reached' },
  { value: '8+', label: 'Years of experience' },
  { value: '5', label: 'Production applications' },
  { value: 'Senior', label: 'Android Engineer' },
]

export function TrustMetrics() {
  return (
    <div className="border-y border-border">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {metrics.map((m, i) => (
            <AnimateIn key={m.label} delay={i * 0.06}>
              <div
                className={cn(
                  'flex flex-col gap-1 px-6 py-8 md:px-8',
                  i === 0 && 'pl-0',
                  i === metrics.length - 1 && 'pr-0'
                )}
              >
                <span className="text-2xl font-semibold tracking-tight text-foreground">
                  {m.value}
                </span>
                <span className="text-sm text-muted-fg">{m.label}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}
