// Runs against the real storage on a fake IndexedDB (D-023). Only picto tiles are used here,
// because jsdom's Blob cannot be stored.
import 'fake-indexeddb/auto'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { db } from '../../storage/db'
import { addTile, ensurePlan, getTiles } from '../../storage/planStore'
import { Editor } from './Editor'
import { usePlan } from '../plan/usePlan'

// Same wiring as in the app: load the plan, reload after every change
function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const { data, reload } = usePlan()
  if (!data) return null
  return <Editor data={data} onChanged={reload} onClose={onClose} />
}

beforeEach(async () => {
  await db.delete()
  await db.open()
  await ensurePlan()
})

async function addSignal(text: string, picto = 'angry') {
  await addTile({ kind: 'signal', color: 'orange', text, image: { type: 'picto', pictoId: picto } })
}

describe('Editor', () => {
  it('starts on orange, with signals and actions, and shows only actions on green', async () => {
    render(<Harness />)
    expect(await screen.findByRole('heading', { name: 'Signalen' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Acties' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Groen/ }))
    expect(screen.queryByRole('heading', { name: 'Signalen' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Acties' })).toBeInTheDocument()
  })

  it('shows the default red action on the red tab', async () => {
    render(<Harness />)
    await userEvent.click(await screen.findByRole('button', { name: /Rood/ }))
    expect(await screen.findByText('Ik ga naar mijn begeleider')).toBeInTheDocument()
  })

  it('adds a signal with text and picture, and saves it', async () => {
    render(<Harness />)
    await userEvent.click(await screen.findByRole('button', { name: /Nieuw signaal/ }))
    const save = screen.getByRole('button', { name: 'Bewaar' })
    expect(save).toBeDisabled() // no text and no picture yet

    await userEvent.type(screen.getByLabelText('Wat staat er op de tegel?'), '  Ik ben boos ')
    expect(save).toBeDisabled() // still no picture
    await userEvent.click(screen.getByRole('radio', { name: 'Boos' }))
    await userEvent.click(save)

    expect(await screen.findByText('Ik ben boos')).toBeInTheDocument()
    const saved = await getTiles('orange', 'signal')
    expect(saved.map((t) => t.text)).toEqual(['Ik ben boos'])
    expect(saved[0].image).toEqual({ type: 'picto', pictoId: 'angry' })
  })

  it('changes the text of a tile', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await userEvent.click(await screen.findByRole('button', { name: 'Wijzig: Ik ben boos' }))
    const input = screen.getByLabelText('Wat staat er op de tegel?')
    await userEvent.clear(input)
    await userEvent.type(input, 'Ik ben verdrietig')
    await userEvent.click(screen.getByRole('button', { name: 'Bewaar' }))

    expect(await screen.findByText('Ik ben verdrietig')).toBeInTheDocument()
    expect((await getTiles('orange', 'signal')).map((t) => t.text)).toEqual(['Ik ben verdrietig'])
  })

  it('asks "Weet je het zeker?" before removing, and "Nee" keeps the tile', async () => {
    await addSignal('Ik ben boos')
    render(<Harness />)
    await userEvent.click(await screen.findByRole('button', { name: 'Verwijder: Ik ben boos' }))
    expect(screen.getByText('Weet je het zeker?')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Nee' }))
    expect(screen.getByText('Ik ben boos')).toBeInTheDocument()
    expect(await getTiles('orange', 'signal')).toHaveLength(1)

    await userEvent.click(screen.getByRole('button', { name: 'Verwijder: Ik ben boos' }))
    await userEvent.click(screen.getByRole('button', { name: 'Ja, verwijderen' }))
    await waitFor(() => expect(screen.queryByText('Ik ben boos')).not.toBeInTheDocument())
    expect(await getTiles('orange', 'signal')).toHaveLength(0)
  })

  it('moves a tile down and up', async () => {
    await addSignal('Eerste')
    await addSignal('Tweede')
    render(<Harness />)
    const items = async () =>
      (await screen.findAllByRole('listitem')).map(
        (li) => within(li).queryByText(/Eerste|Tweede/)?.textContent,
      )

    expect(await screen.findByRole('button', { name: 'Omhoog: Eerste' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Omlaag: Tweede' })).toBeDisabled()

    await userEvent.click(await screen.findByRole('button', { name: 'Omlaag: Eerste' }))
    await waitFor(async () =>
      expect((await getTiles('orange', 'signal')).map((t) => t.text)).toEqual(['Tweede', 'Eerste']),
    )
    await waitFor(async () => expect((await items()).filter(Boolean)).toEqual(['Tweede', 'Eerste']))

    await userEvent.click(screen.getByRole('button', { name: 'Omhoog: Eerste' }))
    await waitFor(async () => expect((await items()).filter(Boolean)).toEqual(['Eerste', 'Tweede']))
  })

  it('hides the add button when the list is full and says so', async () => {
    for (let i = 1; i <= 6; i++) await addSignal(`Signaal ${i}`)
    render(<Harness />)
    expect(await screen.findByText('Signaal 6')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Nieuw signaal/ })).not.toBeInTheDocument()
    expect(screen.getByText('De lijst is vol: er passen er 6.')).toBeInTheDocument()
    // the action list of the same colour is still open
    expect(screen.getByRole('button', { name: /Nieuwe actie/ })).toBeInTheDocument()
  })

  it('"Klaar" closes the editor', async () => {
    const onClose = vi.fn()
    render(<Harness onClose={onClose} />)
    await userEvent.click(await screen.findByRole('button', { name: 'Klaar' }))
    expect(onClose).toHaveBeenCalled()
  })
})
