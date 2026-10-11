import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bath, BedDouble, CalendarDays, Check, MapPin, MessageCircle, Ruler, X } from 'lucide-react'
import Gallery from './Gallery'
import HeartButton from '@/components/ui/HeartButton'
import { useApp } from '@/context/AppContext'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { modalPanel, stagger, fadeUp } from '@/animations/variants'
import { AGENTS } from '@/data/site'
import { createArt } from '@/assets/placeholders'
import { formatPrice } from '@/utils/helpers'

export default function PropertyModal() {
  const { selected: p, closeProperty, toast } = useApp()
  const [lightbox, setLightbox] = useState(false)
  useLockBodyScroll(!!p)

  useEffect(() => { setLightbox(false) }, [p])
  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') (lightbox ? setLightbox(false) : closeProperty()) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p, lightbox, closeProperty])

  const agent = p ? AGENTS.find((a) => a.id === p.agentId) ?? AGENTS[0] : null

  return (
    <AnimatePresence>
      {p && agent && (
        <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeProperty}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label={p.name}>
          <motion.div variants={modalPanel} initial="hidden" animate="show" exit="exit" onClick={(e) => e.stopPropagation()}
            className="relative mx-auto min-h-full max-w-5xl overflow-hidden bg-white dark:bg-stone-900 sm:min-h-0 sm:rounded-3xl">
            <button onClick={closeProperty} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"><X size={18} /></button>
            <Gallery images={p.images} title={p.name} lightbox={lightbox} setLightbox={setLightbox} />
            <motion.div variants={stagger(0.08, 0.15)} initial="hidden" animate="show" className="grid gap-8 p-5 sm:p-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <motion.span variants={fadeUp} className="rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">{p.type}</motion.span>
                <motion.h3 variants={fadeUp} className="mt-3 font-serif text-3xl sm:text-4xl">{p.name}</motion.h3>
                <motion.p variants={fadeUp} className="mt-1 flex items-center gap-1 opacity-60"><MapPin size={16} /> {p.location}, Egypt</motion.p>
                <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[{ icon: BedDouble, label: 'Bedrooms', v: p.beds }, { icon: Bath, label: 'Bathrooms', v: p.baths }, { icon: Ruler, label: 'Area', v: `${p.area} m²` }].map(({ icon: Icon, label, v }) => (
                    <div key={label} className="rounded-2xl bg-stone-100 py-4 dark:bg-stone-800">
                      <Icon size={20} className="mx-auto mb-1 text-gold" /><div className="text-lg font-semibold">{v}</div><div className="text-xs opacity-60">{label}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.p variants={fadeUp} className="mt-6 leading-relaxed opacity-80">{p.description}</motion.p>
                <motion.h4 variants={fadeUp} className="mb-3 mt-6 font-medium">Amenities</motion.h4>
                <motion.div variants={stagger(0.05)} className="flex flex-wrap gap-2">
                  {p.amenities.map((a) => (
                    <motion.span key={a} variants={fadeUp} className="flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-700"><Check size={14} className="text-gold" /> {a}</motion.span>
                  ))}
                </motion.div>
              </div>
              <motion.aside variants={fadeUp} className="self-start rounded-3xl border border-stone-200 p-5 dark:border-stone-800">
                <div className="font-serif text-3xl text-gold">{formatPrice(p.price)}</div>
                <div className="mt-5 flex items-center gap-3">
                  <img src={createArt(agent.hue, 1)} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div><div className="font-medium">{agent.name}</div><div className="text-xs opacity-60">{agent.role}</div></div>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast(`Message sent to ${agent.name}`)} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold font-medium text-white hover:opacity-90"><MessageCircle size={17} /> Contact Agent</motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast('Viewing request sent')} className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"><CalendarDays size={17} /> Schedule Viewing</motion.button>
                <div className="mt-3 flex justify-center"><HeartButton id={p.id} className="border border-stone-200 dark:border-stone-700" /></div>
              </motion.aside>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
