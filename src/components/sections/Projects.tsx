'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { ProjectGallery } from '@/components/gallery/ProjectGallery'
import { PlayStoreIcon, ExternalLinkIcon, GitHubIcon } from '@/components/icons'
import { projects } from '@/content/data'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const isOpenSource = Boolean(project.links.github)
  const hasPlayStore = Boolean(project.links.playStore)

  return (
    <AnimateIn delay={delay}>
      <motion.article
        whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
        className={cn(
          'group flex h-full flex-col rounded-xl border border-border bg-surface p-6',
          'transition-colors duration-200 hover:border-white/10'
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              {isOpenSource && (
                <Badge variant="outline" className="text-[11px]">
                  Open Source
                </Badge>
              )}
              {project.scale && !isOpenSource && (
                <Badge variant="default" className="text-[11px]">
                  {project.scale}
                </Badge>
              )}
            </div>
          </div>

          {/* Link icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {hasPlayStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on Google Play`}
                className={cn(
                  'flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5',
                  'text-xs text-muted-fg transition-all duration-150',
                  'hover:-translate-y-0.5 hover:border-white/15 hover:text-foreground'
                )}
              >
                <PlayStoreIcon size={12} />
                Play Store
                <ExternalLinkIcon size={11} />
              </a>
            )}
            {isOpenSource && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className={cn(
                  'flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5',
                  'text-xs text-muted-fg transition-all duration-150',
                  'hover:-translate-y-0.5 hover:border-white/15 hover:text-foreground'
                )}
              >
                <GitHubIcon size={12} />
                GitHub
                <ExternalLinkIcon size={11} />
              </a>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && <ProjectGallery title={project.title} images={project.gallery} />}

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-fg">{project.description}</p>

        {/* Challenge — shown as a subtle aside */}
        {project.challenge && (
          <p className="mb-4 text-xs leading-relaxed text-muted-fg/65 border-l border-border/60 pl-3">
            {project.challenge}
          </p>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="default" className="text-[11px]">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="default" className="text-[11px]">
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>
      </motion.article>
    </AnimateIn>
  )
}

export function Projects() {
  const featured = projects.filter(
    (p) =>
      p.context === 'personal' &&
      ['linkaroo', 'pofox', 'qrbuddy', 'backgroundable'].includes(p.slug)
  )

  return (
    <Section id="projects">
      {/* Header */}
      <AnimateIn className="mb-14">
        <span className="mb-3 flex items-center gap-3">
          <span className="h-px w-5 bg-accent" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            Projects
          </span>
        </span>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          What I&apos;ve built
        </h2>
        <p className="max-w-lg text-base text-muted-fg">
          Personal projects exploring Kotlin Multiplatform, Compose, and modern Android
          architecture.
        </p>
      </AnimateIn>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 0.07} />
        ))}
      </div>
    </Section>
  )
}
