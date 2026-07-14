import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { verifySession, COOKIE_NAME } from '@/lib/auth'
import BioEditor from '@/components/BioEditor'
import styles from '@/app/app.module.css'

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const session = token ? await verifySession(token) : null

  let user: any = null
  let skills: any[] = []

  if (session) {
    const { data: u } = await supabase
      .from('tb_users')
      .select('*')
      .eq('user_id', session.user_id)
      .single()
    user = u

    const { data: s } = await supabase
      .from('tb_user_skills')
      .select('userskill_id, points_earned, status, tb_skills(skill_name), tb_levels(level_name)')
      .eq('user_id', session.user_id)
    skills = s || []
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>Geen gebruikers gevonden.</div>
      </div>
    )
  }

  const totalPoints = skills.reduce((sum, s) => sum + (s.points_earned || 0), 0)

  return (
    <div className={styles.page}>
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileAvatar}>{user.username?.[0]?.toUpperCase() || '?'}</div>
          <div>
            <h1 className={styles.profileName}>{user.username || 'Onbekend'}</h1>
            <p className={styles.profileRole}><BioEditor bio={user.about_me || ''} userId={user.user_id} /></p>
            <p className={styles.profilePoints}>Totaal punten: {totalPoints}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mijn Skills</h2>
        {skills.length === 0 && (
          <div className={styles.emptyState}>Nog geen skills toegevoegd.</div>
        )}
        <div className={styles.feed}>
          {skills.map((s) => (
            <div key={s.userskill_id} className={styles.feedCard}>
              <div className={styles.feedHeader}>
                <div>
                  <p className={styles.feedName}>{s.tb_skills?.skill_name || 'Onbekende skill'}</p>
                  <p className={styles.feedTime}>{s.tb_levels?.level_name || 'Onbekend niveau'} • {s.points_earned} punten</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
