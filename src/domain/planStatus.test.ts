import { isPlanEmpty } from './planStatus'

describe('isPlanEmpty', () => {
  it('is empty without tiles', () => {
    expect(isPlanEmpty([])).toBe(true)
  })

  it('is still empty with only actions (a new plan has the default red action)', () => {
    expect(isPlanEmpty([{ kind: 'action' }])).toBe(true)
  })

  it('is not empty once there is a signal', () => {
    expect(isPlanEmpty([{ kind: 'action' }, { kind: 'signal' }])).toBe(false)
  })
})
