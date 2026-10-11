import { AnimatePresence, motion } from 'framer-motion'
import PropertyCard from './PropertyCard'
import PropertySkeleton from '@/components/ui/PropertySkeleton'
import Select from '@/components/ui/Select'
import SectionHeading from '@/components/ui/SectionHeading'
import { useApp } from '@/context/AppContext'
import type { Property, SortKey } from '@/types'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Sort: Featured' }, { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }, { value: 'area', label: 'Largest area' },
]

interface Props { items: Property[]; loading: boolean; sort: SortKey; onSort: (s: SortKey) => void }

export default function PropertiesSection({ items, loading, sort, onSort }: Props) {
  const { favoritesOnly } = useApp()
  const label = favoritesOnly ? (items.length === 1 ? 'favorite' : 'favorites') : items.length === 1 ? 'property' : 'properties'

  return (
    <section id="properties" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Featured" title="Handpicked Properties" />
        <div className="flex items-center gap-3 text-sm">
          <span className="opacity-60">{loading ? 'Loading…' : `${items.length} ${label}`}</span>
          <Select className="w-48" value={sort} onChange={(v) => onSort(v as SortKey)} options={sortOptions} />
        </div>
      </div>
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <PropertySkeleton key={i} />)}</div>
      ) : items.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center opacity-60">
          {favoritesOnly ? 'No favorites yet. Tap the heart on any property to save it.' : 'No properties match your search. Try widening your filters.'}
        </motion.p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>{items.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}</AnimatePresence>
        </div>
      )}
    </section>
  )
}
