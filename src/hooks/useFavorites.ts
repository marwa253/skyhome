import { useCallback, useState } from 'react'

const KEY = 'skyhome-favorites'
const read = (): Set<number> => {
  try { return new Set<number>(JSON.parse(localStorage.getItem(KEY) ?? '[]')) } catch { return new Set<number>() }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(read)
  const toggle = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem(KEY, JSON.stringify([...next])) } catch { /* storage unavailable */ }
      return next
    })
  }, [])
  return { favorites, toggle }
}
