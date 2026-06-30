import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { personal } from '@/content/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8">
      <Container>
        <Divider className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-fg sm:flex-row">
          <p>
            © {year} {personal.name}
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  )
}
