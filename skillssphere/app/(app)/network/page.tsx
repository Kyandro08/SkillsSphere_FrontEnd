import styles from '@/app/app.module.css'

export default function NetworkPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Netwerk</h1>
      <p className={styles.subtitle}>Zoek medestudenten en leg verbindingen.</p>

      <input type="text" placeholder="Zoek op naam of skill..." className={styles.searchInput} />

      <div className={styles.userGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.userCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar} />
              <div>
                <p className={styles.userName}>Student {i}</p>
                <p className={styles.userMeta}>Frontend • Jaar 2</p>
              </div>
            </div>
            <button className={styles.connectBtn}>+ Verbinden</button>
          </div>
        ))}
      </div>
    </div>
  )
}
