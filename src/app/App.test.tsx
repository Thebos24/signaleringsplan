import { render, screen } from '@testing-library/react'
import { App } from './App'

// jsdom has no IndexedDB; the proof storage is replaced by empty fakes.
vi.mock('../storage/proofDb', () => ({
  loadNote: vi.fn(async () => undefined),
  loadPhoto: vi.fn(async () => undefined),
  saveNote: vi.fn(async () => undefined),
  savePhoto: vi.fn(async () => undefined),
}))

describe('App', () => {
  it('shows the proof screen', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Proef: blijft alles staan?' })).toBeInTheDocument()
    // jsdom has no navigator.storage.persist
    expect(await screen.findByText('weet niet (niet ondersteund)')).toBeInTheDocument()
  })
})
