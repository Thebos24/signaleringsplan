// The real database of the app: one plan, its tiles and the sketched photos (D-013, D-023).
import Dexie, { type EntityTable } from 'dexie'
import type { Photo, Plan, Tile } from '../domain/plan'

export const DB_NAME = 'signaleringsplan'

// Schema history (R-010). NEVER change a version that has been published: real plans depend on it.
// To change the schema:
//   1. Add SCHEMA_V2 below (Dexie only needs the tables and indexes that change).
//   2. Add `this.version(2).stores(SCHEMA_V2).upgrade(tx => ...)` under version 1 in the constructor,
//      and convert the existing records in the upgrade function.
//   3. Write a test that fills a version 1 database and checks the data after opening version 2.
//   4. Record the change in docs/DECISIONS.md. From Checkpoint 3 on: ask Sander first (CLAUDE.md).
export const SCHEMA_V1 = {
  plan: 'id',
  tiles: '++id, order, [color+kind]',
  photos: '++id',
}

export class PlanDatabase extends Dexie {
  plan!: EntityTable<Plan, 'id'>
  tiles!: EntityTable<Tile, 'id'>
  photos!: EntityTable<Photo, 'id'>

  constructor() {
    super(DB_NAME)
    this.version(1).stores(SCHEMA_V1)
  }
}

export const db = new PlanDatabase()
