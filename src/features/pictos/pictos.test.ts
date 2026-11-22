import { describe, expect, it } from 'vitest'
import { CAREGIVER_PICTO_ID, PICTO_IDS } from './pictos'

// All SVG files in public/pictos, read as text (no extra dependency needed)
const files = import.meta.glob('/public/pictos/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

describe('pictograms', () => {
  it('has a file for each id, with the standard viewBox', () => {
    for (const id of PICTO_IDS) {
      const svg = files[`/public/pictos/${id}.svg`]
      expect(svg, id).toBeDefined()
      expect(svg).toContain('viewBox="0 0 100 100"')
    }
  })

  it('has no file without an id in the list', () => {
    expect(Object.keys(files)).toHaveLength(PICTO_IDS.length)
  })

  it('has unique ids', () => {
    expect(new Set(PICTO_IDS).size).toBe(PICTO_IDS.length)
  })

  it('has the caregiver pictogram that the default red action uses (D-023)', () => {
    expect(PICTO_IDS).toContain(CAREGIVER_PICTO_ID)
  })
})
