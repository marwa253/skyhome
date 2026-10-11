import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Hero from '@/components/Hero'
import PropertiesSection from '@/components/PropertiesSection'
import VideoSection from '@/components/VideoSection'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import Locations from '@/components/Locations'
import MapSection from '@/components/MapSection'
import Testimonials from '@/components/Testimonials'
import Agents from '@/components/Agents'
import { properties } from '@/data/properties'
import { useApp } from '@/context/AppContext'
import { filterProperties, scrollToId } from '@/utils/helpers'
import type { Filters, SortKey } from '@/types'

const DEFAULT_FILTERS: Filters = { location: '', type: '', price: '', beds: 0 }

export default function HomePage() {
  const { favorites, favoritesOnly } = useApp()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortKey>('featured')
  const [loading, setLoading] = useState(true)
  const timer = useRef<number | undefined>(undefined)

  // Brief skeleton state so changing results feels responsive (swap for a real request later)
  const simulateLoad = useCallback(() => {
    setLoading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setLoading(false), 600)
  }, [])
  useEffect(() => { simulateLoad(); return () => window.clearTimeout(timer.current) }, [simulateLoad, favoritesOnly])

  const items = useMemo(() => filterProperties(properties, filters, sort, favorites, favoritesOnly), [filters, sort, favorites, favoritesOnly])

  const search = (f: Filters) => { setFilters(f); simulateLoad(); scrollToId('properties') }
  const changeSort = (s: SortKey) => { setSort(s); simulateLoad() }
  const pickLocation = (name: string) => search({ ...DEFAULT_FILTERS, location: name })

  return (
    <>
      <Hero filters={filters} onSearch={search} />
      <PropertiesSection items={items} loading={loading} sort={sort} onSort={changeSort} />
      <VideoSection />
      <Stats />
      <HowItWorks />
      <Services />
      <section id="locations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Locations onSelect={pickLocation} />
        <MapSection />
      </section>
      <Testimonials />
      <Agents />
    </>
  )
}
