'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { basePath } from '@/lib/basePath'
import { Lightbox } from './Lightbox'
import type { GalleryImage } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

interface ProjectGalleryProps {
  title: string
  images: GalleryImage[]
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const featured = images[0]
  const rest = images.slice(1)

  if (!featured) return null

  return (
    <div className="mb-4">
      <motion.button
        type="button"
        onClick={() => setOpenIndex(0)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2, ease }}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60 bg-muted"
        aria-label={`View ${title} screenshots`}
      >
        <Image
          src={`${basePath}${featured.thumb}`}
          alt={featured.alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </motion.button>

      {rest.length > 0 && (
        <div className="mt-2 flex gap-2">
          {rest.map((img, i) => (
            <button
              key={img.thumb}
              type="button"
              onClick={() => setOpenIndex(i + 1)}
              className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted transition-opacity hover:opacity-80"
              aria-label={`View ${title} screenshot ${i + 2}`}
            >
              <Image
                src={`${basePath}${img.thumb}`}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="56px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          title={title}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </div>
  )
}
