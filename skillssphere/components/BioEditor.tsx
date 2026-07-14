'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BioEditor({ bio: initialBio, userId }: { bio: string; userId: number }) {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(initialBio)

  async function handleSave() {
    const { error } = await supabase
      .from('tb_users')
      .update({ about_me: bio, last_modified: new Date().toISOString() })
      .eq('user_id', userId)

    if (!error) setEditing(false)
  }

  if (!editing) {
    return (
      <span>
        {bio || 'Geen beschrijving'}
        <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', color: '#b44dff', cursor: 'pointer', fontSize: '0.72rem', marginLeft: 8, textDecoration: 'underline' }}>bewerk</button>
      </span>
    )
  }

  return (
    <span>
      <textarea value={bio} onChange={(e) => e.target.value.length <= 255 && setBio(e.target.value)} rows={2} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 8, color: '#fff', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'vertical', boxSizing: 'border-box' }} />
      <p style={{ color: bio.length >= 255 ? '#ff4d4d' : 'rgba(255,255,255,0.25)', fontSize: '0.7rem', margin: '2px 0 4px', textAlign: 'right' }}>{255 - bio.length}</p>
      <button onClick={handleSave} style={{ background: '#b44dff', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: '0.78rem', marginRight: 6 }}>Opslaan</button>
      <button onClick={() => { setBio(initialBio); setEditing(false) }} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: '0.78rem' }}>Annuleren</button>
    </span>
  )
}
