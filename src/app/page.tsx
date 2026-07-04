import { Hero } from '@/components/sections/Hero'
import { TrustMetrics } from '@/components/sections/TrustMetrics'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Writing } from '@/components/sections/Writing'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <Projects />
      <Experience />
      <Writing />
      <Contact />
    </>
  )
}
