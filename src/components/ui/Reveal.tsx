import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut } from '@/animations/variants'

interface Props { children: ReactNode; delay?: number; y?: number; className?: string }

/** Fades and lifts its children into view the first time they scroll on screen. */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: easeOut }}>
      {children}
    </motion.div>
  )
}
