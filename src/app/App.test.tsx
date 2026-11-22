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
