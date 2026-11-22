import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../domain/contrast'
import { colors, cssVariables } from './tokens'

describe('contrast', () => {
  it('contrastRatio knows black on white is 21:1', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0)
  })

  it('text (ink) is readable on the paper and on every light colour (4.5:1)', () => {
    for (const bg of [colors.paper, colors.greenLight, colors.orangeLight, colors.redLight]) {
      expect(contrastRatio(colors.ink, bg)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('the quiet button text (muted) is readable on paper', () => {
    expect(contrastRatio(colors.muted, colors.paper)).toBeGreaterThanOrEqual(4.5)
  })

  it('ink outlines stand out on the solid colours (3:1, for symbols)', () => {
    for (const solid of [colors.green, colors.orange, colors.red]) {
      expect(contrastRatio(colors.ink, solid)).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('cssVariables', () => {
  it('makes a CSS variable for each token', () => {
    const vars = cssVariables()
    expect(vars['--color-green-light']).toBe('#DFF1E4')
    expect(vars['--size-tile-min']).toBe('140px')
    expect(vars['--size-transition']).toBe('200ms')
  })
})
