import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BigButton } from './BigButton'
import { ColorBadge } from './ColorBadge'
import { Tile } from './Tile'

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

describe('Tile', () => {
  it('shows the text and can be tapped', async () => {
    const onClick = vi.fn()
    render(<Tile image={<span>plaatje</span>} text="Ga wandelen" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: /Ga wandelen/ }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('tells screen readers when a signal tile is on', () => {
    render(<Tile image={null} text="Ik ben boos" selected />)
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument()
  })

  it('is not a toggle when `selected` is left out', () => {
    render(<Tile image={null} text="Ga wandelen" />)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')
  })
})

describe('BigButton', () => {
  it('calls onClick', async () => {
    const onClick = vi.fn()
    render(<BigButton onClick={onClick}>Klaar</BigButton>)
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
