// Ask the browser to never clear our data on its own (R-001, D-013).
export type PersistResult = 'granted' | 'denied' | 'unsupported'

export async function requestPersistentStorage(): Promise<PersistResult> {
  if (!navigator.storage?.persist) return 'unsupported'
  try {
    if (await navigator.storage.persisted()) return 'granted'
    return (await navigator.storage.persist()) ? 'granted' : 'denied'
  } catch {
    return 'denied'
  }
}

// True when opened from the home screen (not in a normal Safari/Chrome tab)
export function isStandalone(): boolean {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true
  return iosStandalone || window.matchMedia?.('(display-mode: standalone)').matches === true
}
