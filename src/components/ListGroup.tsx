import type { ReactNode } from 'react'
import './apple.css'

// A white rounded card with rows (ListRow) separated by thin lines.
export function ListGroup({ children }: { children: ReactNode }) {
  return <div className="list-group">{children}</div>
}
