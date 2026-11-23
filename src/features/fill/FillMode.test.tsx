// The four screens of the filling-in mode (D-035) against the real storage on a fake IndexedDB (D-023).
// Only picto tiles are used here, because jsdom's Blob cannot be stored; the photo path is tested in
// PictureScreen.test.tsx and TileScreen.test.tsx.
import 'fake-indexeddb/auto'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { db } from '../../storage/db'
import { addTile, ensurePlan, getTiles } from '../../storage/planStore'
import { usePlan } from '../plan/usePlan'
import { FillMode } from './FillMode'

// Same wiring as in the app: load the plan, reload after every change
function Harness({
  onClose = () => {},
  onPreview = () => {},
}: {
  onClose?: () => void
  onPreview?: () => void
}) {
  const { data, reload } = usePlan()
  if (!data) return null
  return <FillMode data={data} onChanged={reload} onClose={onClose} onPreview={onPreview} />
}

beforeEach(async () => {
  await db.delete()
  await db.open()
  await ensurePlan()
})

async function addSignal(text: string, picto = 'angry') {
  await addTile({ kind: 'signal', color: 'orange', text, image: { type: 'picto', pictoId: picto } })
}

async function openColor(name: 'Groen' | 'Oranje' | 'Rood') {
  await userEvent.click(await screen.findByRole('button', { name: new RegExp(name) }))
}

describe('Plan screen', () => {
  it('shows the three colours with their numbers', async () => {
    await addSignal('Ik ben boos')
    await addSignal('Ik slaap slecht', 'sleep')
    render(<Harness />)
    expect(await screen.findByRole('button', { name: /Groen.*0 acties/ })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Oranje.*2 signalen · 0 acties/ }),
    ).toBeInTheDocument()
    // The default red action
    expect(screen.getByRole('button', { name: /Rood.*0 signalen · 1 actie/ })).toBeInTheDocument()
  })

  it('explains the app for an empty plan, and not once there are signals', async () => {
    const { unmount } = render(<Harness />)
    expect(await screen.findByText('Vul dit plan samen in.')).toBeInTheDocument()
    unmount()

    await addSignal('Ik ben boos')
    render(<Harness />)
    await screen.findByRole('button', { name: /Oranje/ })
    expect(screen.queryByText('Vul dit plan samen in.')).not.toBeInTheDocument()
  })

  it('"Klaar" closes and "Bekijk als cliënt" opens the preview', async () => {
    const onClose = vi.fn()
    const onPreview = vi.fn()
    render(<Harness onClose={onClose} onPreview={onPreview} />)
    await userEvent.click(await screen.findByRole('button', { name: 'Bekijk als cliënt' }))
    expect(onPreview).toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('changes the name, and cancelling keeps the old one', async () => {
    render(<Harness />)
    expect(await screen.findByRole('heading', { name: 'Plan' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Naam wijzigen' }))
    await userEvent.type(screen.getByLabelText(/Voornaam/), 'Sam')
    await userEvent.click(screen.getByRole('button', { name: 'Annuleren' }))
    expect(screen.getByRole('heading', { name: 'Plan' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Naam wijzigen' }))
    await userEvent.type(screen.getByLabelText(/Voornaam/), 'Sam')
    await userEvent.click(screen.getByRole('button', { name: 'Bewaar' }))
    expect(await screen.findByRole('heading', { name: 'Plan van Sam' })).toBeInTheDocument()
    expect((await db.plan.get('plan'))?.clientName).toBe('Sam')
  })
})

describe('Colour screen', () => {
  it('shows signals and actions for orange, and only actions for green', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await openColor('Oranje')
    expect(await screen.findByRole('heading', { name: 'Signalen' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Acties' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ik ben boos' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    await openColor('Groen')
    expect(await screen.findByRole('heading', { name: 'Acties' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Signalen' })).not.toBeInTheDocument()
  })

  it('shows the default red action', async () => {
    render(<Harness />)
    await openColor('Rood')
    expect(
      await screen.findByRole('button', { name: 'Ik ga naar mijn begeleider' }),
    ).toBeInTheDocument()
  })

  it('hides the add tile when a list is full and says so', async () => {
    for (let i = 1; i <= 6; i++) await addSignal(`Signaal ${i}`)
    render(<Harness />)
    await openColor('Oranje')
    expect(await screen.findByRole('button', { name: 'Signaal 6' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Signaal toevoegen' })).not.toBeInTheDocument()
    expect(screen.getByText('De lijst is vol: er passen er 6.')).toBeInTheDocument()
    // The action list of the same colour is still open
    expect(screen.getByRole('button', { name: 'Actie toevoegen' })).toBeInTheDocument()
  })
})

describe('Tile screen', () => {
  it('adds a signal with text and picture, and saves it', async () => {
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Signaal toevoegen' }))
    expect(screen.getByRole('heading', { name: 'Nieuw signaal' })).toBeInTheDocument()

    // Tapping "Klaar" too early says what is missing, and saves nothing
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Schrijf eerst wat er op de tegel staat.')
    expect(screen.getByLabelText('Wat staat erop?')).toHaveFocus()

    await userEvent.type(screen.getByLabelText('Wat staat erop?'), '  Ik ben   boos ')
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Kies eerst een plaatje of een foto.')
    expect(await getTiles('orange', 'signal')).toEqual([])

    // The picture is chosen on its own screen; the text is still there afterwards
    await userEvent.click(screen.getByRole('button', { name: 'Kies een plaatje of foto' }))
    expect(screen.getByRole('heading', { name: 'Plaatje kiezen' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Boos' }))
    expect(screen.getByLabelText('Wat staat erop?')).toHaveValue('  Ik ben   boos ')
    expect(screen.getByRole('button', { name: 'Ander plaatje of foto' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    // Back on the colour screen, with the new tile
    expect(await screen.findByRole('button', { name: 'Ik ben boos' })).toBeInTheDocument()
    const saved = await getTiles('orange', 'signal')
    expect(saved.map((tile) => tile.text)).toEqual(['Ik ben boos'])
    expect(saved[0].image).toEqual({ type: 'picto', pictoId: 'angry' })
  })

  it('"Terug" from the tile screen saves nothing', async () => {
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Actie toevoegen' }))
    await userEvent.type(screen.getByLabelText('Wat staat erop?'), 'Ga wandelen')
    await userEvent.click(screen.getByRole('button', { name: 'Terug' }))
    expect(await screen.findByRole('heading', { name: 'Acties' })).toBeInTheDocument()
    expect(await getTiles('orange', 'action')).toEqual([])
  })

  it('shows the tile as the client sees it, while typing', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Ik ben boos' }))
    const preview = screen.getByRole('region', { name: 'Zo ziet de cliënt het' })
    expect(within(preview).getByText('Ik ben boos')).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText('Wat staat erop?'), ' soms')
    expect(within(preview).getByText('Ik ben boos soms')).toBeInTheDocument()
  })

  it('changes the text of a tile and keeps its picture', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Ik ben boos' }))
    expect(screen.getByRole('heading', { name: 'Signaal wijzigen' })).toBeInTheDocument()
    const input = screen.getByLabelText('Wat staat erop?')
    await userEvent.clear(input)
    await userEvent.type(input, 'Ik ben verdrietig')
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))

    expect(await screen.findByRole('button', { name: 'Ik ben verdrietig' })).toBeInTheDocument()
    const [saved] = await getTiles('orange', 'signal')
    expect(saved.text).toBe('Ik ben verdrietig')
    expect(saved.image).toEqual({ type: 'picto', pictoId: 'angry' })
  })

  it('changes the picture of a tile', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Ik ben boos' }))
    await userEvent.click(screen.getByRole('button', { name: 'Ander plaatje of foto' }))
    await userEvent.type(screen.getByRole('searchbox', { name: 'Zoek een plaatje' }), 'verdriet')
    await userEvent.click(screen.getByRole('button', { name: 'Verdrietig' }))
    await userEvent.click(screen.getByRole('button', { name: 'Klaar' }))
    await screen.findByRole('heading', { name: 'Signalen' })
    const [saved] = await getTiles('orange', 'signal')
    expect(saved.image).toEqual({ type: 'picto', pictoId: 'sad' })
  })

  it('asks "Weet je het zeker?" before removing, and "Nee" keeps the tile', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Ik ben boos' }))

    await userEvent.click(screen.getByRole('button', { name: 'Verwijderen' }))
    expect(screen.getByText('Weet je het zeker?')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Nee' }))
    expect(screen.queryByText('Weet je het zeker?')).not.toBeInTheDocument()
    expect(await getTiles('orange', 'signal')).toHaveLength(1)

    await userEvent.click(screen.getByRole('button', { name: 'Verwijderen' }))
    await userEvent.click(screen.getByRole('button', { name: 'Ja, verwijderen' }))
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Ik ben boos' })).not.toBeInTheDocument(),
    )
    expect(await screen.findByRole('heading', { name: 'Signalen' })).toBeInTheDocument()
    expect(await getTiles('orange', 'signal')).toHaveLength(0)
  })

  it('moves a tile earlier and later, and disables the arrows at the ends', async () => {
    await addSignal('Eerste')
    await addSignal('Tweede')
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Eerste' }))

    expect(screen.getByRole('button', { name: '← Eerder' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Later →' }))
    await waitFor(async () =>
      expect((await getTiles('orange', 'signal')).map((x) => x.text)).toEqual(['Tweede', 'Eerste']),
    )
    // Now it is last: "Later" is off and "Eerder" is on
    await waitFor(() => expect(screen.getByRole('button', { name: 'Later →' })).toBeDisabled())
    expect(screen.getByRole('button', { name: '← Eerder' })).toBeEnabled()

    await userEvent.click(screen.getByRole('button', { name: '← Eerder' }))
    await waitFor(async () =>
      expect((await getTiles('orange', 'signal')).map((x) => x.text)).toEqual(['Eerste', 'Tweede']),
    )
  })

  it('a new tile has no arrows for the order and no "Verwijderen"', async () => {
    render(<Harness />)
    await openColor('Oranje')
    await userEvent.click(await screen.findByRole('button', { name: 'Actie toevoegen' }))
    expect(screen.queryByRole('button', { name: 'Later →' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Verwijderen' })).not.toBeInTheDocument()
  })
})
