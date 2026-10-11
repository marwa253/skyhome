import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import { easeOut, fadeUp, stagger } from '@/animations/variants'
import { HERO_IMAGE, HERO_VIDEO_SRC } from '@/data/site'
import SearchPanel from './SearchPanel'
import type { Filters } from '@/types'

const HEADLINE = 'Find a Place You’ll Love to Call Home'.split(' ')

interface Props { filters: Filters; onSearch: (f: Filters) => void }

export default function Hero({ filters, onSearch }: Props) {
  const section = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)

  // GSAP: scroll-scrubbed parallax on the background
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bg.current, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={section} className="relative flex min-h-[100svh] items-center overflow-hidden bg-stone-900">
      <div ref={bg} className="absolute -inset-y-[8%] inset-x-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMAGE}")` }}>
        {HERO_VIDEO_SRC && <video className="h-full w-full object-cover" src={HERO_VIDEO_SRC} autoPlay muted loop playsInline />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      <motion.div aria-hidden className="absolute right-[8%] top-1/4 h-24 w-24 rounded-full border border-white/25" animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute bottom-1/3 left-[6%] h-14 w-14 rounded-2xl bg-gold/20" animate={{ y: [0, 16, 0], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute right-[22%] top-[62%] h-3 w-3 rounded-full bg-gold/70" animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.2, 0.7] }} transition={{ duration: 4, repeat: Infinity }} />

      <motion.div variants={stagger(0.12, 0.2)} initial="hidden" animate="show" className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6">
        <motion.p variants={fadeUp} className="mb-4 text-xs uppercase tracking-[.25em] text-gold">Premium real estate</motion.p>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
          {HEADLINE.map((w, i) => (
            <span key={i} className="mr-[.25em] inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: easeOut }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
          Curated homes, trusted agents and a seamless journey from first search to the keys in your hand.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <motion.a href="#properties" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="group flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-white hover:shadow-lg hover:shadow-gold/30">
            Explore Properties <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a href="#contact" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="rounded-full border border-white/40 px-7 py-3.5 text-white transition-colors hover:bg-white hover:text-stone-900">List Your Property</motion.a>
        </motion.div>
        <SearchPanel filters={filters} onSearch={onSearch} />
      </motion.div>
    </section>
  )
}
