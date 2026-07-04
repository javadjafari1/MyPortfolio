'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { personal } from '@/content/data'
import { basePath } from '@/lib/basePath'

const ease = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease },
  }
}

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: 0.75, ease },
  }
}

// Emphasize the final word of the headline in the accent color — ties the
// headline back to the portrait glow and primary CTA without a gradient.
function splitLastWord(text: string) {
  const idx = text.lastIndexOf(' ')
  return [text.slice(0, idx + 1), text.slice(idx + 1)] as const
}

export function Hero() {
  const [headlineLead, headlineEmphasis] = splitLastWord(personal.headline)

  return (
    <section aria-label="Introduction" className="relative flex min-h-dvh items-center">
      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-32 lg:px-8">
        {/*
         * Mobile order: eyebrow → h1 → portrait → bio → CTAs → badge
         * Desktop order: left col (all text) | right col (portrait)
         */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* ── Left / text column ── */}
          <div className="flex flex-1 flex-col">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0)} className="mb-7 flex items-center gap-3">
              <span className="h-px w-5 bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-accent">
                {personal.role}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.09)}
              className="mb-6 text-5xl font-semibold leading-[1.07] tracking-[-0.03em] text-foreground md:text-6xl lg:text-[64px]"
            >
              {headlineLead}
              <span className="text-accent">{headlineEmphasis}</span>
            </motion.h1>

            {/* Portrait — mobile only (appears after headline) */}
            <motion.div {...fadeIn(0.18)} className="mb-8 md:hidden">
              <PortraitImage />
            </motion.div>

            {/* Bio */}
            <motion.p
              {...fadeUp(0.22)}
              className="mb-9 max-w-[480px] text-lg leading-relaxed text-muted-fg"
            >
              {personal.bio}
            </motion.p>

            {/* CTAs + current status — grouped as one decision unit */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button href="#projects" size="lg">
                  View my work
                </Button>
                <Button href="#contact" variant="secondary" size="lg">
                  Get in touch ↗
                </Button>
              </div>

              <div className="flex items-center gap-2 pl-0.5 text-sm text-muted-fg">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span>{personal.availability}</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right / portrait column — desktop only ── */}
          <motion.div
            {...fadeIn(0.2)}
            className="hidden md:block md:w-[340px] lg:w-[380px] flex-shrink-0"
          >
            <PortraitImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="text-sm text-muted-fg/25"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

function PortraitImage() {
  return (
    <div className="relative">
      {/* Ambient glow echoing the portrait's own gold/olive two-tone backdrop —
          ties the accent system back to its source image. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent-secondary/15 to-transparent blur-3xl"
      />
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={`${basePath}/portrait.webp`}
          alt="Javad Jafari"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover object-center"
          placeholder="empty"
        />
        {/* Subtle bottom gradient to blend into background */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
