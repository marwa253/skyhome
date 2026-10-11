import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES } from '@/data/site'
import { fadeUp, stagger } from '@/animations/variants'

export default function Services() {
  return (
    <section id="services" className="bg-stone-100 py-20 dark:bg-stone-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Services" title="Everything Real Estate" className="mb-10" />
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, text, icon: Icon }) => (
            <motion.div key={title} variants={fadeUp} whileHover={{ y: -6 }} className="group rounded-3xl border border-stone-200/70 bg-white p-7 transition-shadow hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold transition-all duration-300 group-hover:rotate-6 group-hover:bg-gold group-hover:text-white"><Icon size={26} /></div>
              <h3 className="mt-5 font-serif text-xl">{title}</h3>
              <p className="mt-1 text-sm opacity-60">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
