import { useCallback, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = useCallback(() => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')
    root.classList.add('theme-fade') // enables the smooth colour transition
    root.classList.toggle('dark', next)
    window.setTimeout(() => root.classList.remove('theme-fade'), 500)
    try { localStorage.setItem('skyhome-theme', next ? 'dark' : 'light') } catch { /* storage unavailable */ }
    setDark(next)
  }, [])
  return { dark, toggle }
}
