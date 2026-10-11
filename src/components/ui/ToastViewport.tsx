import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function ToastViewport() {
  const { toasts } = useApp()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 z-[70] flex flex-col items-center gap-2 px-4" style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} layout initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm text-white shadow-xl">
            <CheckCircle2 size={16} className="text-gold" /> {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
