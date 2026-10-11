import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP is used only for scroll-scrubbed / timeline effects (hero parallax, process timeline)
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
