'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/app/app.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('Inloggen is nog niet beschikbaar. Wacht op backend auth setup.')
    }
  }

  return (
    <div className={styles.authWrap}>
      <form onSubmit={handleLogin} className={styles.authCard}>
        <h1 className={styles.authTitle}>Inloggen</h1>

        {error && <p className={styles.authError}>{error}</p>}

        <div className={styles.authFields}>
          <div>
            <label className={styles.fieldLabel}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.fieldInput} />
          </div>
          <div>
            <label className={styles.fieldLabel}>Wachtwoord</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.fieldInput} />
          </div>
        </div>

        <button type="submit" className={styles.authBtn}>Inloggen</button>

        <p className={styles.authFooter}>
          Nog geen account? <Link href="/register" className={styles.authLink}>Registreren</Link>
        </p>
      </form>
    </div>
  )
}
