import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default async function LeaderboardPage() {
  const { data: rankings } = await supabase
    .from('tb_user_skills')
    .select('user_id, points_earned, tb_users(username)')
    .order('points_earned', { ascending: false })
    .limit(20)

  const grouped = rankings?.reduce((acc: any[], r: any) => {
    const existing = acc.find((a) => a.user_id === r.user_id)
    if (existing) {
      existing.total += r.points_earned
    } else {
      acc.push({ user_id: r.user_id, name: r.tb_users?.username || 'Onbekend', total: r.points_earned })
    }
    return acc
  }, [])?.sort((a: any, b: any) => b.total - a.total) || []

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Leaderboard</h1>
      <p className={styles.subtitle}>Wie heeft de meeste punten?</p>

      <div className={styles.rankList}>
        {grouped.length === 0 && <div className={styles.emptyState}>Nog geen punten toegekend.</div>}
        {grouped.map((s: any, i: number) => (
          <div key={s.user_id} className={styles.rankRow}>
            <div className={styles.rankLeft}>
              <span className={`${styles.rankNum} ${i < 3 ? styles.rankNumTop : styles.rankNumRest}`}>
                {i + 1}
              </span>
              <div className={styles.rankUser}>
                <div className={styles.rankAvatar} />
                <span className={styles.rankName}>{s.name}</span>
              </div>
            </div>
            <span className={styles.rankPoints}>{s.total} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}
