import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { AGENTS } from '@/data/site'
import { createArt } from '@/assets/placeholders'
import { useApp } from '@/context/AppContext'
import { fadeUp, stagger } from '@/animations/variants'

export default function Agents() {
  const { toast } = useApp()
  return (
    <section id="agents" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Team" title="Meet Our Agents" className="mb-10" />
      <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {AGENTS.map((a, i) => (
          <motion.div key={a.id} variants={fadeUp} whileHover={{ y: -6 }} className="group rounded-3xl border border-stone-200/70 bg-white p-5 text-center transition-shadow hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-gold/20 transition-all group-hover:ring-gold sm:h-28 sm:w-28">
              <img src={createArt(a.hue, i)} alt={a.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="mt-4 font-serif text-lg">{a.name}</h3>
            <p className="text-xs opacity-60">{a.role}</p>
            <p className="mt-1 text-xs text-gold">{a.listings} properties</p>
            <button onClick={() => toast(`Message sent to ${a.name}`)} className="mx-auto mt-4 flex h-10 items-center gap-2 rounded-full border border-stone-300 px-5 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-white dark:border-stone-700"><Mail size={15} /> Contact</button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
