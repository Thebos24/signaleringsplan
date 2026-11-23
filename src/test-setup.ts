import '@testing-library/jest-dom/vitest'

// jsdom cannot scroll; the screens scroll to the top when they open. (The storage tests run without a window.)
if (typeof window !== 'undefined') window.scrollTo = () => {}
