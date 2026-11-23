import type { Color } from '../domain/plan'

// Fixed shape per colour, for colour-blind users (DESIGN.md rule 6):
// green = circle with a tick, orange = triangle, red = octagon (stop sign).
const SHAPES: Record<Color, { fill: string; shape: React.ReactNode }> = {
  green: {
    fill: 'var(--color-green)',
    shape: (
      <>
        <circle cx="50" cy="50" r="42" />
        <path d="M30 52 L45 66 L72 36" fill="none" />
      </>
    ),
  },
  orange: {
    fill: 'var(--color-orange)',
    shape: <path d="M50 10 L92 86 L8 86 Z" />,
  },
  red: {
    fill: 'var(--color-red)',
    shape: <path d="M34 8 H66 L92 34 V66 L66 92 H34 L8 66 V34 Z" />,
  },
}

// Decorative: the word next to it carries the meaning, so it is hidden from screen readers.
export function ColorSymbol({ color, size = 40 }: { color: Color; size?: number }) {
  const { fill, shape } = SHAPES[color]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill={fill}
      stroke="var(--color-outline)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shape}
    </svg>
  )
}
