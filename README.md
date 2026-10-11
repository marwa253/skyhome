# SkyHome

Premium real-estate website built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP and Lucide.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Replace placeholders later

- Property photos: `src/data/properties.ts` (set `images` to your URLs; files can live in `public/images`)
- Video: `VIDEO_SRC` and `HERO_VIDEO_SRC` in `src/data/site.ts`
- Other placeholder art (agents, locations, hero): `src/assets/placeholders.ts` and `src/data/site.ts`
- Map: swap the contents of `MapCanvas` in `src/components/MapSection.tsx` for Google Maps or Mapbox

## Structure

`components/` UI sections, `components/ui/` small reusable pieces, `pages/`, `layouts/`, `data/` (all mock content), `types/`, `hooks/`, `animations/` (Framer variants + GSAP setup), `context/` (favorites, toasts, modal), `utils/`, `assets/`.

Auth and dashboards are intentionally not included yet.
