import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import { ColorBadge } from './ColorBadge'

describe('ColorBadge', () => {
  it.each([
    ['green', 'Groen'],
    ['orange', 'Oranje'],
    ['red', 'Rood'],
  ] as const)('shows the word and a symbol for %s', (color, word) => {
    const { container } = render(<ColorBadge color={color} />)
    expect(screen.getByText(word)).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeNull()
  })
})

describe('Button', () => {
  it('calls onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Klaar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
