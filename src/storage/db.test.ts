// @vitest-environment node
import 'fake-indexeddb/auto'
import { DB_NAME, SCHEMA_V1, db } from './db'

// Guard against changing a published schema (R-010). If this test fails, do not edit it:
// add a new schema version with a migration instead (see the steps in db.ts).
describe('database schema', () => {
  it('version 1 is unchanged', () => {
    expect(SCHEMA_V1).toEqual({
      plan: 'id',
      tiles: '++id, order, [color+kind]',
      photos: '++id',
    })
  })

  it('opens the real database at the newest version', async () => {
    await db.open()
    expect(db.name).toBe(DB_NAME)
    expect(db.verno).toBe(1)
    db.close()
  })
})
