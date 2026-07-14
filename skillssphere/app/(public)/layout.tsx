import Link from 'next/link'
import styles from './public.module.css'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          SkillSphere
        </Link>
        <nav className={styles.nav}>
          <Link href="/login" className={styles.navBtn}>Inloggen</Link>
          <Link href="/register" className={styles.navBtnPrimary}>Registreren</Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/terms" className={styles.footerLink}>Algemene Voorwaarden</Link>
          <Link href="/privacy" className={styles.footerLink}>Privacyverklaring</Link>
          <Link href="/cookies" className={styles.footerLink}>Cookiebeleid</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} SkillSphere Network</p>
      </footer>
    </div>
  )
}
