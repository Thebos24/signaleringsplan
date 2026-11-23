import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BackButton } from './BackButton'
import { Button } from './Button'
import { GuideTile, GuideTileGrid } from './GuideTile'
import { LargeTitle } from './LargeTitle'
import { ListGroup } from './ListGroup'
import { ListRow } from './ListRow'
import { Screen } from './Screen'

describe('Button', () => {
  it('calls onClick and is primary by default', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Klaar</Button>)
    const button = screen.getByRole('button', { name: 'Klaar' })
    expect(button).toHaveClass('button--primary')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has a secondary look and can be disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button variant="secondary" disabled onClick={onClick}>
        Terug
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Terug' })
    expect(button).toHaveClass('button--secondary')
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('BackButton', () => {
  it('shows the label and goes back when tapped', async () => {
    const onClick = vi.fn()
    render(<BackButton label="Terug" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})

describe('LargeTitle', () => {
  it('is the page heading, with an optional caption', () => {
    render(<LargeTitle caption="Tik op een kleur">Plan van Sam</LargeTitle>)
    expect(screen.getByRole('heading', { level: 1, name: 'Plan van Sam' })).toBeInTheDocument()
    expect(screen.getByText('Tik op een kleur')).toBeInTheDocument()
  })
})

describe('ListRow', () => {
  it('tells screen readers whether a circle row is on, and toggles on tap', async () => {
    const onClick = vi.fn()
    const { rerender } = render(
      <ListGroup>
        <ListRow title="Ik ben boos" trailing="circle" selected={false} onClick={onClick} />
      </ListGroup>,
    )
    const row = screen.getByRole('button', { name: /Ik ben boos/ })
    expect(row).toHaveAttribute('aria-pressed', 'false')
    expect(row.querySelector('.select-circle--checked')).toBeNull()
    await userEvent.click(row)
    expect(onClick).toHaveBeenCalledOnce()

    rerender(
      <ListGroup>
        <ListRow title="Ik ben boos" trailing="circle" selected onClick={onClick} />
      </ListGroup>,
    )
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument()
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('a chevron row is a plain button, without pressed state', () => {
    render(
      <ListRow
        title="Oranje"
        subtitle="2 signalen · 3 acties"
        trailing="chevron"
        onClick={() => {}}
      />,
    )
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')
    expect(screen.getByText('2 signalen · 3 acties')).toBeInTheDocument()
  })

  it('a row without onClick is only to look at (no button)', () => {
    render(<ListRow title="Ga wandelen" image={<span>plaatje</span>} />)
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByText('Ga wandelen')).toBeInTheDocument()
  })
})

describe('GuideTile', () => {
  it('shows text and can be tapped; the add tile has a plus', async () => {
    const onClick = vi.fn()
    render(
      <GuideTileGrid>
        <GuideTile image={<img alt="" src="x.svg" />} text="Ga wandelen" onClick={onClick} />
        <GuideTile add text="Toevoegen" onClick={onClick} />
      </GuideTileGrid>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ga wandelen' }))
    await userEvent.click(screen.getByRole('button', { name: /Toevoegen/ }))
    expect(onClick).toHaveBeenCalledTimes(2)
    expect(screen.getByText('+')).toBeInTheDocument()
  })
})

describe('Screen', () => {
  it('puts the bottom bar apart from the content', () => {
    render(<Screen bottomBar={<Button>Klaar</Button>}>inhoud</Screen>)
    expect(screen.getByText('inhoud').closest('.screen__content')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Klaar' }).closest('.bottom-bar')).not.toBeNull()
  })

  it('has no bottom bar when none is given', () => {
    const { container } = render(<Screen>inhoud</Screen>)
    expect(container.querySelector('.bottom-bar')).toBeNull()
  })
})
