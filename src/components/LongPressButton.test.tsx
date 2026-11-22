import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LongPressButton } from './LongPressButton'

function setup() {
  const onComplete = vi.fn()
  render(<LongPressButton onComplete={onComplete}>⚙</LongPressButton>)
  return { onComplete, button: screen.getByRole('button', { name: 'Invullen voor de begeleider' }) }
}
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('LongPressButton', () => {
  it('completes after 3 seconds of holding', () => {
    const { onComplete, button } = setup()
    fireEvent.pointerDown(button)
    wait(2900)
    expect(onComplete).not.toHaveBeenCalled()
    wait(200)
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('does nothing when let go early, and shows the hint', () => {
    const { onComplete, button } = setup()
    fireEvent.pointerDown(button)
    wait(1000)
    fireEvent.pointerUp(button)
    wait(5000)
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('shows the hint after a short tap, and hides it again later', () => {
    const { button } = setup()
    fireEvent.pointerDown(button)
    fireEvent.pointerUp(button)
    expect(screen.getByText('Houd ingedrukt om te wijzigen')).toBeInTheDocument()
    wait(3000)
    expect(screen.queryByText('Houd ingedrukt om te wijzigen')).toBeNull()
  })

  it('cancels when the finger slides away or the touch is interrupted', () => {
    const { onComplete, button } = setup()
    fireEvent.pointerDown(button)
    wait(1000)
    fireEvent.pointerLeave(button)
    wait(5000)
    fireEvent.pointerDown(button)
    wait(1000)
    fireEvent.pointerCancel(button)
    wait(5000)
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('can be held with the keyboard (Enter or space)', () => {
    const { onComplete, button } = setup()
    fireEvent.keyDown(button, { key: 'Enter' })
    fireEvent.keyDown(button, { key: 'Enter', repeat: true })
    wait(3100)
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('cancels a keyboard hold when the key is released', () => {
    const { onComplete, button } = setup()
    fireEvent.keyDown(button, { key: ' ' })
    wait(1000)
    fireEvent.keyUp(button, { key: ' ' })
    wait(5000)
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('starts over after a cancel (the ring does not keep old progress)', () => {
    const { onComplete, button } = setup()
    fireEvent.pointerDown(button)
    wait(2000)
    fireEvent.pointerUp(button)
    fireEvent.pointerDown(button)
    wait(2000)
    expect(onComplete).not.toHaveBeenCalled()
    wait(1100)
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
