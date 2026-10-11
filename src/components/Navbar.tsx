import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/site'
import { useApp } from '@/context/AppContext'
import { useScrolled } from '@/hooks/useScrolled'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'
import { scrollToId } from '@/utils/helpers'

export default function Navbar() {
  const scrolled = useScrolled(40)
  const { dark, toggle } = useTheme()
  const { favorites, favoritesOnly, toggleFavoritesOnly, toast } = useApp()
  const [open, setOpen] = useState(false)
  const tone = scrolled ? 'text-stone-800 dark:text-stone-100' : 'text-white'
  const iconBtn = cn('relative grid h-10 w-10 place-items-center rounded-full transition-colors', scrolled ? 'hover:bg-stone-500/15' : 'hover:bg-white/15', tone)

  const onFavorites = () => {
    toggleFavoritesOnly()
    toast(favoritesOnly ? 'Showing all properties' : 'Showing your favorites')
    scrollToId('properties')
  }

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300', scrolled ? 'bg-white/85 shadow-md backdrop-blur-xl dark:bg-stone-950/85' : 'bg-transparent')}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <motion.div animate={{ height: scrolled ? 64 : 80 }} className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className={cn('font-serif text-2xl font-semibold', tone)}>Sky<span className="text-gold">Home</span></a>
        <nav className={cn('hidden gap-7 text-sm lg:flex', tone)} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group relative py-1">
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <button className={iconBtn} onClick={toggle} aria-label="Toggle dark mode">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={dark ? 'sun' : 'moon'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {dark ? <Sun size={19} /> : <Moon size={19} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className={cn(iconBtn, favoritesOnly && 'text-gold')} onClick={onFavorites} aria-label="Favorites">
            <Heart size={19} fill={favoritesOnly ? 'currentColor' : 'none'} />
            <AnimatePresence>
              {favorites.size > 0 && (
                <motion.span key={favorites.size} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold text-[10px] text-white">{favorites.size}</motion.span>
              )}
            </AnimatePresence>
          </button>
          <button onClick={() => toast('Sign in arrives in the next release')}
            className={cn('ml-1 hidden rounded-full px-4 py-2 text-sm transition-colors sm:block', scrolled ? 'bg-stone-900 text-white hover:bg-gold dark:bg-gold' : 'bg-white/15 text-white hover:bg-white/25')}>Sign in</button>
          <button className={cn(iconBtn, 'lg:hidden')} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}
            className="mx-4 mb-3 grid gap-1 rounded-2xl bg-white p-3 text-stone-800 shadow-xl dark:bg-stone-900 dark:text-stone-100 lg:hidden">
            {NAV_LINKS.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-xl px-3 py-2.5 hover:bg-stone-100 dark:hover:bg-stone-800">{l.label}</motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
