import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { properties } from '@/data/properties'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/utils/helpers'
import { cn } from '@/utils/cn'
import type { Property } from '@/types'

/**
 * Map-style placeholder. To use Google Maps or Mapbox later, replace the contents of
 * <MapCanvas /> with the real map and render one marker per property.
 */
function MapCanvas({ active, onPick }: { active: Property | null; onPick: (p: Property | null) => void }) {
  return (
    <div className="map-grid absolute inset-0 bg-emerald-50/60 dark:bg-stone-900" onClick={() => onPick(null)}>
      <div className="absolute -left-10 top-1/3 h-16 w-[120%] -rotate-6 bg-sky-200/60 dark:bg-sky-900/30" />
      {properties.map((p) => (
        <motion.button key={p.id} aria-label={p.name} onClick={(e) => { e.stopPropagation(); onPick(p) }}
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: p.id * 0.08, type: 'spring', stiffness: 260, damping: 14 }}
          whileHover={{ scale: 1.2 }} className={cn('absolute z-10 -translate-x-1/2 -translate-y-full drop-shadow-lg', active?.id === p.id ? 'text-rose-500' : 'text-gold')}
          style={{ left: `${p.mapX}%`, top: `${p.mapY}%` }}>
          <MapPin size={34} fill="currentColor" className="text-current" stroke="white" />
        </motion.button>
      ))}
    </div>
  )
}

export default function MapSection() {
  const [active, setActive] = useState<Property | null>(null)
  const { openProperty } = useApp()
  return (
    <div className="relative mt-12 h-[420px] overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800">
      <MapCanvas active={active} onPick={setActive} />
      <AnimatePresence>
        {active && (
          <motion.div key={active.id} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }}
            className="absolute inset-x-3 bottom-3 z-20 overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-stone-800 sm:left-auto sm:w-72">
            <img src={active.images[0]} alt="" className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="font-serif text-lg">{active.name}</div>
              <div className="text-xs opacity-60">{active.location}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-gold">{formatPrice(active.price)}</span>
                <button onClick={() => openProperty(active)} className="h-9 rounded-full bg-stone-900 px-4 text-sm text-white dark:bg-gold">Details</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
