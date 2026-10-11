import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { STATS } from '@/data/site'
import { fadeUp, stagger } from '@/animations/variants'

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="bg-stone-900 py-16 text-white">
      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <div className="font-serif text-4xl text-gold sm:text-5xl"><CountUp to={s.value} suffix={s.suffix} /></div>
            <div className="mt-1 text-sm opacity-70">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
