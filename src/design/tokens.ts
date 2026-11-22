// Design tokens: the one place for colours and sizes (DESIGN.md). Components only use the CSS
// variables made from these by applyTokens(); never loose values in components.

export const colors = {
  paper: '#FBF8F2', // background
  ink: '#2B2B2B', // text and lines
  muted: '#6B665E', // quiet buttons (darker than the first proposal so text passes 4.5:1)
  green: '#3E9B57',
  greenLight: '#DFF1E4',
  orange: '#E8892B',
  orangeLight: '#FCE9D4',
  red: '#D2453B',
  redLight: '#F8DCD9',
} as const

// Sizes in px (DESIGN.md rules 3 and 4)
export const sizes = {
  tileMin: 140,
  buttonMinHeight: 64,
  gap: 16,
  radius: 16,
  borderWidth: 3,
  tileText: 22,
  heading: 28,
  transition: 200, // ms, quiet and short (rule 7)
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
