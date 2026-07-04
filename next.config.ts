import type { NextConfig } from 'next'

// GitHub Pages serves this repo at /MyPortfolio/ (a project page), not the domain root.
// Only apply the prefix in production builds so `next dev` still runs at localhost:3000/.
const isProd = process.env.NODE_ENV === 'production'
const repoBasePath = '/MyPortfolio'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? repoBasePath : '',
  assetPrefix: isProd ? `${repoBasePath}/` : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
