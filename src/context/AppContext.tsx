import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Property, ToastMessage } from '@/types'
import { useFavorites } from '@/hooks/useFavorites'

interface AppState {
  favorites: Set<number>
  toggleFavorite: (id: number) => void
  favoritesOnly: boolean
  toggleFavoritesOnly: () => void
  toasts: ToastMessage[]
  toast: (message: string) => void
  selected: Property | null
  openProperty: (p: Property) => void
  closeProperty: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const { favorites, toggle } = useFavorites()
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [selected, setSelected] = useState<Property | null>(null)

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const toggleFavorite = useCallback((id: number) => {
    toast(favorites.has(id) ? 'Removed from favorites' : 'Saved to favorites')
    toggle(id)
  }, [favorites, toggle, toast])

  const value = useMemo<AppState>(() => ({
    favorites, toggleFavorite, favoritesOnly, toasts, toast, selected,
    toggleFavoritesOnly: () => setFavoritesOnly((v) => !v),
    openProperty: setSelected,
    closeProperty: () => setSelected(null),
  }), [favorites, toggleFavorite, favoritesOnly, toasts, toast, selected])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
