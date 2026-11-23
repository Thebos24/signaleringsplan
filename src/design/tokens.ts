// Design tokens: the one place for colours and sizes (DESIGN.md, D-036). Components only use the
// CSS variables made from these by applyTokens(); never loose values in components.

export const colors = {
  paper: '#F6F3EE', // screen background: warm paper
  surface: '#FFFFFF', // cards and grouped lists
  ink: '#3A3834', // text, lines, the main button
  outline: '#2B2B2B', // outline of the colour symbols (the softer ink is too light on red, 3:1)
  muted: '#6B665E', // secondary text and quiet buttons (passes 4.5:1 on paper and surface)
  separator: '#DDD9D2', // thin line between list rows (decoration only)
  fillQuiet: '#E8E4DE', // background of the secondary button
  selectedTint: '#FFF4DA', // a selected row (always together with the filled circle)
  goodTint: '#E6F2E6', // the "Het gaat goed" row
  green: '#3E9B57',
  greenLight: '#DFF1E4',
  orange: '#E8892B',
  orangeLight: '#FCE9D4',
  red: '#D2453B',
  redLight: '#F8DCD9',
} as const

// Sizes in px (DESIGN.md rules 3 and 4, D-036)
export const sizes = {
  // Apple-style layout
  title: 34, // large heading top left
  text: 19, // row text and buttons (at least 19, D-036)
  caption: 14, // small grey lines under a row title
  pageMargin: 16, // left and right edge of a screen
  rowMinHeight: 80, // a list row (about 80 px, D-036)
  rowImage: 66, // picture in a row
  tileImage: 70, // picture in a supervisor tile
  circle: 28, // the selection circle
  cardRadius: 20,
  buttonRadius: 16,
  buttonMinHeight: 64,
  backButtonMin: 48, // tap area of the back button
  barBlur: 20, // blur behind the fixed bottom bar
  hairline: 1,
  transition: 200, // ms, quiet and short (rule 7)
  // Older screens (Start, Result, filling-in mode) still use these until T-2.9 and T-2.10
  tileMin: 140,
  gap: 16,
  radius: 16,
  borderWidth: 3,
  tileText: 22,
  heading: 28,
} as const

const kebab = (name: string) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

// All tokens as CSS variable name -> value, e.g. '--color-green-light': '#DFF1E4'
export function cssVariables(): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [name, value] of Object.entries(colors)) vars[`--color-${kebab(name)}`] = value
  for (const [name, value] of Object.entries(sizes)) {
    vars[`--size-${kebab(name)}`] = name === 'transition' ? `${value}ms` : `${value}px`
  }
  return vars
}

export function applyTokens(root: HTMLElement = document.documentElement): void {
  for (const [name, value] of Object.entries(cssVariables())) root.style.setProperty(name, value)
}
