import { useEffect, useState } from 'react'
import { pictoUrl } from '../features/pictos/renderPicto'
import './components.css'

// Shows a built-in pictogram, sketched like the photos (D-037, D-039). Decorative: the text of the
// tile says what it is. While the sketch is being made, an empty square of the same size is shown.
export function Picto({ id }: { id: string }) {
  const [loaded, setLoaded] = useState<{ id: string; url: string }>()

  useEffect(() => {
    let cancelled = false
    void pictoUrl(id)?.then((url) => {
      if (!cancelled) setLoaded({ id, url })
    })
    return () => {
      cancelled = true
    }
  }, [id])

  // Only the picture of this id: when the id changes, the old picture is not shown in between
  const url = loaded?.id === id ? loaded.url : undefined

  if (!url) return <span className="picto picto--empty" aria-hidden="true" />
  return <img className="picto" src={url} alt="" width={80} height={80} />
}
