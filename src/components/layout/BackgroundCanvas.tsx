'use client'

import { useEffect, useRef } from 'react'

const NODE_COUNT = 70
const LINK_DIST = 120 // max distance between nodes for an edge
const CURSOR_DIST = 150 // max distance from cursor to draw an edge
const NODE_SPEED = 0.28 // autonomous drift speed
const FALLBACK_ACCENT = { r: 205, g: 182, b: 81 } // dark-theme --accent, used until CSS resolves

function readAccentRgb() {
  const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  const match = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!match) return FALLBACK_ACCENT
  const [, r, g, b] = match
  return { r: parseInt(r!, 16), g: parseInt(g!, 16), b: parseInt(b!, 16) }
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

function makeNode(W: number, H: number): Node {
  const angle = Math.random() * Math.PI * 2
  const speed = (Math.random() * 0.5 + 0.5) * NODE_SPEED
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: Math.random() * 1.2 + 0.5,
  }
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Capture non-null references for use inside nested functions.
    // Safety is guaranteed by the guards above — these never escape the effect.
    const c = canvas
    const x = ctx

    let accent = readAccentRgb()
    function rgba(alpha: number) {
      return `rgba(${accent.r},${accent.g},${accent.b},${alpha})`
    }

    // Theme toggle swaps a class on <html>, which changes --accent — re-read
    // it so the particle color follows the active theme.
    const themeObserver = new MutationObserver(() => {
      accent = readAccentRgb()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    let W = 0,
      H = 0
    let rafId: number
    let nodes: Node[] = []
    let mx = -1000,
      my = -1000 // off-screen until first move

    function resize() {
      const dpr = window.devicePixelRatio ?? 1
      W = window.innerWidth
      H = window.innerHeight
      c.width = Math.round(W * dpr)
      c.height = Math.round(H * dpr)
      c.style.width = W + 'px'
      c.style.height = H + 'px'
      x.scale(dpr, dpr)
      nodes = Array.from({ length: NODE_COUNT }, () => makeNode(W, H))
    }

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
    }

    function onMouseLeave() {
      mx = -1000
      my = -1000
    }

    function draw() {
      x.clearRect(0, 0, W, H)

      // Update node positions
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        // Bounce off edges
        if (n.x < 0) {
          n.x = 0
          n.vx *= -1
        }
        if (n.x > W) {
          n.x = W
          n.vx *= -1
        }
        if (n.y < 0) {
          n.y = 0
          n.vy *= -1
        }
        if (n.y > H) {
          n.y = H
          n.vy *= -1
        }
      }

      // Node-to-node edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!a) continue
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          if (!b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.15
            x.strokeStyle = rgba(alpha)
            x.lineWidth = 0.6
            x.beginPath()
            x.moveTo(a.x, a.y)
            x.lineTo(b.x, b.y)
            x.stroke()
          }
        }

        // Node-to-cursor edges
        const cdx = a.x - mx
        const cdy = a.y - my
        const cd = Math.sqrt(cdx * cdx + cdy * cdy)
        if (cd < CURSOR_DIST) {
          const alpha = (1 - cd / CURSOR_DIST) * 0.55
          x.strokeStyle = rgba(alpha)
          x.lineWidth = 0.9
          x.beginPath()
          x.moveTo(a.x, a.y)
          x.lineTo(mx, my)
          x.stroke()
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const cdx = n.x - mx
        const cdy = n.y - my
        const cd = Math.sqrt(cdx * cdx + cdy * cdy)
        const proximity = cd < CURSOR_DIST ? 1 - cd / CURSOR_DIST : 0
        const alpha = 0.2 + proximity * 0.6
        const radius = n.radius + proximity * 1.5

        x.fillStyle = rgba(alpha)
        x.beginPath()
        x.arc(n.x, n.y, radius, 0, Math.PI * 2)
        x.fill()
      }

      // Cursor indicator — small ring + dot
      if (mx > 0) {
        x.strokeStyle = rgba(0.4)
        x.lineWidth = 0.8
        x.beginPath()
        x.arc(mx, my, 14, 0, Math.PI * 2)
        x.stroke()

        x.fillStyle = rgba(0.7)
        x.beginPath()
        x.arc(mx, my, 2.5, 0, Math.PI * 2)
        x.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
  )
}
