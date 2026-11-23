// Read a photo from the camera or the photo library, and make the stored square from it (T-2.4, D-029).
// The original is never kept (D-010, CLAUDE.md): only a smaller working copy while cropping.
import { MAX_WORKING_SIZE, fitInside, outputSize, type CropRect } from '../../domain/crop'

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

// The square that is stored: max 1024 px, as JPEG
export async function cropToBlob(source: HTMLCanvasElement, rect: CropRect): Promise<Blob> {
  const canvas = document.createElement('canvas')
  drawCrop(canvas, source, rect, outputSize(rect))
  try {
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
        'image/jpeg',
        0.85,
      ),
    )
  } finally {
    releaseCanvas(canvas)
  }
}

// Safari keeps canvas memory until the size is set to 0; with big photos that adds up quickly
export function releaseCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = 0
  canvas.height = 0
}
