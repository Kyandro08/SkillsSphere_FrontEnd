import styles from '@/app/app.module.css'

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Beheerpaneel</h1>
      <p className={styles.subtitle}>Alleen toegankelijk voor docenten/moderators.</p>

      <div className={styles.adminGrid}>
        <div className={styles.adminCard}>
          <h2 className={styles.adminCardTitle}>Gebruikersbeheer</h2>
          <p className={styles.adminCardText}>Accounts beheren en deactiveren.</p>
        </div>
        <div className={styles.adminCard}>
          <h2 className={styles.adminCardTitle}>Categorieën</h2>
          <p className={styles.adminCardText}>Skill-categorieën aanmaken en beheren.</p>
        </div>
        <div className={styles.adminCard}>
          <h2 className={styles.adminCardTitle}>Quizvragen</h2>
          <p className={styles.adminCardText}>Vragen beoordelen en modereren.</p>
        </div>
      </div>
    </div>
  )
}
