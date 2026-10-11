import type { Filters, Property, SortKey } from '@/types'
import { PRICE_RANGES } from '@/data/site'

export const formatPrice = (n: number) => '$' + n.toLocaleString('en-US')
export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function filterProperties(list: Property[], f: Filters, sort: SortKey, favorites: Set<number>, favoritesOnly: boolean): Property[] {
  const range = PRICE_RANGES.find((r) => r.value === f.price)
  const result = list.filter(
    (p) =>
      (!f.location || p.location === f.location) &&
      (!f.type || p.type === f.type) &&
      p.beds >= f.beds &&
      (!range || (p.price >= range.min && p.price <= range.max)) &&
      (!favoritesOnly || favorites.has(p.id)),
  )
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (sort === 'area') result.sort((a, b) => b.area - a.area)
  return result
}
