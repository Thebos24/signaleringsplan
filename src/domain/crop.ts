// Square crop of a photo (T-2.4, D-029). Pure maths, no canvas, so it can be tested.
//
// The crop is a square inside the photo, described by its centre (in photo pixels) and a zoom.
// Zoom 1 = the largest square that fits (the short side of the photo). Zoom 2 = half that size.

export const MIN_ZOOM = 1
export const MAX_ZOOM = 3

// A stored photo is at most this many pixels wide and high (D-010, CLAUDE.md)
export const MAX_PHOTO_SIZE = 1024

export interface Crop {
  centerX: number
  centerY: number
  zoom: number
}

// The part of the photo that is used, in photo pixels
export interface CropRect {
  x: number
  y: number
  size: number
}

export function clampZoom(zoom: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))
}

// Start in the middle, zoomed out as far as possible
export function initialCrop(width: number, height: number): Crop {
  return { centerX: width / 2, centerY: height / 2, zoom: MIN_ZOOM }
}

export function cropSize(width: number, height: number, zoom: number): number {
  return Math.min(width, height) / clampZoom(zoom)
}

// Keep the square inside the photo: move the centre back if it is too close to an edge
export function clampCrop(width: number, height: number, crop: Crop): Crop {
  const zoom = clampZoom(crop.zoom)
  const half = cropSize(width, height, zoom) / 2
  const clamp = (value: number, max: number) => Math.min(max - half, Math.max(half, value))
  return { centerX: clamp(crop.centerX, width), centerY: clamp(crop.centerY, height), zoom }
}

export function cropRect(width: number, height: number, crop: Crop): CropRect {
  const clamped = clampCrop(width, height, crop)
  const size = cropSize(width, height, clamped.zoom)
  return { x: clamped.centerX - size / 2, y: clamped.centerY - size / 2, size }
}

// Moving a finger over the frame moves the photo along with it, so the crop moves the other way.
// `frameSize` is the width of the square frame on screen, in CSS pixels.
export function panCrop(
  width: number,
  height: number,
  crop: Crop,
  dx: number,
  dy: number,
  frameSize: number,
): Crop {
  const photoPixelsPerScreenPixel = cropSize(width, height, crop.zoom) / frameSize
  return clampCrop(width, height, {
    ...crop,
    centerX: crop.centerX - dx * photoPixelsPerScreenPixel,
    centerY: crop.centerY - dy * photoPixelsPerScreenPixel,
  })
}

export function zoomCrop(width: number, height: number, crop: Crop, zoom: number): Crop {
  return clampCrop(width, height, { ...crop, zoom })
}

// Size of the stored photo: never larger than the crop itself (no blurry enlarging), max 1024
export function outputSize(rect: CropRect): number {
  return Math.max(1, Math.round(Math.min(MAX_PHOTO_SIZE, rect.size)))
}

// Size of the working copy of a photo: big enough to zoom in, small enough for the phone's memory
// (an iPhone photo is 4032×3024; Safari limits how big a canvas may be, R-009).
export const MAX_WORKING_SIZE = 2048

export function fitInside(
  width: number,
  height: number,
  max: number,
): { width: number; height: number } {
  const scale = Math.min(1, max / Math.max(width, height))
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}
