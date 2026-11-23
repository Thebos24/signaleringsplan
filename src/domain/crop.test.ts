import {
  MAX_PHOTO_SIZE,
  clampCrop,
  cropRect,
  fitInside,
  initialCrop,
  outputSize,
  panCrop,
  zoomCrop,
} from './crop'

// A landscape photo like an iPhone working copy
const W = 2048
const H = 1536

describe('crop', () => {
  it('starts with the largest square in the middle', () => {
    expect(cropRect(W, H, initialCrop(W, H))).toEqual({ x: 256, y: 0, size: 1536 })
  })

  it('works for a portrait photo too', () => {
    expect(cropRect(1536, 2048, initialCrop(1536, 2048))).toEqual({ x: 0, y: 256, size: 1536 })
  })

  it('zooming in makes the square smaller around the same centre', () => {
    const crop = zoomCrop(W, H, initialCrop(W, H), 2)
    expect(cropRect(W, H, crop)).toEqual({ x: 640, y: 384, size: 768 })
  })

  it('keeps the zoom between 1 and 3', () => {
    expect(zoomCrop(W, H, initialCrop(W, H), 0.2).zoom).toBe(1)
    expect(zoomCrop(W, H, initialCrop(W, H), 10).zoom).toBe(3)
  })

  it('never lets the square leave the photo', () => {
    const far = clampCrop(W, H, { centerX: -500, centerY: 99999, zoom: 2 })
    const rect = cropRect(W, H, far)
    expect(rect.x).toBe(0)
    expect(rect.y + rect.size).toBe(H)
  })

  it('zooming out near an edge pulls the square back inside', () => {
    const corner = clampCrop(W, H, { centerX: 0, centerY: 0, zoom: 3 })
    const out = zoomCrop(W, H, corner, 1)
    const rect = cropRect(W, H, out)
    expect(rect.x).toBeGreaterThanOrEqual(0)
    expect(rect.y).toBeGreaterThanOrEqual(0)
    expect(rect.x + rect.size).toBeLessThanOrEqual(W)
  })

  it('dragging to the right shows more of the left side', () => {
    const start = initialCrop(W, H)
    // frame of 300 px shows 1536 photo px, so 100 screen px = 512 photo px, but only 256 is left
    const moved = panCrop(W, H, start, 100, 0, 300)
    expect(cropRect(W, H, moved).x).toBe(0)

    const small = panCrop(W, H, start, 30, 0, 300)
    expect(cropRect(W, H, small).x).toBeCloseTo(256 - 153.6)
  })

  it('stores at most 1024 px and never enlarges a small crop', () => {
    expect(outputSize({ x: 0, y: 0, size: 1536 })).toBe(MAX_PHOTO_SIZE)
    expect(outputSize({ x: 0, y: 0, size: 512.4 })).toBe(512)
  })

  it('shrinks a big photo to the working size, keeps a small one', () => {
    expect(fitInside(4032, 3024, 2048)).toEqual({ width: 2048, height: 1536 })
    expect(fitInside(3024, 4032, 2048)).toEqual({ width: 1536, height: 2048 })
    expect(fitInside(800, 600, 2048)).toEqual({ width: 800, height: 600 })
  })
})
