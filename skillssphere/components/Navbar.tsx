'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const isAdmin = user?.username === 'admin'
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem('ss_user')
    if (raw) {
      try { setUser(JSON.parse(raw)) } catch { /* ignore */ }
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('ss_user')
    document.cookie = 'ss_session=; path=/; max-age=0'
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
          {isAdmin && <Link href="/admin" className={styles.link}>Admin</Link>}
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
