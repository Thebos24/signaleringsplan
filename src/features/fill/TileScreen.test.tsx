// The tile screen with a photo (T-2.4, T-2.5): the storage is replaced, because jsdom's Blob cannot be
// stored. The real storage is used in FillMode.test.tsx.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { Tile } from '../../domain/plan'
import { TileScreen } from './TileScreen'

const sketch = new Blob(['sketch'], { type: 'image/jpeg' })

const store = vi.hoisted(() => ({
  addTile: vi.fn(async () => ({})),
  updateTile: vi.fn(async () => {}),
  deleteTile: vi.fn(async () => {}),
  moveTile: vi.fn(async () => {}),
  getPhoto: vi.fn(async () => new Blob(['old'], { type: 'image/jpeg' })),
}))
vi.mock('../../storage/planStore', () => store)

vi.mock('../photo/photoCanvas', () => ({
  loadPhoto: async () =>
    Object.assign(document.createElement('canvas'), { width: 400, height: 300 }),
  drawCrop: () => {},
  cropToSketch: async () => sketch,
  releaseCanvas: () => {},
}))

beforeAll(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})

afterEach(() => vi.clearAllMocks())

const photoTile: Tile = {
  id: 7,
  kind: 'action',
  color: 'green',
  text: 'Thee',
  image: { type: 'photo', photoId: 3 },
  order: 0,
}

function setup(tileId?: number) {
  const onBack = vi.fn()
  const onChanged = vi.fn()
  render(
    <TileScreen
      color="green"
      kind="action"
      tileId={tileId}
      tiles={[photoTile]}
      onChanged={onChanged}
      onBack={onBack}
    />,
  )
  return { onBack, onChanged }
}

describe('TileScreen with a photo', () => {
  it('a tile with a photo keeps it when only the text changes', async () => {
    const { onBack, onChanged } = setup(7)
    await userEvent.type(screen.getByLabelText('Wat staat erop?'), ' drinken')
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    // No new picture: the stored photo stays
    expect(store.updateTile).toHaveBeenCalledWith(7, { text: 'Thee drinken', image: undefined })
    expect(onChanged).toHaveBeenCalled()
    expect(onBack).toHaveBeenCalled()
  })

  it('saves a new photo with the tile', async () => {
    const { onBack } = setup()
    await userEvent.type(screen.getByLabelText('Wat staat erop?'), 'Thee drinken')
    await userEvent.click(screen.getByRole('button', { name: 'Kies een plaatje of foto' }))
    await userEvent.upload(
      screen.getByLabelText('Foto maken of kiezen'),
      new File(['photo'], 'mok.jpg', { type: 'image/jpeg' }),
    )
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik deze foto' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik' }))

    // Back on the tile screen, with the text still there
    expect(screen.getByLabelText('Wat staat erop?')).toHaveValue('Thee drinken')
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(store.addTile).toHaveBeenCalledWith({
      kind: 'action',
      color: 'green',
      text: 'Thee drinken',
      image: { type: 'photo', blob: sketch },
    })
    expect(onBack).toHaveBeenCalled()
  })

  it('stays on the screen and says so when saving fails', async () => {
    store.updateTile.mockRejectedValueOnce(new Error('disk full'))
    const { onBack } = setup(7)
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Het opslaan lukte niet.')
    expect(onBack).not.toHaveBeenCalled()
  })
})
