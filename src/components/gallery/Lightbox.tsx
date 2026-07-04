'use client'

import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { basePath } from '@/lib/basePath'
import type { GalleryImage } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const
const SWIPE_THRESHOLD = 50

interface LightboxProps {
  images: GalleryImage[]
  index: number
  title: string
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function Lightbox({ images, index, title, onClose, onIndexChange }: LightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const image = images[index]

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % images.length)
  }, [index, images.length, onIndexChange])

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length)
  }, [index, images.length, onIndexChange])

  useEffect(() => {
    dialogRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && images.length > 1) goNext()
      if (e.key === 'ArrowLeft' && images.length > 1) goPrev()
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, goNext, goPrev, images.length])

  if (!image) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} screenshot ${index + 1} of ${images.length}`}
        tabIndex={-1}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease }}
        onClick={onClose}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
          if (Math.abs(delta) > SWIPE_THRESHOLD && images.length > 1) {
            if (delta < 0) goNext()
            else goPrev()
          }
          touchStartX.current = null
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-border/60 bg-surface/80 p-2 text-muted-fg transition-colors hover:text-foreground sm:right-6 sm:top-6"
        >
          <CloseIcon />
        </button>

        {images.length > 1 && (
          <>
            <NavButton direction="prev" onClick={goPrev} />
            <NavButton direction="next" onClick={goNext} />
          </>
        )}

        <motion.div
          key={image.full}
          className="relative mx-auto max-h-[85vh] max-w-[90vw]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={`${basePath}${image.full}`}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="90vw"
            className="max-h-[85vh] w-auto rounded-lg object-contain"
            priority
          />
        </motion.div>

        {images.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-wide text-muted-fg/80">
            {index + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-surface/80 p-2 text-muted-fg transition-colors hover:text-foreground ${
        direction === 'prev' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
