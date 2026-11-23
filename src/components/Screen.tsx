import { useEffect, type ReactNode } from 'react'
import './apple.css'

// One screen: page margins, content on top, an optional fixed bar at the bottom (D-036).
// Use `bottomBar` for the main button(s); it stays in view while the content scrolls.
// A new screen opens at the top, also when the previous one was scrolled down.
export function Screen({ children, bottomBar }: { children: ReactNode; bottomBar?: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="screen">
      <div className="screen__content">{children}</div>
      {bottomBar && <div className="bottom-bar">{bottomBar}</div>}
    </div>
  )
}
