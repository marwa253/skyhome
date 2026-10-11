import { Compass, CalendarCheck, KeyRound, Search, Home, BadgeDollarSign, Wrench, TrendingUp, MessagesSquare, type LucideIcon } from 'lucide-react'
import type { Agent, LocationInfo, PriceRange, Testimonial } from '@/types'
import { createArt } from '@/assets/placeholders'

/** Set to a URL (e.g. "/videos/tour.mp4") to play a real video in the video section. */
export const VIDEO_SRC = ''
/** Set to a URL to use a looping background video in the hero. */
export const HERO_VIDEO_SRC = ''
export const HERO_IMAGE = createArt(205, 1)
export const VIDEO_POSTER = createArt(28, 2)

export const NAV_LINKS = [
  { label: 'Home', href: '#home' }, { label: 'Properties', href: '#properties' }, { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' }, { label: 'Agents', href: '#agents' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' },
]

export const PRICE_RANGES: PriceRange[] = [
  { value: '', label: 'Any price', min: 0, max: Infinity },
  { value: 'low', label: 'Under $250k', min: 0, max: 250000 },
  { value: 'mid', label: '$250k – $600k', min: 250000, max: 600000 },
  { value: 'high', label: '$600k+', min: 600000, max: Infinity },
]

export const STATS = [
  { value: 500, suffix: '+', label: 'Properties' }, { value: 1200, suffix: '+', label: 'Happy Clients' },
  { value: 35, suffix: '+', label: 'Locations' }, { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

export const STEPS: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Search', text: 'Filter by location, type and budget.', icon: Search },
  { title: 'Explore', text: 'Browse galleries, amenities and maps.', icon: Compass },
  { title: 'Schedule a Visit', text: 'Book a viewing with a local agent.', icon: CalendarCheck },
  { title: 'Find Your Home', text: 'Close with confidence and move in.', icon: KeyRound },
]

export const SERVICES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Buy a Property', text: 'Find and secure the right home.', icon: Home },
  { title: 'Rent a Property', text: 'Verified rentals with flexible terms.', icon: KeyRound },
  { title: 'Sell a Property', text: 'Pricing, marketing and negotiation.', icon: BadgeDollarSign },
  { title: 'Property Management', text: 'Hands-off care for your assets.', icon: Wrench },
  { title: 'Real Estate Investment', text: 'Data-led opportunities and ROI.', icon: TrendingUp },
  { title: 'Property Consultation', text: 'Expert one-to-one guidance.', icon: MessagesSquare },
]

export const LOCATIONS: LocationInfo[] = [
  { name: 'New Cairo', count: 86, hue: 200 }, { name: 'Zamalek', count: 49, hue: 28 },
  { name: 'Sheikh Zayed', count: 73, hue: 170 }, { name: 'New Capital', count: 61, hue: 260 },
]

export const AGENTS: Agent[] = [
  { id: 0, name: 'Layla Hassan', role: 'Senior Agent', listings: 34, hue: 200 },
  { id: 1, name: 'Omar Farouk', role: 'Luxury Specialist', listings: 28, hue: 28 },
  { id: 2, name: 'Nour Adel', role: 'Rental Advisor', listings: 41, hue: 170 },
  { id: 3, name: 'Karim Saleh', role: 'Investment Lead', listings: 22, hue: 260 },
]

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Sara M.', role: 'First-time buyer', rating: 5, hue: 30, text: 'SkyHome made buying our first home calm and clear. Every viewing was perfectly organised.' },
  { name: 'Ahmed R.', role: 'Investor', rating: 5, hue: 100, text: 'Sharp market insight and honest numbers. I closed two deals in a single quarter.' },
  { name: 'Dina K.', role: 'Seller', rating: 4, hue: 170, text: 'Our villa sold above asking within three weeks. The marketing was exceptional.' },
]
