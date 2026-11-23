// Choosing a picture (T-2.3) and the photo path (T-2.4, T-2.5). jsdom has no canvas, so the canvas part is
// replaced; the crop maths and the sketch are tested in src/domain/crop.test.ts and sketch.test.ts.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { PictureScreen } from './PictureScreen'

const sketch = new Blob(['sketch'], { type: 'image/jpeg' })

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

const photoFile = new File(['photo'], 'mok.jpg', { type: 'image/jpeg' })

function setup() {
  const onPick = vi.fn()
  const onBack = vi.fn()
  render(<PictureScreen onPick={onPick} onBack={onBack} />)
  return { onPick, onBack }
}

describe('PictureScreen', () => {
  it('picks a pictogram', async () => {
    const { onPick } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Wandelen' }))
    expect(onPick).toHaveBeenCalledWith({ type: 'picto', pictoId: 'walk' })
  })

  it('searches on the words of a pictogram and says when nothing is found', async () => {
    setup()
    const search = screen.getByRole('searchbox', { name: 'Zoek een plaatje' })
    await userEvent.type(search, 'bed')
    expect(screen.getByRole('button', { name: 'Slapen' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Wandelen' })).not.toBeInTheDocument()

    await userEvent.clear(search)
    await userEvent.type(search, 'xyzxyz')
    expect(screen.getByText('Niets gevonden. Probeer een ander woord.')).toBeInTheDocument()
  })

  it('"Terug" goes back without a choice', async () => {
    const { onPick, onBack } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    expect(onBack).toHaveBeenCalled()
    expect(onPick).not.toHaveBeenCalled()
  })

  it('crops a chosen photo, shows the sketch and picks it with "Gebruik"', async () => {
    const { onPick } = setup()
    await userEvent.upload(screen.getByLabelText('Foto maken of kiezen'), photoFile)

    // The cropper is shown instead of the pictograms
    expect(await screen.findByText(/Schuif de foto/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Wandelen' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Gebruik deze foto' }))

    // Then the sketch is shown, with "Gebruik" and "Opnieuw"
    expect(await screen.findByRole('img', { name: 'De foto als tekening' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Gebruik' }))
    expect(onPick).toHaveBeenCalledWith({ type: 'photo', blob: sketch })
  })

  it('"Opnieuw" goes back to the frame to choose another part', async () => {
    const { onPick } = setup()
    await userEvent.upload(screen.getByLabelText('Foto maken of kiezen'), photoFile)
    await userEvent.click(await screen.findByRole('button', { name: 'Gebruik deze foto' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Opnieuw' }))
    expect(screen.getByText(/Schuif de foto/)).toBeInTheDocument()
    expect(onPick).not.toHaveBeenCalled()
  })

  it('cancelling the cropper goes back to the pictograms', async () => {
    const { onPick } = setup()
    await userEvent.upload(screen.getByLabelText('Foto maken of kiezen'), photoFile)
    await userEvent.click(await screen.findByRole('button', { name: 'Annuleren' }))
    expect(screen.getByRole('button', { name: 'Wandelen' })).toBeInTheDocument()
    expect(onPick).not.toHaveBeenCalled()
  })
})
