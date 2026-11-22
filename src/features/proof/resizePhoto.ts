// TEMPORARY (T-0.4): shrink a camera photo to max 1024 px as JPEG, without keeping the original (CLAUDE.md, D-010).
// createImageBitmap applies the EXIF orientation, so the photo is upright (R-009). Proper version in T-2.4.
const MAX_SIZE = 1024

export async function resizePhoto(
  file: Blob,
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', 0.85),
  )
  return { blob, width, height }
}
