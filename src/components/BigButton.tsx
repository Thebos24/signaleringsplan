import type { ReactNode } from 'react'
import './components.css'

interface BigButtonProps {
  children: ReactNode
  onClick?: () => void
  // 'quiet' is the rustig grey button for the filling-in mode
  variant?: 'primary' | 'quiet'
  disabled?: boolean
}

export function BigButton({ children, onClick, variant = 'primary', disabled }: BigButtonProps) {
  return (
    <button
      type="button"
      className={`big-button big-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
