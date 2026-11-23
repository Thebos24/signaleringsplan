// Read a photo from the camera or the photo library, and make the stored square from it (T-2.4, D-029).
// The original is never kept (D-010, CLAUDE.md): only a smaller working copy while cropping.
import { MAX_WORKING_SIZE, fitInside, outputSize, type CropRect } from '../../domain/crop'
import { sketch, type SketchStyle } from '../../domain/sketch'
import { colors } from '../../design/tokens'

// Read the file into a working copy of max 2048 px. createImageBitmap with 'from-image' turns the
// photo upright using its EXIF data, and Safari also reads iPhone HEIC photos this way (R-009).
export async function loadPhoto(file: Blob): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  try {
    const { width, height } = fitInside(bitmap.width, bitmap.height, MAX_WORKING_SIZE)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('No canvas')
    context.imageSmoothingQuality = 'high'
    context.drawImage(bitmap, 0, 0, width, height)
    return canvas
  } finally {
    bitmap.close()
  }
}

// Draw the chosen square of the photo onto a canvas of `size` × `size` pixels
export function drawCrop(
  target: HTMLCanvasElement,
  source: HTMLCanvasElement,
  rect: CropRect,
  size: number,
): void {
  target.width = size
  target.height = size
  const context = target.getContext('2d')
  if (!context) return
  context.imageSmoothingQuality = 'high'
  context.drawImage(source, rect.x, rect.y, rect.size, rect.size, 0, 0, size, size)
}

// The square that is stored: max 1024 px, turned into a sketch (T-2.5, D-010), as JPEG
export async function cropToSketch(
  source: HTMLCanvasElement,
  rect: CropRect,
  style: SketchStyle,
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  drawCrop(canvas, source, rect, outputSize(rect))
  try {
    sketchCanvas(canvas, style)
    return await canvasToBlob(canvas)
  } finally {
    releaseCanvas(canvas)
  }
}

// Replace the pixels of the canvas with their sketch
export function sketchCanvas(canvas: HTMLCanvasElement, style: SketchStyle): void {
  const context = canvas.getContext('2d')
  if (!context) throw new Error('No canvas')
  const { width, height } = canvas
  const pixels = context.getImageData(0, 0, width, height)
  const result = sketch(pixels, style, { ink: colors.ink, paper: colors.paper })
  pixels.data.set(result.data)
  context.putImageData(pixels, 0, 0)
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      'image/jpeg',
      0.85,
    ),
  )
}

// Safari keeps canvas memory until the size is set to 0; with big photos that adds up quickly
export function releaseCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = 0
  canvas.height = 0
}
