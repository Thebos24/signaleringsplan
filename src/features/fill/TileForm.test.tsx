// The photo path of the tile form (T-2.4, T-2.5). jsdom has no canvas, so the canvas part is replaced;
// the crop maths and the sketch are tested in src/domain/crop.test.ts and sketch.test.ts.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { Tile } from '../../domain/plan'
import { TileForm } from './TileForm'

const cropped = new Blob(['sketch'], { type: 'image/jpeg' })

vi.mock('../photo/photoCanvas', () => ({
  loadPhoto: async () =>
    Object.assign(document.createElement('canvas'), { width: 400, height: 300 }),
  drawCrop: () => {},
  cropToSketch: async () => cropped,
  releaseCanvas: () => {},
}))

vi.mock('../../storage/planStore', () => ({
  getPhoto: async () => new Blob(['old'], { type: 'image/jpeg' }),
}))

beforeAll(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})

const photoFile = new File(['photo'], 'mok.jpg', { type: 'image/jpeg' })

function setup(tile?: Tile) {
  const onSave = vi.fn(async () => {})
  render(<TileForm kind="action" tile={tile} onSave={onSave} onCancel={() => {}} />)
  return onSave
}

describe('TileForm with a photo', () => {
  it('crops a chosen photo and saves it as the picture', async () => {
    const onSave = setup()
    await userEvent.type(screen.getByLabelText('Wat staat er op de tegel?'), 'Thee drinken')
    await userEvent.upload(screen.getByLabelText('Maak of kies een foto'), photoFile)

    // The cropper is shown instead of the pictograms and the form buttons
    expect(await screen.findByText(/Schuif de foto/)).toBeInTheDocument()
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Bewaar' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Gebruik deze foto' }))

    // Then the sketch is shown, with "Gebruik" and "Opnieuw"
    expect(await screen.findByRole('img', { name: 'De foto als tekening' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Gebruik' }))
    expect(screen.getByText('Deze foto komt op de tegel.')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Bewaar' }))
    expect(onSave).toHaveBeenCalledWith('Thee drinken', { type: 'photo', blob: cropped })
  })

  it('"Opnieuw" goes back to the frame to choose another part', async () => {
    const onSave = setup()
    await userEvent.upload(screen.getByLabelText('Maak of kies een foto'), photoFile)
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik deze foto' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Opnieuw' }))
    expect(screen.getByText(/Schuif de foto/)).toBeInTheDocument()
    expect(screen.queryByText('Deze foto komt op de tegel.')).not.toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
  })

  it('cancelling the cropper keeps the form as it was', async () => {
    const onSave = setup()
    await userEvent.upload(screen.getByLabelText('Maak of kies een foto'), photoFile)
    await userEvent.click(await screen.findByRole('button', { name: 'Annuleren' }))
    expect(screen.getAllByRole('radio').length).toBeGreaterThan(0)
    expect(screen.queryByText('Deze foto komt op de tegel.')).not.toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
  })

  it('choosing a pictogram after a photo uses the pictogram', async () => {
    const onSave = setup()
    await userEvent.type(screen.getByLabelText('Wat staat er op de tegel?'), 'Wandelen')
    await userEvent.upload(screen.getByLabelText('Maak of kies een foto'), photoFile)
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik deze foto' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik' }))
    await userEvent.click(screen.getByRole('radio', { name: 'Wandelen' }))
    expect(screen.queryByText('Deze foto komt op de tegel.')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Bewaar' }))
    expect(onSave).toHaveBeenCalledWith('Wandelen', { type: 'picto', pictoId: 'walk' })
  })

  it('a tile with a photo keeps it when only the text changes', async () => {
    const tile: Tile = {
      id: 7,
      kind: 'action',
      color: 'green',
      text: 'Thee',
      image: { type: 'photo', photoId: 3 },
      order: 0,
    }
    const onSave = setup(tile)
    expect(screen.getByText('Deze foto komt op de tegel.')).toBeInTheDocument()
    expect(screen.getByLabelText('Andere foto')).toBeInTheDocument()

    await userEvent.type(screen.getByLabelText('Wat staat er op de tegel?'), ' drinken')
    await userEvent.click(screen.getByRole('button', { name: 'Bewaar' }))
    expect(onSave).toHaveBeenCalledWith('Thee drinken', undefined)
  })
})
