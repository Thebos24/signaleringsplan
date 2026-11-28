import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Tile } from '../../domain/plan'
import { ResultScreen } from './ResultScreen'

const action = (id: number, color: Tile['color'], order: number, text: string): Tile =>
  ({
    id,
    kind: 'action',
    color,
    order,
    text,
    image: { type: 'picto', pictoId: 'walk' },
  }) as Tile

const tiles = [
  action(1, 'red', 1, 'Ik ga naar mijn begeleider'),
  action(2, 'red', 2, 'Ik bel iemand'),
  action(3, 'orange', 1, 'Ga wandelen'),
]

describe('ResultScreen', () => {
  it('shows the first red action as the extra large tile and the rest as rows', () => {
    render(<ResultScreen color="red" tiles={tiles} onBack={() => {}} />)
    expect(screen.getByTestId('main-action')).toHaveTextContent('Ik ga naar mijn begeleider')
    expect(screen.getByText('Ik bel iemand')).toBeInTheDocument()
    expect(screen.queryByText('Ga wandelen')).not.toBeInTheDocument()
  })

  it('has no extra large tile on orange', () => {
    render(<ResultScreen color="orange" tiles={tiles} onBack={() => {}} />)
    expect(screen.queryByTestId('main-action')).not.toBeInTheDocument()
    expect(screen.getByText('Ga wandelen')).toBeInTheDocument()
  })
})
