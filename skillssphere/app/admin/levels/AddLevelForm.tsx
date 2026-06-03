'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddLevelForm() {
  const [levelName, setLevelName] = useState('')
  const [minPoints, setMinPoints] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!levelName) {
      setError('Vul de niveau-naam in.')
      return
    }

    const pts = minPoints ? parseInt(minPoints, 10) : 0
    const { error: insertError } = await supabase.from('tb_levels').insert({
      level_name: levelName,
      min_points: pts,
      description,
      status,
      last_modified: new Date().toISOString(),
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setMessage(`Niveau "${levelName}" toegevoegd!`)
      setLevelName('')
      setMinPoints('')
      setDescription('')
      setStatus(1)
      router.refresh()
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-title">Niveau toevoegen</div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-row">
          <div className="admin-field">
            <label>Niveau *</label>
            <input type="text" value={levelName} onChange={(e) => setLevelName(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label>Min. punten</label>
            <input type="number" value={minPoints} onChange={(e) => setMinPoints(e.target.value)} min="0" />
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
          <label>Beschrijving</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit" className="admin-btn-primary">Niveau toevoegen →</button>
      </form>
    </div>
  )
}
