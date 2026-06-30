// Analytics abstraction — swap the implementation without touching call sites.
// Drop in Plausible, Fathom, or Vercel Analytics by replacing the body of `track`.

type EventProperties = Record<string, string | number | boolean>

export function track(event: string, properties?: EventProperties): void {
  if (typeof window === 'undefined') return
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', event, properties)
    return
  }
  // Replace with your analytics provider:
  // window.plausible?.(event, { props: properties })
  // window.va?.('event', { name: event, ...properties })
}
