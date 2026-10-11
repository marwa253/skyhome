import Reveal from './Reveal'
import { cn } from '@/utils/cn'

interface Props { eyebrow: string; title: string; center?: boolean; className?: string }

export default function SectionHeading({ eyebrow, title, center, className }: Props) {
  return (
    <Reveal className={cn(center && 'text-center', className)}>
      <p className="text-xs uppercase tracking-[.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
    </Reveal>
  )
}
