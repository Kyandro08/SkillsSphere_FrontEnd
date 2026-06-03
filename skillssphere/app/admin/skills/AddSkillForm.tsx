'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddSkillForm() {
  const [skillName, setSkillName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [status, setStatus] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!skillName) {
      setError('Vul de skillnaam in.')
      return
    }

    const { error: insertError } = await supabase.from('tb_skills').insert({
      skill_name: skillName,
      category,
      description,
      logo: iconUrl || null,
      status,
      last_modified: new Date().toISOString(),
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setMessage(`Skill "${skillName}" toegevoegd!`)
      setSkillName('')
      setCategory('')
      setDescription('')
      setIconUrl('')
      setStatus(1)
      router.refresh()
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-title">Skill toevoegen</div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-row">
          <div className="admin-field">
            <label>Skillnaam *</label>
            <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label>Categorie</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>

        <div className="admin-field">
          <label>Beschrijving</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="admin-field">
          <label>Logo URL (optioneel)</label>
          <input type="url" value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} placeholder="https://example.com/icon.png" />
        </div>

        <div className="admin-field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
            <option value={1}>Actief</option>
            <option value={0}>Inactief</option>
          </select>
        </div>

        <button type="submit" className="admin-btn-primary">Skill toevoegen</button>
      </form>
    </div>
  )
}
