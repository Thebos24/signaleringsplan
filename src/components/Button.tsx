import type { ReactNode } from 'react'
import './apple.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  // 'primary' is the one main button of a screen (dark); 'secondary' is the quiet grey one
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  // For buttons whose visible text is short, like an arrow
  'aria-label'?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
