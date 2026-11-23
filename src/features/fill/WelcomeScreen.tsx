import { useState } from 'react'
import { Button } from '../../components/Button'
import { nl } from '../../text/nl'
import './fill.css'

const t = nl.fill

// First time in the filling-in mode, with an empty plan (SPEC §6.2)
export function WelcomeScreen({
  initialName,
  onNext,
}: {
  initialName?: string
  onNext: (name: string) => void
}) {
  const [name, setName] = useState(initialName ?? '')
  return (
    <main className="fill">
      <h1>{t.welcomeTitle}</h1>
      <p>{t.welcomeText}</p>
      <p>
        <strong>{t.welcomeFillTogether}</strong>
      </p>
      <label className="fill__field">
        {t.nameLabel}
        <input
          type="text"
          value={name}
          maxLength={30}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <Button onClick={() => onNext(name)}>{t.next}</Button>
    </main>
  )
}
