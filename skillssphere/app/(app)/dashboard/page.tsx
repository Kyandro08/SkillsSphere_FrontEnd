import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { fetchLevels, determineLevel, getLevelProgress } from '@/lib/levels'
import styles from '@/app/app.module.css'

export default async function DashboardPage() {
  const sessionCookie = (await cookies()).get('ss_session')?.value
  const session = sessionCookie ? JSON.parse(sessionCookie) : null

  let skills: any[] = []
  let totalPoints = 0
  let userCount = 0
  let skillCount = 0
  let levelName = ''
  let expPercent = 0
  let expLabel = ''

  if (session) {
    const { data: userSkills } = await supabase
      .from('tb_user_skills')
      .select('userskill_id, points_earned, status, tb_skills(skill_name), tb_levels(level_name)')
      .eq('user_id', session.user_id)

    skills = userSkills || []
    totalPoints = skills.reduce((sum, s) => sum + (s.points_earned || 0), 0)

    const levels = await fetchLevels()
    const currentLevel = determineLevel(levels, totalPoints)
    levelName = currentLevel.level_name
    const { percent, label } = getLevelProgress(levels, totalPoints)
    expPercent = percent
    expLabel = label

    const { count: uCount } = await supabase
      .from('tb_users')
      .select('*', { count: 'exact', head: true })
    userCount = uCount || 0

    const { count: sCount } = await supabase
      .from('tb_skills')
      .select('*', { count: 'exact', head: true })
    skillCount = sCount || 0
  }

  return (
    <div className={styles.page}>
      <p className={styles.dashGreeting}>Welkom terug</p>
      <h1 className={styles.dashName}>{session?.username || 'gebruiker'}</h1>

      <div className={styles.bento}>
        <div className={`${styles.bentoTile} ${styles.bentoTall}`}>
          <div className={styles.bentoLabel}>Jouw punten</div>
          <div className={styles.bentoValue}>{totalPoints}</div>
          {levelName && <div className={styles.bentoSub}>Level: {levelName}</div>}
          <div className={styles.expBar}>
            <div className={styles.expBarFill} style={{ width: `${expPercent}%` }} />
          </div>
          <div className={styles.expLabel}>{expLabel}</div>
        </div>

        <div className={styles.bentoTile}>
          <div className={styles.bentoLabel}>Skills</div>
          <div className={styles.bentoValue}>{skills.length}</div>
          <div className={styles.bentoSub}>geregistreerd</div>
        </div>

        <div className={styles.bentoTile}>
          <div className={styles.bentoLabel}>Studenten</div>
          <div className={styles.bentoValue}>{userCount}</div>
          <div className={styles.bentoSub}>aangesloten</div>
        </div>

        <div className={`${styles.bentoTile} ${styles.bentoTileWide}`}>
          <div className={styles.bentoLabel}>Vaardigheden</div>
          <div className={styles.bentoValue}>{skillCount}</div>
          <div className={styles.bentoSub}>beschikbaar om te leren</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Mijn vaardigheden</div>
        {skills.length === 0 ? (
          <div className={styles.emptyState}>
            Nog geen skills toegevoegd.{' '}
            <a href="/quiz" style={{ color: '#b44dff' }}>Doe een test -&#62;</a>
          </div>
        ) : (
          <div className={styles.shelf}>
            {skills.map((s: any) => (
              <div key={s.userskill_id} className={styles.shelfCard}>
                <div className={styles.shelfName}>{s.tb_skills?.skill_name || 'Onbekend'}</div>
                <div className={styles.shelfLevel}>{s.tb_levels?.level_name || '-'}</div>
                <div className={styles.shelfPts}>{s.points_earned} punten</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
