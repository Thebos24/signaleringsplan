import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../domain/contrast'
import { colors, cssVariables, sizes } from './tokens'

describe('contrast', () => {
  it('contrastRatio knows black on white is 21:1', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0)
  })

  it('text (ink) is readable on every background it is used on (4.5:1)', () => {
    const backgrounds = [
      colors.paper,
      colors.surface,
      colors.selectedTint,
      colors.goodTint,
      colors.fillQuiet,
      colors.greenLight,
      colors.orangeLight,
      colors.redLight,
    ]
    for (const bg of backgrounds) {
      expect(contrastRatio(colors.ink, bg)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('white text on the main button (ink) is readable', () => {
    expect(contrastRatio(colors.surface, colors.ink)).toBeGreaterThanOrEqual(4.5)
  })

  it('secondary text (muted) is readable on paper, cards and tinted rows', () => {
    for (const bg of [colors.paper, colors.surface, colors.selectedTint, colors.goodTint]) {
      expect(contrastRatio(colors.muted, bg)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('the selection circle (muted outline) is visible on a card (3:1)', () => {
    expect(contrastRatio(colors.muted, colors.surface)).toBeGreaterThanOrEqual(3)
  })

  it('the symbol outline stands out on the solid colours (3:1)', () => {
    for (const solid of [colors.green, colors.orange, colors.red]) {
      expect(contrastRatio(colors.outline, solid)).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('sizes (DESIGN.md rules 3 and 4, D-036)', () => {
  it('keeps text at least 19 px, rows about 80 px and buttons at least 64 px', () => {
    expect(sizes.text).toBeGreaterThanOrEqual(19)
    expect(sizes.rowMinHeight).toBeGreaterThanOrEqual(80)
    expect(sizes.buttonMinHeight).toBeGreaterThanOrEqual(64)
    expect(sizes.title).toBeGreaterThanOrEqual(28)
  })
})

describe('cssVariables', () => {
  it('makes a CSS variable for each token', () => {
    const vars = cssVariables()
    expect(vars['--color-green-light']).toBe('#DFF1E4')
    expect(vars['--color-selected-tint']).toBe(colors.selectedTint)
    expect(vars['--size-row-min-height']).toBe('80px')
    expect(vars['--size-transition']).toBe('200ms')
  })
})
