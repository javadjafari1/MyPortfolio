import { cn } from '@/lib/utils'
import { Container } from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  as?: React.ElementType
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={cn('py-24 md:py-32', className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  )
}
