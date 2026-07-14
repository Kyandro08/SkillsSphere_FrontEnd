'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default function NotificationsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (!d?.user) return setLoading(false)
      setCurrentUser(d.user)
      async function load() {
        const { data } = await supabase
          .from('tb_friends')
          .select('friend_id, user_id, status, last_modified, tb_users!tb_friends_user_id_fkey(username)')
          .eq('friend_id', d.user.user_id)
          .eq('status', 0)
          .order('last_modified', { ascending: false })
        setRequests(data || [])
        setLoading(false)
      }
      load()
    }).catch(() => setLoading(false))
  }, [])

  async function respond(friendId: number, status: number) {
    const { error } = await supabase
      .from('tb_friends')
      .update({ status, last_modified: new Date().toISOString() })
      .eq('user_id', friendId)
      .eq('friend_id', currentUser?.user_id)
    if (error) alert(error.message)
    else setRequests(prev => prev.filter(r => r.user_id !== friendId))
  }

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof requests>()
    for (const r of requests) {
      const date = new Date(r.last_modified).toLocaleDateString('nl-NL')
      const key = date === new Date().toLocaleDateString('nl-NL') ? 'Vandaag' : date
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(r)
    }
    return Array.from(groups.entries())
  }, [requests])

  if (loading) return <div className={styles.page}><p style={{ color: 'rgba(255,255,255,0.4)' }}>Laden...</p></div>

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Notificaties</h1>

      {requests.length === 0 && <div className={styles.emptyState}>Geen notificaties.</div>}

      <div className={styles.timeline}>
        {grouped.map(([label, items]) => (
          <div key={label} className={styles.timelineGroup}>
            <p className={styles.timelineLabel}>{label}</p>
            {items.map(r => (
              <div key={`${r.user_id}-${r.friend_id}`} className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.timelineDotRead}`} />
                <div className={styles.timelineBody}>
                  <p className={styles.timelineMsg}>
                    <strong>{r.tb_users?.username || 'Onbekend'}</strong> wil verbinden
                  </p>
                  <p className={styles.timelineTime}>
                    {new Date(r.last_modified).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <div className={styles.timelineActions}>
                    <button onClick={() => respond(r.user_id, 1)} className={`${styles.timelineAction} ${styles.timelineAccept}`}>Accepteren</button>
                    <button onClick={() => respond(r.user_id, 2)} className={`${styles.timelineAction} ${styles.timelineDecline}`}>Weigeren</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
