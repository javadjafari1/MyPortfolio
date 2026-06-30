import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackgroundCanvas } from '@/components/layout/BackgroundCanvas'
import { personal } from '@/content/data'
import './globals.css'

const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] ?? 'https://javadjafari.dev'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.tagline,
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: personal.name,
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0c' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/*
          Runs before React hydrates to prevent flash of wrong theme.
          Dark is the default — we only need to add .light if the user
          explicitly chose light mode. No system preference fallback.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const s=localStorage.getItem('theme');if(s==='light'){document.documentElement.classList.add('light')}}catch{}`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased">
        <BackgroundCanvas />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
