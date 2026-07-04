import type { Experience, GalleryImage, Project, Skill, SocialLink } from '@/types'

function gallery(slug: string, count: number, alt: string): GalleryImage[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      thumb: `/projects/${slug}/${n}-thumb.webp`,
      full: `/projects/${slug}/${n}-full.webp`,
      width: 760,
      height: 1705,
      alt: `${alt} — screenshot ${i + 1}`,
    }
  })
}

// ─── Identity ────────────────────────────────────────────────────────────────

export const personal = {
  name: 'Javad Jafari',
  role: 'Senior Android Engineer',

  headline: 'Engineering Android apps that scale.',

  tagline:
    'Senior Android Engineer focused on architecture, team velocity, and production quality.',

  bio: `Eight years building Android products in Kotlin and Jetpack Compose — from greenfield apps to a platform serving 8 million users. I care about the structural decisions that let teams move fast without breaking things: clean architecture, scalable modularization, and systems that reduce friction at every layer.`,

  location: 'Mashhad, Iran',
  email: 'javadjafari.work@gmail.com',
  availability: 'Open to remote roles',
  githubUsername: 'javadjafari1',
} as const

// ─── Social / Contact ─────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/javadjafari1/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/javadjafari1', icon: 'github' },
  { label: 'Medium', href: 'https://medium.com/@javadjafari1', icon: 'medium' },
  { label: 'Email', href: 'mailto:javadjafari.work@gmail.com', icon: 'mail' },
]

// ─── Contact Section Copy ────────────────────────────────────────────────────

export const contact = {
  headline: "Let's build something worth scaling.",
  body: `Whether you're hiring, building a product, or want to talk Android architecture — my inbox is open. I'm especially interested in remote roles where engineering quality and team culture are taken seriously.`,
}

// ─── Featured Projects ────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'icup',
    title: 'iCup',
    description:
      'A regulated Iranian fintech super-app serving 8 million users — payments, digital wallets, electronic promissories, and more. Distributed primarily through Iranian local markets.',
    longDescription:
      "iCup is a production-scale Iranian fintech platform where I spent six years growing from contributor to the central Android engineer. I led the architectural initiatives that made the codebase sustainable at scale: a 12→65 module vertical-slice modularization, a state architecture overhaul that raised test coverage from under 5% to over 50%, a centralized Material 3 design system with 35 components, and a CI/CD transformation that collapsed a 2-hour manual release process into a 20-minute automated pipeline. The product also delivered Iran's first electronic promissory and digital signature system under a strict nationwide regulatory deadline.",
    challenge:
      'Scaling an Android codebase to support 8 million users and a 12-person team simultaneously — while migrating architecture, tooling, and process incrementally without pausing feature delivery.',
    tags: [
      'Kotlin',
      'Jetpack Compose',
      'MVI',
      'Clean Architecture',
      'Hilt',
      'Room',
      'Gradle / build-logic',
      'Material Design 3',
      'Fintech',
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=ir.partsoftware.cup',
    },
    featured: true,
    year: 2018,
    context: 'professional',
    scale: '8 million users',
  },
  {
    slug: 'linkaroo',
    title: 'Linkaroo',
    description:
      'A link management app built on a Kotlin Multiplatform foundation — organized, searchable, and synced across devices.',
    longDescription:
      'Built out of a personal need for better URL organization. Linkaroo is architected around a shared KMP core with Room and DataStore for local persistence, and Koin for dependency injection — so the same business logic runs on both Android and iOS. Published to Google Play.',
    challenge:
      'Designing a KMP architecture where the Android and iOS targets share the entire data and domain layer without leaking platform-specific dependencies.',
    tags: ['Kotlin Multiplatform', 'Jetpack Compose', 'Room KMP', 'DataStore', 'Koin'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.linkaroo.app.android',
    },
    featured: true,
    year: 2023,
    context: 'personal',
    scale: 'Live on Google Play',
    gallery: gallery('linkaroo', 4, 'Linkaroo'),
  },
  {
    slug: 'pofox',
    title: 'POFox',
    description:
      'A budgeting app that reframes spending — not in absolute numbers, but relative to what you actually earn.',
    longDescription:
      'POFox answers a simple question most budgeting apps ignore: "How many hours of work did this cost me?" Built with Compose Multiplatform targeting Android and iOS from a single shared codebase. Currently in beta.',
    challenge:
      'Building a genuinely useful financial insight model — and simultaneously validating a Compose Multiplatform iOS target in a real-world production context.',
    tags: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Android', 'iOS'],
    links: {},
    featured: true,
    year: 2024,
    context: 'personal',
    scale: 'Beta',
    gallery: gallery('pofox', 4, 'POFox'),
  },
  {
    slug: 'qrbuddy',
    title: 'QRBuddy',
    description:
      'A clean, no-friction QR code generator and scanner — built as a Compose Multiplatform experiment targeting Android and iOS.',
    longDescription:
      'QRBuddy started as a focused exploration of camera APIs and QR generation in a multiplatform context. The goal was a genuinely fast, no-permission-bloat experience. In active development.',
    challenge:
      'Handling camera access and QR scanning across both Android and iOS through shared Kotlin Multiplatform code with minimal native bridging.',
    tags: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Camera', 'Android', 'iOS'],
    links: {},
    featured: true,
    year: 2024,
    context: 'personal',
    scale: 'In development',
  },
  {
    slug: 'backgroundable',
    title: 'Backgroundable',
    description:
      'A wallpaper browser and setter powered by the Pexels API — built as a showcase for modern Android architecture patterns.',
    longDescription:
      'A technical showcase application using Pexels API for high-resolution wallpapers with offline caching, pagination, and a Compose UI. Used as an architecture reference for clean separation of layers in a real-world Compose + Room setup.',
    challenge:
      "Building an offline-first experience with seamless pagination and zero flickering across configuration changes — without reaching for complexity the problem didn't warrant.",
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'Paging 3', 'Material 3', 'Dagger'],
    links: {
      github: 'https://github.com/javadjafari1/Backgroundable',
    },
    featured: false,
    year: 2022,
    context: 'personal',
    scale: 'Open Source',
    gallery: gallery('backgroundable', 3, 'Backgroundable'),
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    company: 'Part Software Group',
    role: 'Senior Android Engineer',
    period: '2018 — Present',
    location: 'Mashhad, Iran',
    description:
      'For six years I was the central Android engineer on iCup — a regulated fintech super-app now used by more than 8 million people. My work went beyond shipping features: I built the architectural foundations that let a 12-person team move reliably at scale. That meant rethinking modularization, replacing fragile state patterns, automating releases, and establishing a shared design system — all without pausing delivery.',
    highlights: [
      'Migrated a monolithic module structure to 65 vertically-sliced feature modules over 5 months — reducing clean build times by 20% and eliminating the 10-minute mega-module rebuild bottleneck, without pausing delivery.',
      'Redesigned the core state architecture to eliminate race conditions. Refactored 39+ ViewModels and raised unit test coverage from under 5% to over 50%.',
      'Replaced a 2-hour manual release and verification process with a 20-minute automated CI/CD pipeline — Detekt, parallel test execution, and continuous delivery.',
      'Built a centralized Material 3 design system with 35 components, enforcing UI and accessibility consistency across the entire codebase.',
    ],
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'MVI',
      'Clean Architecture',
      'Hilt',
      'Room',
      'Gradle / build-logic',
      'GitHub Actions',
    ],
  },
  {
    company: 'Part College',
    role: 'Android Instructor',
    period: '2021 — 2024',
    location: 'Mashhad, Iran',
    description:
      'Taught and mentored 60+ developers across three years of cohorts — covering Jetpack Compose, architecture, and production-grade Android patterns. Twelve students were hired directly into engineering roles.',
    highlights: [],
    technologies: ['Jetpack Compose', 'MVVM', 'Room', 'Kotlin'],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    category: 'Android',
    items: ['Kotlin', 'Jetpack Compose', 'Coroutines & Flow', 'Material Design 3', 'Android SDK'],
  },
  {
    category: 'Architecture',
    items: ['MVI / UDF', 'Clean Architecture', 'Modularization', 'Hilt', 'Koin'],
  },
  {
    category: 'Multiplatform',
    items: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Room KMP', 'DataStore KMP'],
  },
  {
    category: 'Build & Quality',
    items: ['Gradle', 'build-logic', 'GitHub Actions', 'Detekt', 'CI/CD'],
  },
  {
    category: 'Testing',
    items: ['JUnit', 'Mockk', 'Turbine', 'Compose UI Testing'],
  },
]

// Education intentionally omitted.
