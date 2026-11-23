// The source drawings of the pictograms (D-037, T-2.8). Each source in ./sources/ is a flat SVG drawing
// (viewBox 0 0 100 100): shapes, thick lines and `url(#hatch)` for shading. The sketch filter turns it
// into pencil on paper in the app (renderPicto.ts), so pictograms look like the sketched photos.
//
// The sources are bundled into the app as text, so they work offline without a network request.

const files = import.meta.glob('./sources/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// id -> source SVG text, e.g. 'walk' -> '<svg ...>...</svg>'
export const PICTO_SOURCES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => [path.replace(/^.*\/(.+)\.svg$/, '$1'), svg]),
)

// Shared parts every source may use: the hatch pattern for shading, and a slight wobble so the lines
// look drawn by hand. Kept here, so a new source only needs its own shapes.
const DEFS =
  '<defs>' +
  '<filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">' +
  '<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5"/>' +
  '<feDisplacementMap in="SourceGraphic" scale="1.6"/>' +
  '</filter>' +
  '<pattern id="hatch" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">' +
  '<rect width="1.3" height="3.2" fill="#222"/>' +
  '</pattern>' +
  '</defs>'

// The drawing is made a bit smaller (84%) so it stays clear of the soft paper edge of the filter (D-032)
const SCALE = 0.84

// The complete SVG that goes into the filter: white background, shared defs, the drawing with wobble.
// Gives undefined for an unknown id.
export function pictoSvg(id: string, size: number): string | undefined {
  const source = PICTO_SOURCES[id]
  if (!source) return undefined
  const inner = source.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">` +
    DEFS +
    '<rect width="100" height="100" fill="#fff"/>' +
    `<g transform="translate(50 50) scale(${SCALE}) translate(-50 -50)">` +
    `<g filter="url(#wobble)">${inner}</g>` +
    '</g></svg>'
  )
}

export function svgDataUrl(svg: string): string {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}
