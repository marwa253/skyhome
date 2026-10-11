import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Select from '@/components/ui/Select'
import { PRICE_RANGES } from '@/data/site'
import { properties } from '@/data/properties'
import type { Filters } from '@/types'
import { fadeUp } from '@/animations/variants'

const unique = (k: 'location' | 'type') => [...new Set(properties.map((p) => p[k]))]
const locationOptions = [{ value: '', label: 'All locations' }, ...unique('location').map((v) => ({ value: v, label: v }))]
const typeOptions = [{ value: '', label: 'All types' }, ...unique('type').map((v) => ({ value: v, label: v }))]
const bedOptions = [{ value: '0', label: 'Any' }, { value: '2', label: '2+' }, { value: '3', label: '3+' }, { value: '4', label: '4+' }]

interface Props { filters: Filters; onSearch: (f: Filters) => void }

export default function SearchPanel({ filters, onSearch }: Props) {
  const [draft, setDraft] = useState(filters)
  useEffect(() => setDraft(filters), [filters]) // stays in sync when a location card is chosen
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setDraft((d) => ({ ...d, [k]: v }))
  const submit = (e: FormEvent) => { e.preventDefault(); onSearch(draft) }

  return (
    <motion.form variants={fadeUp} onSubmit={submit} role="search"
      className="mt-10 grid max-w-5xl grid-cols-2 gap-3 rounded-3xl bg-white/90 p-4 text-stone-800 shadow-2xl backdrop-blur-xl dark:bg-stone-900/85 dark:text-stone-100 lg:grid-cols-5">
      <Select className="col-span-2 lg:col-span-1" label="Location" value={draft.location} onChange={(v) => set('location', v)} options={locationOptions} />
      <Select label="Type" value={draft.type} onChange={(v) => set('type', v)} options={typeOptions} />
      <Select label="Price" value={draft.price} onChange={(v) => set('price', v)} options={PRICE_RANGES.map(({ value, label }) => ({ value, label }))} />
      <Select label="Bedrooms" value={String(draft.beds)} onChange={(v) => set('beds', Number(v))} options={bedOptions} />
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="col-span-2 flex h-11 items-center justify-center gap-2 self-end rounded-xl bg-stone-900 font-medium text-white dark:bg-gold lg:col-span-1">
        <Search size={17} /> Search
      </motion.button>
    </motion.form>
  )
}
