import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] ?? 'https://javadjafari.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
