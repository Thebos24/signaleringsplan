import { describe, expect, it } from 'vitest'
import { CAREGIVER_PICTO_ID, PICTO_IDS } from './pictos'
import { PICTO_SOURCES, pictoSvg } from './pictoSource'

describe('pictograms', () => {
  it('has a source drawing for each id, with the standard viewBox', () => {
    for (const id of PICTO_IDS) {
      const svg = PICTO_SOURCES[id]
      expect(svg, id).toBeDefined()
      expect(svg).toContain('viewBox="0 0 100 100"')
    }
  })

  it('has no source without an id in the list', () => {
    expect(Object.keys(PICTO_SOURCES).sort()).toEqual([...PICTO_IDS].sort())
  })

  it('has unique ids', () => {
    expect(new Set(PICTO_IDS).size).toBe(PICTO_IDS.length)
  })

  it('has the caregiver pictogram that the default red action uses (D-023)', () => {
    expect(PICTO_IDS).toContain(CAREGIVER_PICTO_ID)
  })

  it('sources only use the shared patterns, no outside files (works offline)', () => {
    for (const id of PICTO_IDS) {
      const svg = PICTO_SOURCES[id]
      const refs = [...svg.matchAll(/url\(#([\w-]+)\)/g)].map((m) => m[1])
      for (const ref of refs) expect(['hatch', 'wobble'], id).toContain(ref)
      expect(svg, id).not.toMatch(/href=|<image|https?:\/\/(?!www\.w3\.org)/)
    }
  })
})

describe('pictoSvg', () => {
  it('wraps the drawing with the shared parts, as a valid SVG', () => {
    const svg = pictoSvg('walk', 256)!
    expect(svg).toContain('width="256"')
    expect(svg).toContain('<pattern id="hatch"')
    expect(svg).toContain('<filter id="wobble"')
    expect(svg.match(/<svg/g)).toHaveLength(1)
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    expect(doc.querySelector('parsererror')).toBeNull()
  })

  it('gives nothing for an unknown id', () => {
    expect(pictoSvg('does-not-exist', 256)).toBeUndefined()
  })
})
