/**
 * Placeholder artwork. Every image in the site comes from here or from data/*.
 * To use real photos, put files in /public/images and replace the URLs in data/properties.ts.
 */
export function createArt(hue: number, variant = 0): string {
  const [x, , w, h] = [[60, 90, 160, 110], [40, 70, 100, 130], [80, 100, 120, 90], [50, 80, 180, 100]][variant % 4]
  const windows = [0, 1, 2]
    .map((i) => `<rect x='${x * 2 + 30 + (i * (w * 2 - 60)) / 3}' y='${440 - h * 2}' width='${(w * 2 - 80) / 3}' height='60' fill='hsl(${hue},60%,35%)' opacity='.75'/>`)
    .join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 520'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='hsl(${hue},55%,62%)'/><stop offset='1' stop-color='hsl(${hue + 25},70%,88%)'/></linearGradient></defs><rect width='800' height='520' fill='url(#g)'/><circle cx='${600 - variant * 60}' cy='110' r='46' fill='#fff' opacity='.7'/><rect y='400' width='800' height='120' fill='hsl(${hue + 10},25%,30%)'/><rect x='${x * 2}' y='${400 - h * 2}' width='${w * 2}' height='${h * 2}' fill='hsl(${hue},20%,95%)'/><rect x='${x * 2 + 40}' y='${400 - h * 2 - 50}' width='${w * 2 - 80}' height='50' fill='hsl(${hue},25%,22%)'/>${windows}<rect x='${x * 2 + w * 2 - 110}' y='350' width='60' height='50' fill='hsl(${hue},30%,20%)'/></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

export const createPropertyImages = (hue: number, seed: number): string[] =>
  [0, 1, 2, 3].map((i) => createArt(hue + i * 8, i + seed))
