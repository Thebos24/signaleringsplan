import { describe, expect, it } from 'vitest'
import { determineColor } from './determineColor'
import type { Color, TileKind } from './plan'

const signal = (color: Color) => ({ kind: 'signal' as TileKind, color })

describe('determineColor', () => {
  it('is green when nothing is tapped', () => {
    expect(determineColor([])).toBe('green')
  })

  it('is orange for one orange signal', () => {
    expect(determineColor([signal('orange')])).toBe('orange')
  })

  it('is orange for many orange signals (no "twee oranje = rood")', () => {
    expect(determineColor([signal('orange'), signal('orange'), signal('orange')])).toBe('orange')
  })

  it('is red for one red signal', () => {
    expect(determineColor([signal('red')])).toBe('red')
  })

  it('is red when red and orange are mixed, in any order', () => {
    expect(determineColor([signal('orange'), signal('red')])).toBe('red')
    expect(determineColor([signal('red'), signal('orange')])).toBe('red')
  })

  it('ignores green signals and actions', () => {
    expect(determineColor([signal('green')])).toBe('green')
    expect(determineColor([{ kind: 'action', color: 'red' }])).toBe('green')
    expect(determineColor([{ kind: 'action', color: 'red' }, signal('orange')])).toBe('orange')
  })

  it('does not change the list it is given', () => {
    const tapped = [signal('red'), signal('orange')]
    determineColor(tapped)
    expect(tapped).toEqual([signal('red'), signal('orange')])
  })
})
