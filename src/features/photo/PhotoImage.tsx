import { useEffect, useState } from 'react'
import { getPhoto } from '../../storage/planStore'

// Shows a stored photo, or a photo that is not saved yet (a Blob). Decorative like a Picto:
// the text of the tile says what it is.
export function PhotoImage({ photoId, blob }: { photoId?: number; blob?: Blob }) {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    let cancelled = false
    let created: string | undefined
    const show = (b: Blob | undefined) => {
      if (cancelled || !b) return
      created = URL.createObjectURL(b)
      setUrl(created)
    }
    if (blob) show(blob)
    else if (photoId !== undefined) void getPhoto(photoId).then(show, () => {})
    return () => {
      cancelled = true
      if (created) URL.revokeObjectURL(created)
    }
  }, [photoId, blob])

  if (!url) return <span className="photo-image photo-image--empty" aria-hidden="true" />
  return <img className="photo-image" src={url} alt="" width={80} height={80} />
}
