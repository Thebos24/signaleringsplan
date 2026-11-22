import { cleanClientName, cleanText, isAllowedTile } from './plan'

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
