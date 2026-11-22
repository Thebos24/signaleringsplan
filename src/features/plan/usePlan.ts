import { useCallback, useEffect, useState } from 'react'
import type { Plan, Tile } from '../../domain/plan'
import { requestPersistentStorage } from '../../storage/persist'
import { ensurePlan, getAllTiles } from '../../storage/planStore'

export interface PlanData {
  plan: Plan
  tiles: Tile[]
}

async function load(): Promise<PlanData> {
  return { plan: await ensurePlan(), tiles: await getAllTiles() }
}

// Loads the plan (created on first start) and its tiles. `reload` after a change.
// Also asks the browser to keep the data (R-001) once, at start.
export function usePlan() {
  const [data, setData] = useState<PlanData>()
  const [failed, setFailed] = useState(false)

  const reload = useCallback(async () => {
    try {
      setData(await load())
    } catch {
      setFailed(true)
    }
  }, [])

  useEffect(() => {
    let active = true
    load()
      .then((loaded) => active && setData(loaded))
      .catch(() => active && setFailed(true))
    void requestPersistentStorage()
    return () => {
      active = false
    }
  }, [])

  return { data, failed, reload }
}
