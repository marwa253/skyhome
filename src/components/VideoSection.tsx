import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { VIDEO_POSTER, VIDEO_SRC } from '@/data/site'
import { useApp } from '@/context/AppContext'

export default function VideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { toast } = useApp()
  const [playing, setPlaying] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  const onPlay = () => {
    if (!VIDEO_SRC) return toast('Placeholder video. Set VIDEO_SRC in src/data/site.ts')
    setPlaying(true)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <Reveal>
        <div ref={ref} className="group relative grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl bg-stone-800 text-center sm:aspect-video">
          {playing ? (
            <video src={VIDEO_SRC} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <motion.div style={{ y, backgroundImage: `url("${VIDEO_POSTER}")` }} className="absolute -inset-y-[10%] inset-x-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative px-6 text-white">
                <button onClick={onPlay} aria-label="Play video" className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold transition-transform hover:scale-110 sm:h-24 sm:w-24">
                  <span className="absolute inset-0 animate-ring rounded-full border-2 border-white" />
                  <Play size={30} fill="currentColor" className="ml-1" />
                </button>
                <h3 className="mt-6 font-serif text-3xl sm:text-5xl">Discover Your Next Home</h3>
                <p className="mt-2 text-white/80">Take a two-minute tour of life with SkyHome.</p>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}
