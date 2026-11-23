import type { ReactNode } from 'react'
import './apple.css'

// The big heading top left of a screen (34 px, bold). `caption` is the small grey line under it.
export function LargeTitle({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <header className="large-title">
      <h1 className="large-title__text">{children}</h1>
      {caption && <p className="large-title__caption">{caption}</p>}
    </header>
  )
}
