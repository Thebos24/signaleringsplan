// Turn a photo into a pencil sketch (T-2.5, D-010, D-030). Pure pixel maths, no canvas, so it can be
// tested in jsdom. The canvas work (reading and writing the pixels) is in features/photo/photoCanvas.ts.
//
// Steps: grey values, the contrast stretched so dark and light photos both give a clear sketch (R-004),
// the pencil effect (Sander chose it from three styles, D-030), and a soft fade to paper at the edges
// so the picture sits in the middle (D-032). Drawn in `ink` on `paper`, like the pictograms.

// RGBA pixels, like ImageData (4 bytes per pixel)
export interface Pixels {
  data: Uint8ClampedArray
  width: number
  height: number
}

// Grey value per pixel: 0 = black, 255 = white
type Grey = Float32Array

export interface SketchColors {
  ink: string // '#RRGGBB'
  paper: string // '#RRGGBB'
}

export function sketch(pixels: Pixels, colors: SketchColors): Pixels {
  const { width, height } = pixels
  const grey = stretchContrast(toGrey(pixels))
  const tone = fadeEdges(pencil(grey, width, height, Math.max(width, height)), width, height)
  return { data: paint(tone, colors), width, height }
}

// Where the fade starts and ends, as a fraction of the distance from the middle to the edge.
// Inside FADE_START nothing changes; at the edge (1) and in the corners everything is paper.
export const FADE_START = 0.6
const FADE_END = 1

// Soft fade to paper towards the edges, round like a vignette, so the picture sits in the middle
export function fadeEdges(tone: Grey, width: number, height: number): Grey {
  const centerX = (width - 1) / 2
  const centerY = (height - 1) / 2
  const radiusX = Math.max(0.5, width / 2)
  const radiusY = Math.max(0.5, height / 2)
  return tone.map((v, i) => {
    const x = (i % width) - centerX
    const y = Math.floor(i / width) - centerY
    const distance = Math.hypot(x / radiusX, y / radiusY) // 0 = middle, 1 = edge
    const t = clamp01((distance - FADE_START) / (FADE_END - FADE_START))
    const paper = t * t * (3 - 2 * t) // smooth start and end ("smoothstep")
    return v + (255 - v) * paper
  })
}

// Classic pencil effect: grey ÷ (blurred negative), "colour dodge". Flat areas turn white, edges and
// shadows stay as soft pencil strokes. The power of 3 makes the strokes darker; plain dodge is too faint.
function pencil(grey: Grey, width: number, height: number, size: number): Grey {
  const negative = grey.map((v) => 255 - v)
  const blurred = blur(negative, width, height, Math.max(1, Math.round(size / 128)))
  return grey.map((v, i) => {
    // +1 on both sides: a flat, fully black area must give white paper too, not 0 ÷ 0 = black
    const dodged = Math.min(255, ((v + 1) * 255) / (256 - blurred[i]))
    return 255 * (dodged / 255) ** 3
  })
}

export function toGrey({ data, width, height }: Pixels): Grey {
  const grey = new Float32Array(width * height)
  for (let i = 0; i < grey.length; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    grey[i] = 0.299 * r + 0.587 * g + 0.114 * b
  }
  return grey
}

// Spread the grey values over 0–255, ignoring the darkest and lightest 1% (single bright spots).
// A photo that is all one grey stays as it is: there is nothing to stretch.
export function stretchContrast(grey: Grey): Grey {
  const low = percentile(grey, 0.01)
  const high = percentile(grey, 0.99)
  if (high - low < 1) return grey
  return grey.map((v) => 255 * clamp01((v - low) / (high - low)))
}

// The value below which `fraction` of the values lie (0.5 = the median). Uses 256 buckets: precise
// enough here, and fast on a million pixels.
export function percentile(values: Float32Array, fraction: number): number {
  if (values.length === 0) return 0
  let max = 0
  for (const v of values) if (v > max) max = v
  if (max === 0) return 0
  const buckets = new Uint32Array(256)
  for (const v of values) buckets[Math.min(255, Math.floor((v / max) * 255))]++
  const target = fraction * values.length
  let count = 0
  for (let b = 0; b < 256; b++) {
    count += buckets[b]
    if (count >= target) return (b / 255) * max
  }
  return max
}

// Soft blur: three box blurs in a row look almost like a real (Gaussian) blur, and each is fast
export function blur(grey: Grey, width: number, height: number, radius: number): Grey {
  let result = grey
  for (let pass = 0; pass < 3; pass++) {
    result = boxBlur(result, width, height, radius, true)
    result = boxBlur(result, width, height, radius, false)
  }
  return result
}

// Average over a line of 2 × radius + 1 pixels, along the rows or along the columns.
// At the edges the edge pixel is repeated, so the borders do not turn dark.
function boxBlur(
  grey: Grey,
  width: number,
  height: number,
  radius: number,
  alongRows: boolean,
): Grey {
  const out = new Float32Array(grey.length)
  const lineLength = alongRows ? width : height
  const lineCount = alongRows ? height : width
  const step = alongRows ? 1 : width
  const span = 2 * radius + 1
  for (let line = 0; line < lineCount; line++) {
    const start = alongRows ? line * width : line
    const at = (k: number) => grey[start + Math.min(lineLength - 1, Math.max(0, k)) * step]
    let sum = 0
    for (let k = -radius; k <= radius; k++) sum += at(k)
    for (let k = 0; k < lineLength; k++) {
      out[start + k * step] = sum / span
      sum += at(k + radius + 1) - at(k - radius)
    }
  }
  return out
}

// Tone 0 = ink, 255 = paper, everything in between is a mix of the two
function paint(tone: Grey, colors: SketchColors): Uint8ClampedArray {
  const ink = hexToRgb(colors.ink)
  const paper = hexToRgb(colors.paper)
  const data = new Uint8ClampedArray(tone.length * 4)
  for (let i = 0; i < tone.length; i++) {
    const t = clamp01(tone[i] / 255)
    for (let c = 0; c < 3; c++) data[i * 4 + c] = ink[c] + (paper[c] - ink[c]) * t
    data[i * 4 + 3] = 255
  }
  return data
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v))
}
