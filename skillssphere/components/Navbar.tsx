'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

type User = { user_id: number; username: string; is_admin: boolean }

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.user) setUser(d.user)
    }).catch(() => {})
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  const initial = user?.username?.[0]?.toUpperCase() || '?'

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>SkillSphere</Link>
        <div className={styles.links}>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>
          <Link href="/network" className={styles.link}>Netwerk</Link>
          <Link href="/leaderboard" className={styles.link}>Leaderboard</Link>
          <Link href="/quiz" className={styles.link}>Skills testen</Link>
          <Link href="/notifications" className={styles.link}>Notificaties</Link>
          {user?.is_admin && <Link href="/admin" className={styles.link}>Admin</Link>}
        </div>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <Link href="/profile" className={styles.profileLink}>
              <div className={styles.avatar}>{initial}</div>
              {user.username}
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>Uitloggen</button>
          </>
        ) : (
          <Link href="/login" className={styles.logoutBtn}>Inloggen</Link>
        )}
      </div>
    </nav>
  )
}
