'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { MediumIcon, ExternalLinkIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import articles from '@/content/articles.json'
import type { Article } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function ArticleCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <AnimateIn delay={delay}>
      <motion.a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4, transition: { duration: 0.2, ease } }}
        className={cn(
          'group flex h-full flex-col rounded-xl border border-border bg-surface p-6',
          'transition-colors duration-200 hover:border-white/10'
        )}
      >
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-fg/70">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>

        <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight text-foreground">
          {article.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-fg">{article.summary}</p>

        {article.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div
          className={cn(
            'mt-auto flex items-center gap-1.5 text-xs font-medium text-accent',
            'transition-transform duration-150 group-hover:translate-x-0.5'
          )}
        >
          <MediumIcon size={13} />
          Read on Medium
          <ExternalLinkIcon size={11} />
        </div>
      </motion.a>
    </AnimateIn>
  )
}

export function Writing() {
  const posts = articles as Article[]

  if (posts.length === 0) return null

  return (
    <Section id="writing">
      <AnimateIn className="mb-14">
        <span className="mb-3 flex items-center gap-3">
          <span className="h-px w-5 bg-accent" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-widest text-accent">Writing</span>
        </span>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Notes from the field
        </h2>
        <p className="max-w-lg text-base text-muted-fg">
          Occasional technical articles on Android, Kotlin, and the architecture decisions behind
          them — published on Medium.
        </p>
      </AnimateIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((article, i) => (
          <ArticleCard key={article.url} article={article} delay={i * 0.07} />
        ))}
      </div>
    </Section>
  )
}
