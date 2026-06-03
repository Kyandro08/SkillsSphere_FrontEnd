'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { hashPassword, setSession } from '@/lib/auth'
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
      const hashed = await hashPassword(password)

      const { data: users, error: queryError } = await supabase
        .from('tb_users')
        .select('user_id, username, email')
        .eq('email', email)
        .eq('password', hashed)
        .limit(1)

      if (queryError) {
        setError(queryError.message)
        return
      }

      if (!users || users.length === 0) {
        setError('Ongeldig emailadres of wachtwoord.')
        return
      }

      const u = users[0]
      const userData = { user_id: u.user_id, username: u.username, email: u.email }
      setSession(userData)

      router.push(u.username === 'admin' ? '/admin' : '/dashboard')
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
