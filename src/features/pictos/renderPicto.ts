// Turns a pictogram source into a pencil sketch, in the browser, the first time it is shown (D-039).
// The result is kept in memory (as an object URL) until the app is closed; the next start makes it
// again. Nothing is stored and nothing goes over the network.
import { PICTO_DARKNESS, sketch } from '../../domain/sketch'
import { colors } from '../../design/tokens'
import { canvasToBlob, releaseCanvas } from '../photo/photoCanvas'
import { pictoSvg, svgDataUrl } from './pictoSource'

// Pixels per side: sharp at 80 CSS px on a phone with a 3× screen
export const PICTO_PIXELS = 256

const cache = new Map<string, Promise<string>>()

// The image URL for a pictogram: the sketch, or (if the filter fails on this phone) the flat drawing,
// so there is always a picture. Undefined for an unknown id.
export function pictoUrl(id: string): Promise<string> | undefined {
  const svg = pictoSvg(id, PICTO_PIXELS)
  if (!svg) return undefined
  let url = cache.get(id)
  if (!url) {
    const flat = svgDataUrl(svg)
    url = sketchSvg(flat).catch(() => flat)
    cache.set(id, url)
  }
  return url
}

// Make all sketches ahead, one after the other, so the screens do not have to wait for them
export async function preloadPictos(ids: readonly string[]): Promise<void> {
  for (const id of ids) await pictoUrl(id)
}

async function sketchSvg(src: string): Promise<string> {
  const image = new Image()
  image.src = src
  await image.decode()
  const canvas = document.createElement('canvas')
  canvas.width = PICTO_PIXELS
  canvas.height = PICTO_PIXELS
  try {
    const context = canvas.getContext('2d')
    if (!context) throw new Error('No canvas')
    context.fillStyle = '#fff'
    context.fillRect(0, 0, PICTO_PIXELS, PICTO_PIXELS)
    context.drawImage(image, 0, 0, PICTO_PIXELS, PICTO_PIXELS)
    const pixels = context.getImageData(0, 0, PICTO_PIXELS, PICTO_PIXELS)
    const result = sketch(
      pixels,
      // White paper: with mix-blend-mode multiply it takes the colour of whatever is below it
      { ink: colors.ink, paper: colors.surface },
      { darkness: PICTO_DARKNESS },
    )
    pixels.data.set(result.data)
    context.putImageData(pixels, 0, 0)
    return URL.createObjectURL(await canvasToBlob(canvas))
  } finally {
    releaseCanvas(canvas)
  }
}
