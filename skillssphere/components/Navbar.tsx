import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
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
          <div className={styles.avatar}>J</div>
          Profiel
        </Link>
      </div>
    </nav>
  )
}
