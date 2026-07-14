'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../public.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Inloggen is mislukt.')
        return
      }

      router.push(data.redirect || '/dashboard')
    } catch {
      setError('Inloggen is mislukt. Probeer het opnieuw.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.authWrap}>
      <form onSubmit={handleLogin} className={styles.authCard}>
        <h1 className={styles.authTitle}>Inloggen</h1>
        <p className={styles.authSub}>Welkom terug.</p>

        {error && <p className={styles.authError}>{error}</p>}

        <div className={styles.authFields}>
          <div>
            <label className={styles.authLabel}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.authInput} />
          </div>
          <div>
            <label className={styles.authLabel}>Wachtwoord</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.authInput} />
          </div>
        </div>

        <button type="submit" disabled={busy} className={styles.authBtn}>{busy ? 'Bezig...' : 'Inloggen'}</button>

        <p className={styles.authFooter}>
          Nog geen account? <Link href="/register" className={styles.authLink}>Registreren</Link>
        </p>
      </form>
    </div>
  )
}
