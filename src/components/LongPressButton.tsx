import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react'
import { nl } from '../text/nl'
import './components.css'

// Zie D-006: hold for 3 seconds (a ring fills up) to open the filling-in mode.
// A short tap only shows a hint. Letting go or sliding away cancels.
const LONG_PRESS_MS = 3000
const HINT_MS = 2500

interface LongPressButtonProps {
  onComplete: () => void
  children: ReactNode
  durationMs?: number
}

export function LongPressButton({
  onComplete,
  children,
  durationMs = LONG_PRESS_MS,
}: LongPressButtonProps) {
  const [pressing, setPressing] = useState(false)
  const [hint, setHint] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(
    () => () => {
      clearTimeout(timer.current)
      clearTimeout(hintTimer.current)
    },
    [],
  )

  function start() {
    if (timer.current !== undefined) return // already pressing (e.g. key repeat)
    setPressing(true)
    setHint(false)
    timer.current = setTimeout(() => {
      timer.current = undefined
      setPressing(false)
      onComplete()
    }, durationMs)
  }

  // Let go, slid away, or interrupted: back to rest. A press that ends early shows the hint.
  function cancel() {
    if (timer.current === undefined) return
    clearTimeout(timer.current)
    timer.current = undefined
    setPressing(false)
    setHint(true)
    clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => setHint(false), HINT_MS)
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    // Touch captures the pointer by default, so "sliding away" would never be noticed
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    start()
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      start()
    }
  }

  function onKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') cancel()
  }

  return (
    <span className="long-press">
      <button
        type="button"
        className={`long-press__button${pressing ? ' long-press__button--pressing' : ''}`}
        aria-label={nl.longPress.label}
        style={{ '--long-press-ms': `${durationMs}ms` } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={cancel}
        onContextMenu={(e) => e.preventDefault()}
      >
        <svg
          className="long-press__ring"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="long-press__track" cx="50" cy="50" r="44" />
          <circle className="long-press__fill" cx="50" cy="50" r="44" pathLength="100" />
        </svg>
        <span className="long-press__content">{children}</span>
      </button>
      <span className="long-press__hint" role="status">
        {hint ? nl.longPress.hint : ''}
      </span>
    </span>
  )
}
