import { Section } from '@/components/ui/Section'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { skills } from '@/content/data'

export function Skills() {
  return (
    <Section id="skills">
      <AnimateIn className="mb-14">
        <span className="mb-3 flex items-center gap-3">
          <span className="h-px w-5 bg-accent" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-widest text-accent">Skills</span>
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Technical expertise
        </h2>
      </AnimateIn>

      <div className="grid gap-px rounded-xl border border-border overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <AnimateIn key={group.category} delay={i * 0.07}>
            <div className="bg-surface p-6 h-full">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-fg">
                    <span className="h-px w-3 flex-shrink-0 bg-border" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        ))}
      </div>
    </Section>
  )
}
