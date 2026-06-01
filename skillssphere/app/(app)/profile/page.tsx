import styles from '@/app/app.module.css'

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileAvatar}>J</div>
          <div>
            <h1 className={styles.profileName}>Jouw Naam</h1>
            <p className={styles.profileRole}>SD Student • Jaar 2</p>
            <p className={styles.profilePoints}>Totaal punten: 0</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mijn Skills</h2>
        <div className={styles.emptyState}>
          Nog geen skills toegevoegd. Wacht op de backend tabellen om skills te kunnen registreren.
        </div>
      </div>
    </div>
  )
}
