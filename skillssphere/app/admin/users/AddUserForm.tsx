'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddUserForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [status, setStatus] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!username || !email || !password) {
      setError('Vul alle verplichte velden in.')
      return
    }

    const { error: insertError } = await supabase.from('tb_users').insert({
      username,
      email,
      password,
      about_me: aboutMe,
      status,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setMessage(`Gebruiker "${username}" toegevoegd!`)
      setUsername('')
      setEmail('')
      setPassword('')
      setAboutMe('')
      setStatus(1)
      router.refresh()
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-title">Gebruiker toevoegen</div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-row">
          <div className="admin-field">
            <label>Gebruikersnaam *</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label>Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label>Wachtwoord *</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
              <option value={1}>Actief</option>
              <option value={0}>Inactief</option>
            </select>
          </div>
        </div>

        <div className="admin-field">
          <label>Over mij</label>
          <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
        </div>

        <button type="submit" className="admin-btn-primary">Gebruiker toevoegen →</button>
      </form>
    </div>
  )
}
