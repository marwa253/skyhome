import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/data/site'
import { createArt } from '@/assets/placeholders'
import { cn } from '@/utils/cn'

export default function Testimonials() {
  const [[i, dir], setPage] = useState<[number, number]>([0, 1])
  const go = (step: number) => setPage(([cur]) => [(cur + step + TESTIMONIALS.length) % TESTIMONIALS.length, step])
  // auto-advance; restarts whenever the slide changes
  useEffect(() => { const t = window.setTimeout(() => go(1), 7000); return () => window.clearTimeout(t) }, [i])
  const t = TESTIMONIALS[i]
  const btn = 'grid h-11 w-11 place-items-center rounded-full border border-stone-300 transition-colors hover:bg-gold hover:text-white dark:border-stone-700'

  return (
    <section className="bg-stone-100 py-20 dark:bg-stone-900/50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading center eyebrow="Testimonials" title="Loved by Our Clients" className="mb-10" />
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={i} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4 }}>
              <Quote className="mx-auto mb-3 text-gold/50" size={32} />
              <div className="flex justify-center gap-1 text-gold">{Array.from({ length: 5 }, (_, k) => <Star key={k} size={18} fill={k < t.rating ? 'currentColor' : 'none'} />)}</div>
              <p className="mt-4 font-serif text-xl leading-relaxed sm:text-2xl">“{t.text}”</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={createArt(t.hue, i + 1)} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-left"><div className="font-medium">{t.name}</div><div className="text-xs opacity-60">{t.role}</div></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className={btn} onClick={() => go(-1)} aria-label="Previous review"><ChevronLeft size={20} /></button>
          <div className="flex gap-2">{TESTIMONIALS.map((_, k) => <span key={k} className={cn('h-2 rounded-full bg-gold transition-all', k === i ? 'w-6' : 'w-2 opacity-30')} />)}</div>
          <button className={btn} onClick={() => go(1)} aria-label="Next review"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
