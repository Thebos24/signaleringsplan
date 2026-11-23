import { useEffect, useState } from 'react'
import { BigButton } from '../../components/BigButton'
import { nl } from '../../text/nl'

const t = nl.photo

// The photo as a sketch, big, so the supervisor and client can see if it is clear (T-2.5, D-010)
export function SketchPreview({
  blob,
  onUse,
  onAgain,
}: {
  blob: Blob
  onUse: () => void
  onAgain: () => void
}) {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    // Same way as PhotoImage: make a temporary address for the picture, and free it afterwards
    const created = URL.createObjectURL(blob)
    const show = () => setUrl(created)
    show()
    return () => URL.revokeObjectURL(created)
  }, [blob])

  return (
    <div className="photo">
      <p className="photo__hint">{t.sketchHint}</p>
      <div className="photo__frame photo__frame--still">
        {url && <img className="photo__view" src={url} alt={t.sketchAlt} />}
      </div>
      <div className="fill__actions">
        <BigButton onClick={onUse}>{t.sketchUse}</BigButton>
        <BigButton variant="quiet" onClick={onAgain}>
          {t.sketchAgain}
        </BigButton>
      </div>
    </div>
  )
}
