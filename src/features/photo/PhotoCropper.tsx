import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { BigButton } from '../../components/BigButton'
import {
  MAX_ZOOM,
  MIN_ZOOM,
  cropRect,
  initialCrop,
  panCrop,
  zoomCrop,
  type Crop,
} from '../../domain/crop'
import { nl } from '../../text/nl'
import { DEFAULT_SKETCH_STYLE } from '../../domain/sketch'
import { cropToSketch, drawCrop, loadPhoto, releaseCanvas } from './photoCanvas'
import { SketchPreview } from './SketchPreview'
import './photo.css'

const t = nl.photo

// Make a photo square: drag to move it, pinch or use the slider to zoom (T-2.4, D-029).
// Then the square becomes a sketch, shown with "Gebruik" / "Opnieuw" (T-2.5, D-010).
// `onUse` gets the stored sketch (max 1024 px). The original file is not kept.
export function PhotoCropper({
  file,
  onUse,
  onCancel,
}: {
  file: Blob
  onUse: (blob: Blob) => void
  onCancel: () => void
}) {
  const [source, setSource] = useState<HTMLCanvasElement>()
  const [failed, setFailed] = useState(false)
  const [crop, setCrop] = useState<Crop>()
  const [busy, setBusy] = useState(false)
  const [sketched, setSketched] = useState<Blob>()
  const frame = useRef<HTMLDivElement>(null)
  const view = useRef<HTMLCanvasElement>(null)
  // Fingers (or the mouse) on the frame, by pointer id: their last position
  const pointers = useRef(new Map<number, { x: number; y: number }>())

  // Read the photo once; free the memory when the cropper closes
  useEffect(() => {
    let cancelled = false
    let loaded: HTMLCanvasElement | undefined
    loadPhoto(file).then(
      (canvas) => {
        if (cancelled) return releaseCanvas(canvas)
        loaded = canvas
        setSource(canvas)
        setCrop(initialCrop(canvas.width, canvas.height))
      },
      () => !cancelled && setFailed(true),
    )
    return () => {
      cancelled = true
      if (loaded) releaseCanvas(loaded)
    }
  }, [file])

  // Draw what the frame shows, sharp on the phone's screen
  useEffect(() => {
    if (!source || !crop || !view.current || !frame.current) return
    const pixels = Math.round(frame.current.clientWidth * (window.devicePixelRatio || 1))
    drawCrop(view.current, source, cropRect(source.width, source.height, crop), pixels)
  }, [source, crop])

  if (failed) {
    return (
      <div className="photo">
        <p role="alert">{t.failed}</p>
        <BigButton variant="quiet" onClick={onCancel}>
          {nl.fill.cancel}
        </BigButton>
      </div>
    )
  }
  if (!source || !crop) return <p className="photo">{t.loading}</p>
  if (sketched) {
    return (
      <SketchPreview
        blob={sketched}
        onUse={() => onUse(sketched)}
        // "Opnieuw" goes back to the frame, with the same part of the photo chosen
        onAgain={() => setSketched(undefined)}
      />
    )
  }

  const { width, height } = source
  const frameSize = () => frame.current?.clientWidth || 1

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const last = pointers.current.get(e.pointerId)
    if (!last || !crop) return
    const now = { x: e.clientX, y: e.clientY }
    const others = [...pointers.current].filter(([id]) => id !== e.pointerId)

    if (others.length === 0) {
      // One finger: move the photo
      setCrop(panCrop(width, height, crop, now.x - last.x, now.y - last.y, frameSize()))
    } else {
      // Two fingers: spreading them zooms in, pinching zooms out
      const other = others[0][1]
      const before = Math.hypot(last.x - other.x, last.y - other.y)
      const after = Math.hypot(now.x - other.x, now.y - other.y)
      if (before > 0) setCrop(zoomCrop(width, height, crop, crop.zoom * (after / before)))
    }
    pointers.current.set(e.pointerId, now)
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId)
  }

  async function use() {
    if (!source || !crop) return
    setBusy(true)
    try {
      // Let the phone show "De tekening wordt gemaakt…" before the (heavy) sketch starts
      await new Promise((resolve) => setTimeout(resolve, 50))
      setSketched(await cropToSketch(source, cropRect(width, height, crop), DEFAULT_SKETCH_STYLE))
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="photo">
      <p className="photo__hint">{t.hint}</p>
      <div
        ref={frame}
        className="photo__frame"
        role="img"
        aria-label={t.frameLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas ref={view} className="photo__view" />
      </div>
      <label className="photo__zoom">
        {t.zoomLabel}
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.01}
          value={crop.zoom}
          onChange={(e) => setCrop(zoomCrop(width, height, crop, Number(e.target.value)))}
        />
      </label>
      {busy && <p role="status">{t.sketching}</p>}
      <div className="fill__actions">
        <BigButton onClick={() => void use()} disabled={busy}>
          {t.use}
        </BigButton>
        <BigButton variant="quiet" onClick={onCancel} disabled={busy}>
          {nl.fill.cancel}
        </BigButton>
      </div>
    </div>
  )
}
