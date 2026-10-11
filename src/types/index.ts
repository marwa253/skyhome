export type PropertyType = 'Villa' | 'Penthouse' | 'Apartment' | 'Townhouse'

export interface Property {
  id: number
  name: string
  location: string
  type: PropertyType
  price: number
  beds: number
  baths: number
  area: number // m²
  hue: number // drives the placeholder artwork colour
  mapX: number // % position on the map placeholder
  mapY: number
  description: string
  amenities: string[]
  agentId: number
  images: string[] // replace with real image URLs later
}

export interface Agent { id: number; name: string; role: string; listings: number; hue: number }
export interface Testimonial { name: string; role: string; rating: number; text: string; hue: number }
export interface LocationInfo { name: string; count: number; hue: number }
export interface PriceRange { value: string; label: string; min: number; max: number }

export interface Filters { location: string; type: string; price: string; beds: number }
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'area'
export interface ToastMessage { id: number; message: string }
