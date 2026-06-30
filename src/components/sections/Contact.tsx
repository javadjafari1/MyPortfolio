'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { AnimateIn } from '@/components/motion/AnimateIn'
import { GitHubIcon, LinkedInIcon, MediumIcon, MailIcon } from '@/components/icons'
import { contact, socialLinks } from '@/content/data'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon size={18} />,
  github: <GitHubIcon size={18} />,
  medium: <MediumIcon size={18} />,
  mail: <MailIcon size={18} />,
}

export function Contact() {
  return (
    <Section id="contact" className="pb-32 pt-24 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <AnimateIn>
          <span className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-5 bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Contact
            </span>
            <span className="h-px w-5 bg-accent" aria-hidden="true" />
          </span>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <h2 className="mb-5 text-4xl font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-5xl">
            {contact.headline}
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.16}>
          <p className="mb-12 text-base leading-relaxed text-muted-fg">{contact.body}</p>
        </AnimateIn>

        {/* Social buttons */}
        <AnimateIn delay={0.22}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.icon !== 'mail' ? '_blank' : undefined}
                rel={link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-3',
                  'text-sm text-muted-fg',
                  'transition-colors duration-150 hover:border-white/15 hover:text-foreground'
                )}
              >
                {iconMap[link.icon]}
                {link.label}
              </motion.a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </Section>
  )
}
