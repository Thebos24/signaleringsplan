import { describe, expect, it } from 'vitest'
import { PICTO_IDS } from './pictos'
import { searchPictos } from './searchPictos'
import { nl } from '../../text/nl'

const words = nl.pictoWords

describe('searchPictos', () => {
  it('gives everything for an empty search', () => {
    expect(searchPictos(PICTO_IDS, words, '')).toEqual([...PICTO_IDS])
    expect(searchPictos(PICTO_IDS, words, '   ')).toEqual([...PICTO_IDS])
  })

  it('finds by name, by search word and ignores capitals', () => {
    expect(searchPictos(PICTO_IDS, words, 'boos')).toEqual(['angry'])
    expect(searchPictos(PICTO_IDS, words, 'HUILEN')).toEqual(['sad'])
  })

  it('finds on the start of a word', () => {
    expect(searchPictos(PICTO_IDS, words, 'wand')).toEqual(['walk'])
  })

  it('needs every typed word to match', () => {
    expect(searchPictos(PICTO_IDS, words, 'slecht slapen')).toEqual(['sleep'])
    expect(searchPictos(PICTO_IDS, words, 'boos slapen')).toEqual([])
  })

  it('gives nothing for an unknown word', () => {
    expect(searchPictos(PICTO_IDS, words, 'xyz')).toEqual([])
  })

  it('has a name and search words for every pictogram', () => {
    for (const id of PICTO_IDS) {
      expect(words[id]?.name, id).toBeTruthy()
      expect(words[id].keywords.length, id).toBeGreaterThan(0)
    }
  })
})
