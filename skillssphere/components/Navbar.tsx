import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default async function Navbar() {
  let initial = 'J'
  let username = 'Profiel'

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { data: user } = await supabase
        .from('tb_users')
        .select('username')
        .eq('user_id', session.user.id)
        .single()
      if (user) {
        username = user.username
        initial = user.username[0].toUpperCase()
      }
    }
  } catch {
    // auth not configured
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>SkillSphere</Link>
        <div className={styles.links}>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>
          <Link href="/network" className={styles.link}>Netwerk</Link>
          <Link href="/leaderboard" className={styles.link}>Leaderboard</Link>
          <Link href="/notifications" className={styles.link}>Notificaties</Link>
        </div>
      </div>
      <div className={styles.right}>
        <Link href="/profile" className={styles.profileLink}>
          <div className={styles.avatar}>{initial}</div>
          {username}
        </Link>
      </div>
    </nav>
  )
}
