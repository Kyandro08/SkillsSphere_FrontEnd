import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { verifySession, COOKIE_NAME } from '@/lib/auth'
import styles from '@/app/app.module.css'

export default async function LeaderboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const session = token ? await verifySession(token) : null

  const { data: rankings } = await supabase
    .from('tb_user_skills')
    .select('user_id, points_earned, tb_users(username)')
    .order('points_earned', { ascending: false })
    .limit(50)

  const grouped = [...(rankings?.reduce((map, r) => {
    const { user_id, points_earned, tb_users } = r as any
    if (map.has(user_id)) map.get(user_id)!.total += points_earned
    else map.set(user_id, { user_id, name: tb_users?.username || 'Onbekend', total: points_earned })
    return map
  }, new Map<any, any>()) || []).values()].sort((a, b) => b.total - a.total)

  const top3 = grouped.slice(0, 3)
  const rest = grouped.slice(3)
  const medalLabels = ['1', '2', '3']
  const medalColors = [styles.podiumCard1, styles.podiumCard2, styles.podiumCard3]
  const medalClasses = [styles.podiumMedal1, styles.podiumMedal2, styles.podiumMedal3]

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Leaderboard</h1>
      <p className={styles.subtitle}>Wie heeft de meeste punten?</p>

      {grouped.length === 0 && <div className={styles.emptyState}>Nog geen punten toegekend.</div>}

      {top3.length > 0 && (
        <div className={styles.podium}>
          {top3.map((s: any, i: number) => (
            <div key={s.user_id} className={`${styles.podiumCard} ${medalColors[i]}`}
              style={i === 1 ? { order: 0 } : i === 0 ? { order: 1 } : { order: 2 }}>
              <div className={`${styles.podiumMedal} ${medalClasses[i]}`}>{medalLabels[i]}</div>
              <div className={styles.podiumAvatar}>{s.name[0]?.toUpperCase() || '?'}</div>
              <div className={styles.podiumName}>{s.name}</div>
              <div className={styles.podiumPts}>{s.total} punten</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.rankList}>
        {rest.map((s: any, i: number) => {
          const rank = i + 4
          const isYou = session && s.user_id === session.user_id
          const initial = s.name[0]?.toUpperCase() || '?'
          return (
            <div key={s.user_id} className={`${styles.rankRow} ${isYou ? styles.youRow : ''}`}>
              <div className={styles.rankLeft}>
                <span className={`${styles.rankNum} ${rank <= 3 ? styles.rankNumTop : styles.rankNumRest}`}>{rank}</span>
                <div className={styles.rankAvatar}>{initial}</div>
                <span className={styles.rankName}>{s.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={styles.rankPts}>{s.total} pts</span>
                {isYou && <span className={styles.youTag}>Jij</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
