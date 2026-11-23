import type { ReactNode } from 'react'
import './apple.css'

// One screen: page margins, content on top, an optional fixed bar at the bottom (D-036).
// Use `bottomBar` for the main button(s); it stays in view while the content scrolls.
export function Screen({ children, bottomBar }: { children: ReactNode; bottomBar?: ReactNode }) {
  return (
    <div className="screen">
      <div className="screen__content">{children}</div>
      {bottomBar && <div className="bottom-bar">{bottomBar}</div>}
    </div>
  )
}
