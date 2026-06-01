import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default async function NetworkPage() {
  const { data: users } = await supabase
    .from('tb_users')
    .select('user_id, username, about_me')
    .limit(20)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Netwerk</h1>
      <p className={styles.subtitle}>Zoek medestudenten en leg verbindingen.</p>

      <input type="text" placeholder="Zoek op naam..." className={styles.searchInput} />

      <div className={styles.userGrid}>
        {users?.map((user) => (
          <div key={user.user_id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar} />
              <div>
                <p className={styles.userName}>{user.username}</p>
                <p className={styles.userMeta}>{user.about_me || 'Geen beschrijving'}</p>
              </div>
            </div>
            <button className={styles.connectBtn}>+ Verbinden</button>
          </div>
        ))}
      </div>
    </div>
  )
}
