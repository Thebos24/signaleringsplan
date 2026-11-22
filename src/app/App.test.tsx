import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('shows the hello screen', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Hallo' })).toBeInTheDocument()
  })
})
