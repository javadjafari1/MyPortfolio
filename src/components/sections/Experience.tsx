import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { experiences } from '@/content/data'

export function Experience() {
  const [primary, ...rest] = experiences

  return (
    <Section id="experience">
      {/* Section header */}
      <AnimateIn className="mb-14">
        <span className="mb-3 flex items-center gap-3">
          <span className="h-px w-5 bg-accent" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            Experience
          </span>
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Where I&apos;ve worked
        </h2>
      </AnimateIn>

      <div className="space-y-6">
        {/* Primary role — expanded */}
        {primary && (
          <AnimateIn>
            <article className="rounded-xl border border-border bg-surface p-7 md:p-8">
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-muted-fg">
                    {primary.period} · {primary.location}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {primary.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-fg">{primary.company}</p>
                </div>
              </div>

              {/* Description */}
              <p className="mb-7 max-w-2xl text-base leading-relaxed text-muted-fg">
                {primary.description}
              </p>

              {/* Highlights */}
              {primary.highlights.length > 0 && (
                <ul className="mb-7 space-y-3.5">
                  {primary.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-[9px] h-px w-4 flex-shrink-0 bg-accent/50"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed text-muted-fg">{h}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {primary.technologies.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          </AnimateIn>
        )}

        {/* Secondary roles — compact */}
        {rest.map((exp, i) => (
          <AnimateIn key={exp.company} delay={0.08 + i * 0.06}>
            <article className="rounded-xl border border-border bg-surface/60 px-7 py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-fg">
                    {exp.period} · {exp.location}
                  </p>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-fg">{exp.company}</p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-fg">
                {exp.description}
              </p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </Section>
  )
}
