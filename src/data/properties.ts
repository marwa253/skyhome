import type { Property } from '@/types'
import { createPropertyImages } from '@/assets/placeholders'

type RawProperty = Omit<Property, 'images'>

const raw: RawProperty[] = [
  { id: 1, name: 'Modern Ocean Residence', location: 'New Cairo', type: 'Villa', price: 245000, beds: 3, baths: 2, area: 185, hue: 200, mapX: 62, mapY: 38, agentId: 0,
    description: 'A bright contemporary villa with open-plan living, a private garden and sea-breeze terraces, minutes from top schools and retail.',
    amenities: ['Private Garden', 'Smart Home', 'Parking', 'Terrace', '24/7 Security', 'Gym'] },
  { id: 2, name: 'The Palm Penthouse', location: 'Zamalek', type: 'Penthouse', price: 690000, beds: 4, baths: 3, area: 310, hue: 28, mapX: 34, mapY: 30, agentId: 1,
    description: 'A skyline penthouse with a wraparound terrace, double-height living room and private elevator access.',
    amenities: ['Private Elevator', 'Rooftop Pool', 'Concierge', 'Parking', 'Smart Home'] },
  { id: 3, name: 'Azure Bay Apartment', location: 'Sheikh Zayed', type: 'Apartment', price: 128000, beds: 2, baths: 2, area: 112, hue: 170, mapX: 20, mapY: 58, agentId: 2,
    description: 'A stylish two-bedroom apartment in a gated community with landscaped courtyards and a clubhouse.',
    amenities: ['Clubhouse', 'Pool', 'Parking', 'Playground'] },
  { id: 4, name: 'Willow Creek Townhouse', location: 'Maadi', type: 'Townhouse', price: 310000, beds: 4, baths: 3, area: 230, hue: 120, mapX: 48, mapY: 68, agentId: 3,
    description: 'A family townhouse on a leafy street featuring a chef’s kitchen, home office and sunny roof deck.',
    amenities: ['Roof Deck', 'Home Office', 'Garden', 'Parking', 'Storage'] },
  { id: 5, name: 'Skyline Executive Suite', location: 'New Capital', type: 'Apartment', price: 176000, beds: 3, baths: 2, area: 150, hue: 260, mapX: 82, mapY: 52, agentId: 0,
    description: 'A high-floor suite with floor-to-ceiling windows, premium finishes and direct access to the business district.',
    amenities: ['Gym', 'Concierge', 'Parking', 'Co-working', 'Smart Home'] },
  { id: 6, name: 'Golden Dunes Estate', location: 'Sheikh Zayed', type: 'Villa', price: 1250000, beds: 6, baths: 5, area: 640, hue: 38, mapX: 12, mapY: 28, agentId: 1,
    description: 'A landmark estate with a resort-style pool, guest house, cinema room and manicured grounds.',
    amenities: ['Private Pool', 'Guest House', 'Cinema', 'Wine Cellar', 'Security', 'Garden'] },
  { id: 7, name: 'Nile View Loft', location: 'Zamalek', type: 'Apartment', price: 210000, beds: 2, baths: 2, area: 128, hue: 215, mapX: 40, mapY: 44, agentId: 2,
    description: 'A designer loft above the river with soaring ceilings, exposed brick and a sunlit reading nook.',
    amenities: ['River View', 'Parking', 'Elevator', 'Balcony'] },
  { id: 8, name: 'Palmera Family Villa', location: 'New Cairo', type: 'Villa', price: 420000, beds: 5, baths: 4, area: 360, hue: 95, mapX: 72, mapY: 24, agentId: 3,
    description: 'A spacious family villa with a pool, play area and a cul-de-sac setting in a quiet compound.',
    amenities: ['Pool', 'Garden', 'Playground', 'Parking', 'Security'] },
]

export const properties: Property[] = raw.map((p) => ({ ...p, images: createPropertyImages(p.hue, p.id) }))
