'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '@/app/app.module.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('Registreren is nog niet beschikbaar. Wacht op backend auth setup.')
    }
  }

  return (
    <div className={styles.authWrap}>
      <form onSubmit={handleRegister} className={styles.authCard}>
        <h1 className={styles.authTitle}>Registreren</h1>

        {error && <p className={styles.authError}>{error}</p>}

        <div className={styles.authFields}>
          <div>
            <label className={styles.fieldLabel}>Naam</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={styles.fieldInput} />
          </div>
          <div>
            <label className={styles.fieldLabel}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.fieldInput} />
          </div>
          <div>
            <label className={styles.fieldLabel}>Wachtwoord</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className={styles.fieldInput} />
          </div>
        </div>

        <button type="submit" className={styles.authBtn}>Registreren</button>

        <p className={styles.authFooter}>
          Heb je al een account? <Link href="/login" className={styles.authLink}>Inloggen</Link>
        </p>
      </form>
    </div>
  )
}
