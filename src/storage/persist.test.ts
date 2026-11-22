import { requestPersistentStorage } from './persist'

function mockStorage(storage: Partial<StorageManager> | undefined) {
  Object.defineProperty(navigator, 'storage', { value: storage, configurable: true })
}

describe('requestPersistentStorage', () => {
  afterEach(() => mockStorage(undefined))

  it('returns unsupported when the browser has no storage API', async () => {
    mockStorage(undefined)
    expect(await requestPersistentStorage()).toBe('unsupported')
  })

  it('returns granted without asking again when already persisted', async () => {
    const persist = vi.fn(async () => false)
    mockStorage({ persisted: async () => true, persist })
    expect(await requestPersistentStorage()).toBe('granted')
    expect(persist).not.toHaveBeenCalled()
  })

  it('returns the answer of the browser', async () => {
    mockStorage({ persisted: async () => false, persist: async () => true })
    expect(await requestPersistentStorage()).toBe('granted')
    mockStorage({ persisted: async () => false, persist: async () => false })
    expect(await requestPersistentStorage()).toBe('denied')
  })

  it('returns denied when the browser throws', async () => {
    mockStorage({
      persisted: async () => {
        throw new Error('nope')
      },
      persist: async () => true,
    })
    expect(await requestPersistentStorage()).toBe('denied')
  })
})
