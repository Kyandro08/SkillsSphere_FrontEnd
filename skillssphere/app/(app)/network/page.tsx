'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default function NetworkPage() {
  const [users, setUsers] = useState<any[]>([])
  const [friendships, setFriendships] = useState<any[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem('ss_user')
    if (!raw) return
    const u = JSON.parse(raw)
    setCurrentUser(u)

    async function load() {
      const [usersRes, friendsRes] = await Promise.all([
        supabase.from('tb_users').select('user_id, username, about_me'),
        supabase.from('tb_friends').select('user_id, friend_id, status').or(`user_id.eq.${u.user_id},friend_id.eq.${u.user_id}`),
      ])
      if (usersRes.data) setUsers(usersRes.data.filter((x: any) => x.user_id !== u.user_id))
      if (friendsRes.data) setFriendships(friendsRes.data)

      const accepted = (friendsRes.data || []).filter((f: any) => f.status === 1)
      const friendIds = accepted.map((f: any) =>
        f.user_id === u.user_id ? f.friend_id : f.user_id
      )
      if (friendIds.length > 0) {
        const { data: friendUsers } = await supabase
          .from('tb_users')
          .select('user_id, username')
          .in('user_id', friendIds)
        setFriends(friendUsers || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  async function sendRequest(friendId: number) {
    if (!currentUser) return
    const { data: existing } = await supabase
      .from('tb_friends')
      .select('*')
      .eq('user_id', currentUser.user_id)
      .eq('friend_id', friendId)
    if (existing && existing.length > 0) { alert('Je hebt al een verzoek gestuurd.'); return }

    const { error } = await supabase.from('tb_friends').insert({
      user_id: currentUser.user_id, friend_id: friendId, status: 0,
      last_modified: new Date().toISOString(),
    })
    if (error) alert(error.message)
    else setFriendships(prev => [...prev, { user_id: currentUser.user_id, friend_id: friendId, status: 0 }])
  }

  function getFriendStatus(targetId: number): string | null {
    const f = friendships.find(f =>
      (f.user_id === currentUser?.user_id && f.friend_id === targetId) ||
      (f.friend_id === currentUser?.user_id && f.user_id === targetId)
    )
    if (!f) return null
    if (f.status === 1) return 'friends'
    return f.user_id === currentUser?.user_id ? 'pending' : 'incoming'
  }

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => a.username.localeCompare(b.username))
    const map = new Map<string, typeof sorted>()
    for (const user of sorted) {
      const letter = user.username[0]?.toUpperCase() || '#'
      if (!map.has(letter)) map.set(letter, [])
      map.get(letter)!.push(user)
    }
    return Array.from(map.entries())
  }, [filtered])

  if (loading) return <div className={styles.page}><p style={{ color: 'rgba(255,255,255,0.4)' }}>Laden...</p></div>

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Netwerk</h1>
      <p className={styles.subtitle}>Zoek medestudenten en leg verbindingen.</p>

      {friends.length > 0 && (
        <>
          <div className={styles.friendsHeader}>
            <span className={styles.sectionTitle}>Vrienden</span>
            <span className={styles.friendsCount}>{friends.length}</span>
          </div>
          <div className={styles.friendsRow}>
            {friends.map(f => (
              <div key={f.user_id} className={styles.friendChip}>
                <div className={styles.friendChipInit}>{f.username[0]?.toUpperCase()}</div>
                <span className={styles.friendChipName}>{f.username}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.networkSearch}>
        <input type="text" placeholder="Zoek op naam..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
      </div>

      <div className={styles.netList}>
        {grouped.map(([letter, items]) => (
          <div key={letter}>
            <p className={styles.netLetter}>{letter}</p>
            {items.map(user => {
              const status = getFriendStatus(user.user_id)
              const initial = user.username?.[0]?.toUpperCase() || '?'
              return (
                <div key={user.user_id} className={styles.netItem}>
                  <div className={styles.netLeft}>
                    <div className={styles.netInitial}>{initial}</div>
                    <div>
                      <p className={styles.netName}>{user.username}</p>
                      <p className={styles.netBio}>{user.about_me || 'Geen beschrijving'}</p>
                    </div>
                  </div>
                  {status === 'friends' ? (
                    <span className={`${styles.friendBadge} ${styles.badgeFriends}`}>Verbonden</span>
                  ) : status === 'pending' ? (
                    <span className={`${styles.friendBadge} ${styles.badgePending}`}>Verzonden</span>
                  ) : status === 'incoming' ? (
                    <span className={`${styles.friendBadge} ${styles.badgeIncoming}`}>Ontvangen</span>
                  ) : (
                    <button onClick={() => sendRequest(user.user_id)} className={styles.connectBtn}>+ Verbinden</button>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
