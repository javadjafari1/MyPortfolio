import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] ?? 'https://javadjafari.dev'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
