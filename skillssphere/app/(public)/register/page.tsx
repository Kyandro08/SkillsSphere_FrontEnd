'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../public.module.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password, bio }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registreren is mislukt.')
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Registreren is mislukt. Probeer het opnieuw.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.authWrap}>
      <form onSubmit={handleRegister} className={styles.authCard}>
        <h1 className={styles.authTitle}>Registreren</h1>
        <p className={styles.authSub}>Maak een gratis account aan.</p>

        {error && <p className={styles.authError}>{error}</p>}

        <div className={styles.authFields}>
          <div>
            <label className={styles.authLabel}>Naam</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={styles.authInput} />
          </div>
          <div>
            <label className={styles.authLabel}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.authInput} />
          </div>
          <div>
            <label className={styles.authLabel}>Wachtwoord</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className={styles.authInput} />
          </div>
          <div>
            <label className={styles.authLabel}>Bio <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optioneel, max 255 tekens)</span></label>
            <textarea value={bio} onChange={(e) => e.target.value.length <= 255 && setBio(e.target.value)} className={styles.authInput} rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
            <p style={{ color: bio.length >= 255 ? '#ff4d4d' : 'rgba(255,255,255,0.25)', fontSize: '0.72rem', marginTop: 4, textAlign: 'right' }}>{255 - bio.length}</p>
          </div>
        </div>

        <button type="submit" disabled={busy} className={styles.authBtn}>{busy ? 'Bezig...' : 'Registreren'}</button>

        <p className={styles.authFooter}>
          Heb je al een account? <Link href="/login" className={styles.authLink}>Inloggen</Link>
        </p>
      </form>
    </div>
  )
}
