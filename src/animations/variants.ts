import type { Variants } from 'framer-motion'

export const easeOut = [0.22, 1, 0.36, 1] as const

export const stagger = (gap = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
}

export const modalPanel: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOut } },
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.25 } },
}
