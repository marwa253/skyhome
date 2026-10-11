import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

export default function HeartButton({ id, className }: { id: number; className?: string }) {
  const { favorites, toggleFavorite } = useApp()
  const active = favorites.has(id)
  return (
    <motion.button type="button" aria-label={active ? 'Remove from favorites' : 'Save to favorites'} aria-pressed={active}
      whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.85 }} onClick={(e) => { e.stopPropagation(); toggleFavorite(id) }}
      className={cn('grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow dark:bg-stone-900/80', active ? 'text-rose-500' : 'text-stone-500 dark:text-stone-300', className)}>
      <motion.span animate={{ scale: active ? [1, 1.6, 1] : 1, rotate: active ? [0, -12, 0] : 0 }} transition={{ duration: 0.45 }}>
        <Heart size={18} fill={active ? 'currentColor' : 'none'} />
      </motion.span>
    </motion.button>
  )
}
