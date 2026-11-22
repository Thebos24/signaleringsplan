import { MAX_TILES_PER_LIST, canAddTile, cleanClientName, cleanText, isAllowedTile } from './plan'

describe('isAllowedTile', () => {
  it('allows actions for every color', () => {
    expect(isAllowedTile('action', 'green')).toBe(true)
    expect(isAllowedTile('action', 'orange')).toBe(true)
    expect(isAllowedTile('action', 'red')).toBe(true)
  })

  it('allows signals for orange and red, not for green', () => {
    expect(isAllowedTile('signal', 'green')).toBe(false)
    expect(isAllowedTile('signal', 'orange')).toBe(true)
    expect(isAllowedTile('signal', 'red')).toBe(true)
  })
})

describe('cleanText', () => {
  it('trims and collapses whitespace', () => {
    expect(cleanText('  Ga   wandelen \n')).toBe('Ga wandelen')
    expect(cleanText('')).toBe('')
  })
})

describe('cleanClientName', () => {
  it('returns the cleaned name, or undefined when empty', () => {
    expect(cleanClientName(' Sam ')).toBe('Sam')
    expect(cleanClientName('   ')).toBeUndefined()
  })
})

describe('canAddTile', () => {
  it('allows adding until the list holds the maximum (Q-004: 6)', () => {
    expect(MAX_TILES_PER_LIST).toBe(6)
    expect(canAddTile(0)).toBe(true)
    expect(canAddTile(5)).toBe(true)
    expect(canAddTile(6)).toBe(false)
    expect(canAddTile(7)).toBe(false)
  })
})
