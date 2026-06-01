import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from '@/app/app.module.css'

export default async function HomePage() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) redirect('/dashboard')
  } catch {
    // Supabase Auth nog niet ingesteld
  }

  return (
    <div className={styles.landing}>
      <h1 className={styles.landingTitle}>SkillSphere Network</h1>
      <p className={styles.landingText}>
        Registreer, valideer en vergelijk jouw vaardigheden met medestudenten.
      </p>
      <div className={styles.landingBtns}>
        <Link href="/login" className={styles.btnPrimary}>Inloggen</Link>
        <Link href="/register" className={styles.btnSecondary}>Registreren</Link>
      </div>
    </div>
  )
}
