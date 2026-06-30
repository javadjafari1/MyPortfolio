export type Theme = 'light' | 'dark' | 'system'

export interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  challenge?: string
  tags: string[]
  links: {
    github?: string
    playStore?: string
    appStore?: string
    demo?: string
  }
  featured: boolean
  year: number
  context: 'professional' | 'personal'
  scale?: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
  technologies: string[]
  logo?: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  location?: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}
