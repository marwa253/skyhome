import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { LOCATIONS } from '@/data/site'
import { createArt } from '@/assets/placeholders'
import { fadeUp, stagger } from '@/animations/variants'

export default function Locations({ onSelect }: { onSelect: (name: string) => void }) {
  return (
    <div>
      <SectionHeading eyebrow="Explore" title="Popular Locations" className="mb-10" />
      <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {LOCATIONS.map((l, i) => (
          <motion.button key={l.name} variants={fadeUp} whileHover={{ y: -6 }} onClick={() => onSelect(l.name)} className="group relative aspect-[3/4] overflow-hidden rounded-3xl text-left text-white">
            <img src={createArt(l.hue, i)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <div className="font-serif text-xl">{l.name}</div>
              <div className="text-xs opacity-80">{l.count} properties</div>
              <div className="mt-2 flex items-center gap-1 text-xs text-gold-soft">Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
