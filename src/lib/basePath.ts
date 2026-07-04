// Must match `basePath` in next.config.ts. next/image doesn't auto-prefix
// basePath when images.unoptimized is true, so static image src values need this.
export const basePath = process.env.NODE_ENV === 'production' ? '/MyPortfolio' : ''
