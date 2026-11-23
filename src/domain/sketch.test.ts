import { describe, expect, it } from 'vitest'
import {
  SKETCH_STYLES,
  blur,
  edgeStrength,
  hexToRgb,
  percentile,
  sketch,
  stretchContrast,
  toGrey,
  type Pixels,
} from './sketch'

const colors = { ink: '#2B2B2B', paper: '#FBF8F2' }

// A made-up test picture: a dark square on a light background, with a gradient behind it
function testPicture(width: number, height: number, brightness = 1): Pixels {
  const data = new Uint8ClampedArray(width * height * 4)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const inSquare =
        x > width / 4 && x < (3 * width) / 4 && y > height / 4 && y < (3 * height) / 4
      const v = (inSquare ? 40 : 160 + (60 * x) / width) * brightness
      const i = (y * width + x) * 4
      data.set([v, v * 0.9, v * 0.8, 255], i)
    }
  }
  return { data, width, height }
}

function plain(width: number, height: number, value: number): Pixels {
  const data = new Uint8ClampedArray(width * height * 4).fill(value)
  return { data, width, height }
}

const darkness = ({ data }: Pixels, x: number, y: number, width: number) =>
  255 - data[(y * width + x) * 4]

describe('sketch', () => {
  it.each(SKETCH_STYLES)('%s keeps the size and gives solid pixels', (style) => {
    const result = sketch(testPicture(64, 48), style, colors)
    expect(result.width).toBe(64)
    expect(result.height).toBe(48)
    expect(result.data.length).toBe(64 * 48 * 4)
    for (let i = 3; i < result.data.length; i += 4) expect(result.data[i]).toBe(255)
  })

  it.each(SKETCH_STYLES)('%s works on a big photo (1024 px) without errors', (style) => {
    const result = sketch(testPicture(1024, 1024), style, colors)
    expect(result.data.length).toBe(1024 * 1024 * 4)
  })

  it.each(SKETCH_STYLES)('%s works on tiny and on all-black or all-white photos', (style) => {
    for (const pixels of [plain(1, 1, 128), plain(8, 8, 0), plain(8, 8, 255), testPicture(3, 2)]) {
      const result = sketch(pixels, style, colors)
      expect(result.data.length).toBe(pixels.width * pixels.height * 4)
      expect(result.data.every((v) => Number.isFinite(v))).toBe(true)
    }
  })

  it.each(SKETCH_STYLES)('%s draws only in ink and paper colours (and mixes of them)', (style) => {
    const { data } = sketch(testPicture(32, 32), style, colors)
    const [inkR] = hexToRgb(colors.ink)
    const [paperR] = hexToRgb(colors.paper)
    for (let i = 0; i < data.length; i += 4) {
      expect(data[i]).toBeGreaterThanOrEqual(inkR)
      expect(data[i]).toBeLessThanOrEqual(paperR)
    }
  })

  it.each(SKETCH_STYLES)(
    '%s draws the outline of a shape darker than the flat background',
    (style) => {
      const size = 64
      const result = sketch(testPicture(size, size), style, colors)
      const onEdge = darkness(result, size / 4 + 1, size / 2, size)
      const background = darkness(result, 4, 4, size)
      expect(onEdge).toBeGreaterThan(background)
    },
  )

  it.each(SKETCH_STYLES)(
    '%s gives a dark photo about the same sketch as a light one (R-004)',
    (style) => {
      const size = 64
      const light = sketch(testPicture(size, size, 1), style, colors)
      const dark = sketch(testPicture(size, size, 0.3), style, colors)
      const edge = (p: Pixels) => darkness(p, size / 4 + 1, size / 2, size)
      expect(Math.abs(edge(light) - edge(dark))).toBeLessThan(40)
    },
  )
})

it('pencil turns a big flat dark area into paper, not a black blob', () => {
  // Left half black, right half white: far from the border the black side must be (almost) paper
  const width = 200
  const data = new Uint8ClampedArray(width * width * 4)
  for (let i = 0; i < width * width; i++) {
    const v = i % width < width / 2 ? 0 : 255
    data.set([v, v, v, 255], i * 4)
  }
  const result = sketch({ data, width, height: width }, 'pencil', colors)
  expect(darkness(result, 20, 100, width)).toBeLessThan(30)
})

describe('sketch helpers', () => {
  it('toGrey uses the brightness of each colour', () => {
    const grey = toGrey({
      data: new Uint8ClampedArray([255, 255, 255, 255, 0, 0, 0, 255]),
      width: 2,
      height: 1,
    })
    expect(grey[0]).toBeCloseTo(255)
    expect(grey[1]).toBe(0)
  })

  it('stretchContrast spreads a dull photo over the whole range', () => {
    const grey = new Float32Array(100).map((_, i) => 100 + i / 2) // 100…149.5
    const stretched = stretchContrast(grey)
    expect(Math.min(...stretched)).toBeLessThan(5)
    expect(Math.max(...stretched)).toBeGreaterThan(250)
  })

  it('stretchContrast leaves a photo of one grey alone', () => {
    const grey = new Float32Array(10).fill(80)
    expect([...stretchContrast(grey)]).toEqual([...grey])
  })

  it('percentile finds the median', () => {
    const values = new Float32Array(101).map((_, i) => i)
    expect(percentile(values, 0.5)).toBeCloseTo(50, -1)
    expect(percentile(new Float32Array(0), 0.5)).toBe(0)
  })

  it('blur keeps a flat area flat and softens a sharp step', () => {
    const flat = new Float32Array(25).fill(90)
    expect(blur(flat, 5, 5, 1).every((v) => Math.abs(v - 90) < 0.001)).toBe(true)
    const step = new Float32Array(10).map((_, i) => (i < 5 ? 0 : 255))
    const soft = blur(step, 10, 1, 1)
    expect(soft[4]).toBeGreaterThan(0)
    expect(soft[5]).toBeLessThan(255)
  })

  it('edgeStrength is zero on a flat area and high on a step', () => {
    const step = new Float32Array(9 * 9).map((_, i) => (i % 9 < 4 ? 0 : 255))
    const edges = edgeStrength(step, 9, 9)
    expect(edges[4 * 9 + 0]).toBe(0)
    expect(edges[4 * 9 + 4]).toBeGreaterThan(500)
  })
})
