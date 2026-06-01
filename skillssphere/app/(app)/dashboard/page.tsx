import styles from '@/app/app.module.css'

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Welkom bij SkillSphere! Dit is jouw activiteitenfeed.</p>

      <div className={styles.feed}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <div className={styles.feedAvatar} />
              <div>
                <p className={styles.feedName}>Activiteit #{i}</p>
                <p className={styles.feedTime}>2 uur geleden</p>
              </div>
            </div>
            <p className={styles.feedBody}>Nieuwe skill toegevoegd of verbinding gelegd.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
