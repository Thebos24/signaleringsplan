import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Plan, Tile } from '../domain/plan'
import { App } from './App'

// jsdom has no IndexedDB: the plan storage is replaced by fakes.
const store = vi.hoisted(() => ({
  plan: { id: 'plan', createdAt: 0, updatedAt: 0 } as Plan,
  tiles: [] as Tile[],
}))
vi.mock('../storage/planStore', () => ({
  ensurePlan: vi.fn(async () => store.plan),
  getAllTiles: vi.fn(async () => store.tiles),
  setClientName: vi.fn(async (name: string) => {
    store.plan = { ...store.plan, clientName: name || undefined }
  }),
}))
vi.mock('../storage/proofDb', () => ({
  loadNote: vi.fn(async () => undefined),
  loadPhoto: vi.fn(async () => undefined),
  saveNote: vi.fn(async () => undefined),
  savePhoto: vi.fn(async () => undefined),
}))

const signal: Tile = {
  id: 1,
  kind: 'signal',
  color: 'orange',
  text: 'Ik ben boos',
  image: { type: 'picto', pictoId: 'angry' },
  order: 1,
}

afterEach(() => {
  vi.useRealTimers()
  window.location.hash = ''
  store.plan = { id: 'plan', createdAt: 0, updatedAt: 0 }
  store.tiles = []
})

async function holdFillButton() {
  const button = await screen.findByRole('button', { name: 'Invullen voor de begeleider' })
  vi.useFakeTimers()
  fireEvent.pointerDown(button)
  await act(async () => void vi.advanceTimersByTime(3100))
  vi.useRealTimers()
}

describe('App', () => {
  it('opens on the start screen', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { name: 'Hoi, wat merk je?' })).toBeInTheDocument()
  })

  it('shows the signals, "Het gaat goed" and "Klaar"; tapping signals gives the colour', async () => {
    store.tiles = [
      signal,
      { ...signal, id: 2, color: 'red', text: 'Ik wil schreeuwen', order: 2 },
      { ...signal, id: 3, kind: 'action', color: 'red', text: 'Ga wandelen', order: 3 },
    ]
    render(<App />)
    const boos = await screen.findByRole('button', { name: 'Ik ben boos' })
    expect(screen.getByRole('button', { name: 'Het gaat goed' })).toBeInTheDocument()
    // actions are not shown on the start screen
    expect(screen.queryByRole('button', { name: 'Ga wandelen' })).not.toBeInTheDocument()
    await userEvent.click(boos)
    expect(boos).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(boos)
    expect(boos).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(boos)
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(await screen.findByRole('heading', { name: 'Je bent op Oranje.' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    // back on the start screen the tapped signals are gone
    expect(await screen.findByRole('button', { name: 'Ik ben boos' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('"Het gaat goed" goes straight to green, and a red signal wins', async () => {
    store.tiles = [{ ...signal, id: 2, color: 'red', text: 'Ik wil schreeuwen' }, signal]
    render(<App />)
    await userEvent.click(await screen.findByRole('button', { name: 'Het gaat goed' }))
    expect(await screen.findByRole('heading', { name: 'Het gaat goed!' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Ik ben boos' }))
    await userEvent.click(screen.getByRole('button', { name: 'Ik wil schreeuwen' }))
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(await screen.findByRole('heading', { name: 'Je bent op Rood.' })).toBeInTheDocument()
  })

  it('greets the client by name', async () => {
    store.plan = { ...store.plan, clientName: 'Sam' }
    render(<App />)
    expect(
      await screen.findByRole('heading', { name: 'Hoi Sam, wat merk je?' }),
    ).toBeInTheDocument()
  })

  it('opens the welcome screen after holding the button, with an empty plan', async () => {
    render(<App />)
    await holdFillButton()
    expect(await screen.findByRole('heading', { name: 'Welkom' })).toBeInTheDocument()
    expect(screen.getByText('Vul dit plan samen in.')).toBeInTheDocument()
  })

  it('saves the name, then shows the filling-in screen, and "Klaar" goes back to the start', async () => {
    render(<App />)
    await holdFillButton()
    await userEvent.type(await screen.findByLabelText(/Voornaam/), 'Sam')
    await userEvent.click(screen.getByRole('button', { name: 'Verder' }))
    expect(await screen.findByRole('heading', { name: 'Plan invullen' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(
      await screen.findByRole('heading', { name: 'Hoi Sam, wat merk je?' }),
    ).toBeInTheDocument()
  })

  it('skips the welcome screen when the plan already has signals', async () => {
    store.tiles = [signal]
    render(<App />)
    await holdFillButton()
    expect(await screen.findByRole('heading', { name: 'Plan invullen' })).toBeInTheDocument()
  })

  it('still shows the proof screen on #proef', async () => {
    window.location.hash = '#proef'
    render(<App />)
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Proef: blijft alles staan?' }),
      ).toBeInTheDocument(),
    )
  })
})
