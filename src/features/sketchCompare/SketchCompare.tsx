import { useEffect, useRef, useState } from 'react'
import { cropRect, initialCrop, outputSize } from '../../domain/crop'
import { SKETCH_STYLES, type SketchStyle } from '../../domain/sketch'
import { nl } from '../../text/nl'
import { drawCrop, loadPhoto, releaseCanvas, sketchCanvas } from '../photo/photoCanvas'
import '../photo/photo.css'

const t = nl.sketchCompare

// TEMPORARY (T-2.5, R-013): one photo in all sketch styles, so Sander can choose one.
// Nothing is saved. Open with #schets.
export function SketchCompare() {
  const [file, setFile] = useState<Blob>()
  const [busy, setBusy] = useState(false)

  return (
    <main className="photo" style={{ padding: 'var(--size-gap)' }}>
      <h1>{t.title}</h1>
      <p>{t.intro}</p>
      <label className="big-button big-button--quiet fill__photo-button">
        {t.choose}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const chosen = e.target.files?.[0]
            e.target.value = ''
            if (chosen) setFile(chosen)
          }}
        />
      </label>
      {busy && <p role="status">{t.busy}</p>}
      {file && <Styles file={file} onBusy={setBusy} />}
    </main>
  )
}

function Styles({ file, onBusy }: { file: Blob; onBusy: (busy: boolean) => void }) {
  const canvases = useRef(new Map<SketchStyle, HTMLCanvasElement>())

  useEffect(() => {
    let cancelled = false
    onBusy(true)
    void loadPhoto(file)
      .then(async (source) => {
        const rect = cropRect(source.width, source.height, initialCrop(source.width, source.height))
        for (const style of SKETCH_STYLES) {
          await new Promise((resolve) => setTimeout(resolve, 20)) // keep the page responsive
          const canvas = canvases.current.get(style)
          if (cancelled || !canvas) break
          drawCrop(canvas, source, rect, outputSize(rect))
          sketchCanvas(canvas, style)
        }
        releaseCanvas(source)
      })
      .finally(() => onBusy(false))
    return () => {
      cancelled = true
    }
  }, [file, onBusy])

  return (
    <>
      {SKETCH_STYLES.map((style) => (
        <figure key={style} style={{ margin: 0 }}>
          <figcaption>
            <strong>{t.styles[style]}</strong>
          </figcaption>
          <div className="photo__frame photo__frame--still">
            <canvas
              className="photo__view"
              ref={(canvas) => {
                if (canvas) canvases.current.set(style, canvas)
              }}
            />
          </div>
        </figure>
      ))}
    </>
  )
}
