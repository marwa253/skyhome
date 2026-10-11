import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Props { images: string[]; title: string; lightbox: boolean; setLightbox: (v: boolean) => void }

const slide = {
  enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
}

export default function Gallery({ images, title, lightbox, setLightbox }: Props) {
  const [[index, dir], setPage] = useState<[number, number]>([0, 0])
  const go = useCallback((step: number) => setPage(([i]) => [(i + step + images.length) % images.length, step]), [images.length])
  const jump = (i: number) => setPage(([cur]) => [i, i > cur ? 1 : -1])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const arrow = 'absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-stone-900 shadow transition-transform hover:scale-110'

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-800 sm:aspect-[16/9]">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img key={index} src={images[index]} alt={`${title} — photo ${index + 1}`} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.45, ease: 'easeOut' }} className="absolute inset-0 h-full w-full object-cover" />
        </AnimatePresence>
        <button className={cn(arrow, 'left-3')} onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>
        <button className={cn(arrow, 'right-3')} onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>
        <button onClick={() => setLightbox(true)} className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur"><Maximize2 size={13} /> Fullscreen</button>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white">{index + 1} / {images.length}</span>
      </div>
      <div className="flex gap-2 overflow-x-auto p-3">
        {images.map((src, i) => (
          <button key={i} onClick={() => jump(i)} aria-label={`Show photo ${i + 1}`}
            className={cn('aspect-[4/3] h-16 shrink-0 overflow-hidden rounded-xl ring-2 transition-all hover:opacity-100 sm:h-20', i === index ? 'opacity-100 ring-gold' : 'opacity-55 ring-transparent')}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/95 p-4" onClick={() => setLightbox(false)}>
              <AnimatePresence initial={false} custom={dir} mode="wait">
                <motion.img key={index} src={images[index]} alt={title} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                  className="max-h-[85vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
              </AnimatePresence>
              <button className={cn(arrow, 'left-4')} onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo"><ChevronLeft /></button>
              <button className={cn(arrow, 'right-4')} onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo"><ChevronRight /></button>
              <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" aria-label="Close fullscreen" onClick={() => setLightbox(false)}><X /></button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
