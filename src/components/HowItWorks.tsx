import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import SectionHeading from '@/components/ui/SectionHeading'
import { STEPS } from '@/data/site'

/** GSAP timeline: the connecting line draws itself, then each step rises into place. */
export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
      tl.from('.step', { opacity: 0, y: 40, duration: 0.7, stagger: 0.3, ease: 'power3.out' })
        .from('.step-icon', { scale: 0.4, duration: 0.5, stagger: 0.3, ease: 'back.out(2)' }, 0.1)
        .fromTo('.step-line', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.1)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading center eyebrow="Process" title="How It Works" className="mb-14" />
      <div ref={root} className="relative grid gap-10 md:grid-cols-4">
        <div className="step-line absolute left-[12.5%] right-[12.5%] top-8 hidden origin-left border-t-2 border-dashed border-gold/60 md:block" />
        {STEPS.map(({ title, text, icon: Icon }, i) => (
          <div key={title} className="step relative text-center">
            <div className="step-icon relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-white shadow-lg ring-8 ring-stone-50 dark:ring-stone-950"><Icon size={26} /></div>
            <div className="mt-4 text-xs tracking-widest text-gold">0{i + 1}</div>
            <h3 className="mt-1 font-serif text-xl">{title}</h3>
            <p className="mx-auto mt-1 max-w-[16rem] text-sm opacity-60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
