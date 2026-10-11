import { motion } from 'framer-motion'
import { ArrowRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import HeartButton from '@/components/ui/HeartButton'
import { useApp } from '@/context/AppContext'
import { easeOut } from '@/animations/variants'
import { formatPrice } from '@/utils/helpers'
import type { Property } from '@/types'

export default function PropertyCard({ property: p, index }: { property: Property; index: number }) {
  const { openProperty } = useApp()
  return (
    <motion.article layout initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.09, ease: easeOut }} whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }}
      className="group overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl dark:border-stone-800 dark:bg-stone-900">
      <div className="relative aspect-[4/3] cursor-pointer overflow-hidden" onClick={() => openProperty(p)}>
        <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs text-stone-800 dark:bg-stone-900/80 dark:text-stone-100">{p.type}</span>
        <HeartButton id={p.id} className="absolute right-3 top-3" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug">{p.name}</h3>
          <span className="whitespace-nowrap font-semibold text-gold">{formatPrice(p.price)}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm opacity-60"><MapPin size={14} /> {p.location}, Egypt</p>
        <div className="mt-4 flex gap-4 border-t border-stone-200 pt-4 text-sm dark:border-stone-800">
          <span className="flex items-center gap-1.5"><BedDouble size={16} className="text-gold" /> {p.beds}</span>
          <span className="flex items-center gap-1.5"><Bath size={16} className="text-gold" /> {p.baths}</span>
          <span className="flex items-center gap-1.5"><Ruler size={16} className="text-gold" /> {p.area} m²</span>
        </div>
        <button onClick={() => openProperty(p)} className="group/btn mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-900 text-white transition-colors hover:bg-gold dark:bg-stone-800 dark:hover:bg-gold">
          View Details <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  )
}
