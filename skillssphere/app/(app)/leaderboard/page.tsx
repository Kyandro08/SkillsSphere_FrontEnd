import styles from '@/app/app.module.css'

const rankings = [
  { rank: 1, name: "Student A", points: 2450 },
  { rank: 2, name: "Student B", points: 2100 },
  { rank: 3, name: "Student C", points: 1890 },
  { rank: 4, name: "Student D", points: 1620 },
  { rank: 5, name: "Student E", points: 1340 },
]

export default function LeaderboardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Leaderboard</h1>
      <p className={styles.subtitle}>Wie heeft de meeste punten?</p>

      <div className={styles.rankList}>
        {rankings.map((s) => (
          <div key={s.rank} className={styles.rankRow}>
            <div className={styles.rankLeft}>
              <span className={`${styles.rankNum} ${s.rank <= 3 ? styles.rankNumTop : styles.rankNumRest}`}>
                {s.rank}
              </span>
              <div className={styles.rankUser}>
                <div className={styles.rankAvatar} />
                <span className={styles.rankName}>{s.name}</span>
              </div>
            </div>
            <span className={styles.rankPoints}>{s.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}
