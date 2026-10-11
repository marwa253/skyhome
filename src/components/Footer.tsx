import type { FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function Footer() {
  const { toast } = useApp()
  const subscribe = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); toast('Thanks for subscribing'); e.currentTarget.reset() }
  return (
    <footer id="contact" className="bg-stone-950 pt-16 text-stone-300" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div id="about">
          <div className="font-serif text-3xl text-white">Sky<span className="text-gold">Home</span></div>
          <p className="mt-3 max-w-xs text-sm opacity-70">Premium homes and honest advice across the region’s best neighborhoods.</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="font-medium text-white">Contact</li>
          <li className="flex items-center gap-2"><Mail size={15} className="text-gold" /> hello@skyhome.example</li>
          <li className="flex items-center gap-2"><Phone size={15} className="text-gold" /> +20 2 5555 0100</li>
          <li className="flex items-center gap-2"><MapPin size={15} className="text-gold" /> 90th Street, New Cairo</li>
        </ul>
        <form onSubmit={subscribe} className="flex gap-2 self-start">
          <input required type="email" placeholder="Your email" aria-label="Email address" className="h-11 min-w-0 flex-1 rounded-full bg-white/10 px-4 text-white outline-none placeholder:text-stone-500 focus:ring-2 focus:ring-gold" />
          <button className="rounded-full bg-gold px-5 text-white transition-opacity hover:opacity-90">Join</button>
        </form>
      </div>
    </footer>
  )
}
