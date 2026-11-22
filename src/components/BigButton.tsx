import type { ReactNode } from 'react'
import './components.css'

interface BigButtonProps {
  children: ReactNode
  onClick?: () => void
  // 'quiet' is the rustig grey button for the filling-in mode
  variant?: 'primary' | 'quiet'
  disabled?: boolean
  // For buttons whose visible text is short, like an arrow
  'aria-label'?: string
}

export function BigButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  'aria-label': ariaLabel,
}: BigButtonProps) {
  return (
    <button
      type="button"
      className={`big-button big-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
